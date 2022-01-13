import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
   DataGrid,
   GridRowsProp,
   GridColDef,
   GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { fullWidthFlex } from 'shared/styles';
import { AdminCreateForm } from './components/admin-create-form';

const rows: GridRowsProp = [
   {
      id: 1,
      col1: 'Hello',
      col2: 'World',
   },
   {
      id: 2,
      col1: 'DataGridPro',
      col2: 'is Awesome',
   },
   {
      id: 3,
      col1: 'MUI',
      col2: 'is Amazing',
   },
];

const columns: GridColDef[] = [
   { field: 'col1', headerName: 'Column 1', width: 150 },
   { field: 'col2', headerName: 'Column 2', width: 150 },
   {
      field: 'col3',
      headerName: 'Column3',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
         return <Button variant="contained">Xem</Button>;
      },
   },
];

export const AdminList = () => {
   const [showForm, setShowForm] = useState(false);

   const onCreate = (
      username: string,
      password: string,
      isSuperAdmin: boolean
   ) => {
      console.log(username, password, isSuperAdmin);
      setShowForm(false);
   };
   return (
      <div style={fullWidthFlex('column', 10)}>
         <div>
            <Button
               onClick={() => setShowForm(true)}
               color="success"
               variant="outlined"
               startIcon={<Add />}
            >
               Thêm tài khoản mới
            </Button>
         </div>
         <DataGrid rows={rows} columns={columns} />
         <AdminCreateForm
            open={showForm}
            onClose={() => setShowForm(false)}
            onCreate={onCreate}
         />
      </div>
   );
};
