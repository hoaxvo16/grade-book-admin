import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { ClassDetailInfo } from 'shared/models';
import { fullWidthFlex } from 'shared/styles';
import { classListViewModel } from './class-list-view-model';
import { ClassDetail } from './components/class-detail';
import { buildCols, buildRows } from './helper';

export const ClassList = () => {
   const [showDetail, setShowDetail] = useState(false);
   const [selectedClass, setSelectedClass] = useState(new ClassDetailInfo());
   const [paging, setPaging] = useState({
      pageNumber: 1,
      numberPerPage: 100,
   });

   const onView = (params: GridRenderCellParams) => {
      setSelectedClass(classListViewModel.classList[params.row.id]);
      setShowDetail(true);
   };

   const onCloseDialog = () => {
      setShowDetail(false);
   };

   const pageSizeChange = (value: number) => {
      setPaging({ ...paging, numberPerPage: value });
   };

   const pageNumberChange = (value: number) => {
      setPaging({ ...paging, pageNumber: value });
   };

   useEffect(() => {
      classListViewModel.getClassList(paging.pageNumber, paging.numberPerPage);
   }, [paging]);

   const rows = useMemo(
      () => buildRows(classListViewModel.classList),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [classListViewModel.dataVersion]
   );

   const columns = useMemo(() => buildCols(onView), []);
   return (
      <div style={fullWidthFlex('column', 10)}>
         <DataGrid
            onPageChange={pageNumberChange}
            onPageSizeChange={pageSizeChange}
            rows={rows}
            columns={columns}
         />
         <ClassDetail
            show={showDetail}
            classInfo={selectedClass}
            onClose={onCloseDialog}
         />
      </div>
   );
};
