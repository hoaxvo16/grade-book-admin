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
      };
   });

   return renderRow;
};

export const buildCols = (onView: any, onBlock: any): GridColDef[] => {
   return [
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'firstName', headerName: 'Ten', width: 150 },
      { field: 'lastName', headerName: 'Ho', width: 150 },
      {
         field: 'studentIdentification',
         headerName: 'MSSV',
         width: 150,
         editable: true,
      },

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
      {
         field: 'block',
         headerName: 'Chan',
         width: 150,
         renderCell: (params: GridRenderCellParams) => {
            return (
               <Button
                  onClick={() => onBlock(params)}
                  variant="contained"
                  color="error"
               >
                  Block
               </Button>
            );
         },
      },
   ];
};
