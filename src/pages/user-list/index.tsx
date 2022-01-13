import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { User } from 'shared/models';
import { fullWidthFlex } from 'shared/styles';
import { UserDetail } from './components/user-detail';
import { buildCols, buildRows } from './helper';
import { userListViewModel } from './user-list-view-model';

export const UserList = observer(() => {
   const [showDetail, setShowDetail] = useState(false);
   const [selectedUser, setSelectedUser] = useState(new User());

   const [paging, setPaging] = useState({
      pageNumber: 1,
      numberPerPage: 100,
   });

   const onView = (params: GridRenderCellParams) => {
      setSelectedUser(userListViewModel.userList[params.row.id]);
      setShowDetail(true);
   };

   const onBlock = (params: GridRenderCellParams) => {
      console.log(params);
   };

   const onCloseDialog = () => {
      setShowDetail(false);
   };

   const pageSizeChange = (value: number) => {
      setPaging({ ...paging, numberPerPage: value });
   };

   const pageNumberChange = (value: number) => {
      setPaging({ ...paging, pageNumber: value });
   };

   useEffect(() => {
      userListViewModel.getUserList(paging.pageNumber, paging.numberPerPage);
   }, [paging]);

   const rows = useMemo(
      () => buildRows(userListViewModel.userList),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [userListViewModel.dataVersion]
   );
   const columns = useMemo(() => buildCols(onView, onBlock), []);
   return (
      <div style={fullWidthFlex('column', 10)}>
         <DataGrid
            onPageChange={pageNumberChange}
            onPageSizeChange={pageSizeChange}
            rows={rows}
            columns={columns}
         />
         <UserDetail
            onClose={onCloseDialog}
            user={selectedUser}
            show={showDetail}
         />
      </div>
   );
});
