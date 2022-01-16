import { Button } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridRowsProp,
} from '@mui/x-data-grid';
import { User } from 'shared/models';
import { stringToDateDisplay } from 'utils/date';

export const buildRows = (userList: User[]): GridRowsProp => {
   const renderRow: GridRowsProp = userList.map((user, idx) => {
      return {
         id: user.id,
         userId: user.id,
         email: user.email,
         firstName: user.firstName,
         lastName: user.lastName,
         studentIdentification: user.studentIdentification,
         dateCreated: stringToDateDisplay(user.dateCreated),
         isLocked: user.isLocked,
         isEmailConfirmed: user.isEmailConfirmed,
      };
   });

   return renderRow;
};

export const buildCols = (onView: any, onBlock: any): GridColDef[] => {
   return [
      { field: 'userId', headerName: 'ID', width: 50 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'firstName', headerName: 'Tên', width: 150 },
      { field: 'lastName', headerName: 'Họ', width: 150 },
      {
         field: 'studentIdentification',
         headerName: 'MSSV',
         width: 100,
         editable: true,
      },
      {
         field: 'dateCreated',
         headerName: 'Ngày tạo',
         width: 150,
         type: 'dateTime',
      },

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
      {
         field: 'block',
         headerName: 'Chặn',
         width: 100,
         renderCell: (params: GridRenderCellParams) => {
            if (params.row.isLocked) {
               return (
                  <Button
                     onClick={() => onBlock(params)}
                     variant="contained"
                     color="success"
                  >
                     Bỏ chặn
                  </Button>
               );
            } else {
               return (
                  <Button
                     onClick={() => onBlock(params)}
                     variant="contained"
                     color="error"
                  >
                     Chặn
                  </Button>
               );
            }
         },
      },
   ];
};
