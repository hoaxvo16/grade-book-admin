import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { fullWidthFlex } from 'shared/styles';
import { AdminCreateForm } from './components/admin-create-form';
import { buildCols, buildRows } from './helper';

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

   const onView = (params: GridRenderCellParams) => {};

   const rows = useMemo(() => buildRows(), []);

   const columns = useMemo(() => buildCols(onView), []);
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
         <DataGrid
            components={{
               Toolbar: GridToolbar,
            }}
            rows={rows}
            columns={columns}
         />
         <AdminCreateForm
            open={showForm}
            onClose={() => setShowForm(false)}
            onCreate={onCreate}
         />
      </div>
   );
};
