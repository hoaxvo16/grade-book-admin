import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { FeedBack, Loading } from 'shared/components';
import { fullWidthFlex } from 'shared/styles';
import { adminListViewModel } from './admin-list-view-model';
import { AdminCreateForm } from './components/admin-create-form';
import { buildCols, buildRows } from './helper';

export const AdminList = observer(() => {
   const [showForm, setShowForm] = useState(false);

   const [paging, setPaging] = useState({
      pageNumber: 1,
      numberPerPage: 100,
   });

   useEffect(() => {
      adminListViewModel.getAdminList(paging.pageNumber, paging.numberPerPage);
   }, [paging]);

   const onCreate = (
      username: string,
      password: string,
      isSuperAdmin: boolean
   ) => {
      setShowForm(false);
      adminListViewModel.addNewAdmin(username, password, isSuperAdmin);
   };

   const onView = (params: GridRenderCellParams) => {};

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const trigger = adminListViewModel.dataVersion;

   const pageSizeChange = (value: number) => {
      setPaging({ ...paging, numberPerPage: value });
   };

   const pageNumberChange = (value: number) => {
      setPaging({ ...paging, pageNumber: value });
   };

   const rows = useMemo(
      () => buildRows(adminListViewModel.adminList),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [adminListViewModel.dataVersion]
   );

   const columns = useMemo(() => buildCols(onView), []);
   return (
      <div style={{ position: 'relative', ...fullWidthFlex('column', 10) }}>
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
            onPageChange={pageNumberChange}
            onPageSizeChange={pageSizeChange}
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
         <Loading open={adminListViewModel.loading} />
         <FeedBack
            message={adminListViewModel.message}
            open={adminListViewModel.isError}
            severity="error"
            handleClose={() => adminListViewModel.deleteError()}
         />
      </div>
   );
});
