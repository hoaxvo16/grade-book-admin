import { AlertColor } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { FeedBack, Loading } from 'shared/components';
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

   const [feedBackProps, setFeedBackProps] = useState<{
      open: boolean;
      severity: AlertColor;
      message: string;
   }>({
      open: false,
      severity: 'success',
      message: '',
   });

   const onView = async (params: GridRenderCellParams) => {
      const id = classListViewModel.classList[params.row.id].id;
      const classInfo = await classListViewModel.getSingleClass(id);
      if (classInfo) {
         setSelectedClass(classInfo);
         setShowDetail(true);
      } else {
         setFeedBackProps({
            message: 'Không thể lấy dữ liệu vui lòng thử lại sau',
            open: true,
            severity: 'error',
         });
      }
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
      <div style={{ position: 'relative', ...fullWidthFlex('column', 10) }}>
         <Loading open={classListViewModel.loading} />
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
         <FeedBack
            message={feedBackProps.message}
            open={feedBackProps.open}
            severity={feedBackProps.severity}
            handleClose={() =>
               setFeedBackProps({ ...feedBackProps, open: false })
            }
         />
      </div>
   );
};
