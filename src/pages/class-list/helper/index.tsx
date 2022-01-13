import { Button } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridRowsProp,
} from '@mui/x-data-grid';
import { ClassDetailInfo } from 'shared/models';
import { stringToDateDisplay } from 'utils/date';

export const buildRows = (classList: ClassDetailInfo[]): GridRowsProp => {
   classList.sort((a, b) => {
      if (a.id > b.id) {
         return 1;
      }
      return -1;
   });

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

//  "id": 1,
//             "roleOfCurrentUser": "teacher",
//             "name": "Web nag cao",
//             "startDate": "2022-01-03T16:46:07.728",
//             "room": "F204",
//             "description": "",

export const buildCols = (onView: any): GridColDef[] => {
   return [
      { field: 'classId', headerName: 'ID', width: 50 },
      { field: 'name', headerName: 'Ten lop', width: 150 },
      { field: 'startDate', headerName: 'Ngay bat dau', width: 150 },
      { field: 'mainTeacher', headerName: 'Giao vien chinh', width: 150 },

      {
         field: 'view',
         headerName: 'Xem chi tiet',
         width: 150,
         renderCell: (params: GridRenderCellParams) => {
            return (
               <Button onClick={() => onView(params)} variant="contained">
                  View
               </Button>
            );
         },
      },
   ];
};
