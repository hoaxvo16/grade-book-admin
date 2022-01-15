import { Checkbox } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridRowsProp,
} from '@mui/x-data-grid';
import { Admin } from 'shared/models';
import { stringToDateDisplay } from 'utils/date';

export const buildRows = (adminList: Admin[]): GridRowsProp => {
   const renderRow: GridRowsProp = adminList.map((admin, idx) => {
      return {
         id: idx,
         userID: admin.id,
         username: admin.username,
         dateCreated: stringToDateDisplay(admin.dateCreated),
         isSuperAdmin: admin.isSuperAdmin,
      };
   });

   return renderRow;
};

export const buildCols = (onView: any): GridColDef[] => {
   return [
      { field: 'userID', headerName: 'ID', width: 150 },
      { field: 'username', headerName: 'Username', width: 150 },
      {
         field: 'dateCreated',
         headerName: 'Ngày tạo',
         width: 150,
         type: 'dateTime',
      },
      {
         field: 'check',
         headerName: 'Là super admin',
         width: 150,
         renderCell: (params: GridRenderCellParams) => {
            return <Checkbox checked={params.row.isSuperAdmin} />;
         },
      },
   ];
};
