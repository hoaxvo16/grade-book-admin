import { Button } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridRowsProp,
} from '@mui/x-data-grid';
import { User } from 'shared/models';

export const buildRows = (userList: User[]): GridRowsProp => {
   const renderRow: GridRowsProp = userList.map((user, idx) => {
      return {
         id: idx,
         email: user.email,
         firstName: user.firstName,
         lastName: user.lastName,
         studentIdentification: user.studentIdentification,
         isLocked: user.isLocked,
         isEmailConfirmed: user.isEmailConfirmed,
      };
   });

   return renderRow;
};

export const buildCols = (onView: any, onBlock: any): GridColDef[] => {
   return [
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
