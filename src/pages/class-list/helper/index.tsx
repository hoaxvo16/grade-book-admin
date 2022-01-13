import { Button } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridRowsProp,
} from '@mui/x-data-grid';
import { ClassDetailInfo } from 'shared/models';
import { stringToDateDisplay } from 'utils/date';

export const buildRows = (classList: ClassDetailInfo[]): GridRowsProp => {
   const renderRow: GridRowsProp = classList.map((classInfo, idx) => {
      return {
         id: idx,
         classId: classInfo.id,
         name: classInfo.name,
         startDate: stringToDateDisplay(classInfo.startDate),
         mainTeacher:
            classInfo.mainTeacher.lastName +
            ' ' +
            classInfo.mainTeacher.firstName,
      };
   });

   return renderRow;
};

export const buildCols = (onView: any): GridColDef[] => {
   return [
      { field: 'classId', headerName: 'ID', width: 50 },
      { field: 'name', headerName: 'Tên lớp', width: 250 },
      {
         field: 'startDate',
         headerName: 'Ngày bắt đầu',
         width: 150,
         type: 'dateTime',
      },
      { field: 'mainTeacher', headerName: 'Người tạo', width: 150 },

      {
         field: 'view',
         headerName: 'Xem chi tiết',
         width: 150,
         renderCell: (params: GridRenderCellParams) => {
            return (
               <Button onClick={() => onView(params)} variant="contained">
                  Xem
               </Button>
            );
         },
      },
   ];
};
