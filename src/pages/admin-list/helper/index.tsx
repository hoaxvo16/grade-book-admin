import { Button } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridRowsProp,
} from '@mui/x-data-grid';

export const buildRows = (): GridRowsProp => {
   return [];
};

export const buildCols = (onView: any): GridColDef[] => {
   return [
      { field: 'userId', headerName: 'ID', width: 50 },
      { field: 'username', headerName: 'Username', width: 150 },
      {
         field: 'createdDate',
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
   ];
};
