import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmModal, FeedBack, Loading } from 'shared/components';
import { User } from 'shared/models';
import { fullWidthFlex } from 'shared/styles';
import { UserDetail } from './components/user-detail';
import { buildCols, buildRows } from './helper';
import { userListViewModel } from './user-list-view-model';

export const UserList = observer(() => {
   const [showDetail, setShowDetail] = useState(false);
   const [showModal, setShowModal] = useState({
      open: false,
      message: '',
      title: '',
   });
   const [selectedUser, setSelectedUser] = useState(new User());
   const [userLock, setUserLocked] = useState({
      id: 0,
      isLocked: false,
   });

   const [paging, setPaging] = useState({
      pageNumber: 1,
      numberPerPage: 100,
   });

   useEffect(() => {
      userListViewModel.getUserList(paging.pageNumber, paging.numberPerPage);
   }, [paging]);

   const onView = (params: GridRenderCellParams) => {
      const findUser = userListViewModel.userList.find(
         user => user.id === params.row.userId
      );
      if (findUser) setSelectedUser(findUser);
      setShowDetail(true);
   };

   const onBlock = (params: GridRenderCellParams) => {
      setUserLocked({
         id: params.row.userId,
         isLocked: params.row.isLocked,
      });
      if (params.row.isLocked) {
         setShowModal({
            open: true,
            message: 'Người này sẽ đăng nhập lại bình thường',
            title: 'Mở khóa tài khoản của người này?',
         });
      } else {
         setShowModal({
            open: true,
            message: 'Người này sẽ không đăng nhập được vào tài khoản nữa',
            title: 'Khóa tài khoản của người này?',
         });
      }
   };

   const onBlockFromDetail = () => {
      setUserLocked({
         id: selectedUser.id,
         isLocked: selectedUser.isLocked,
      });
      if (selectedUser.isLocked) {
         setShowModal({
            open: true,
            message: 'Người này sẽ đăng nhập lại bình thường',
            title: 'Mở khóa tài khoản của người này?',
         });
      } else {
         setShowModal({
            open: true,
            message: 'Người này sẽ không đăng nhập được vào tài khoản nữa',
            title: 'Khóa tài khoản của người này?',
         });
      }
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

   const finishEdit = (params: any) => {
      if (params.formattedValue !== params.value) {
         if (params.value.trim() === '') {
            userListViewModel.makeError('MSSV trống');
         } else {
            userListViewModel.changeStudentId(params.id, params.value);
         }
      }
   };

   const onCloseModal = (type: 'confirm' | 'cancel') => {
      setShowModal({ ...showModal, open: false });

      if (type === 'confirm') {
         setShowDetail(false);
         userListViewModel.toggleLockUser(userLock.id, !userLock.isLocked);
      } else {
      }
   };

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const trigger = userListViewModel.dataVersion;

   const rows = useMemo(
      () => buildRows(userListViewModel.userList),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [userListViewModel.dataVersion]
   );
   const columns = useMemo(() => buildCols(onView, onBlock), []);
   return (
      <div style={{ position: 'relative', ...fullWidthFlex('column', 10) }}>
         <Loading open={userListViewModel.loading} />
         <DataGrid
            components={{
               Toolbar: GridToolbar,
            }}
            onCellEditCommit={finishEdit}
            onPageChange={pageNumberChange}
            onPageSizeChange={pageSizeChange}
            rows={rows}
            columns={columns}
         />
         <UserDetail
            onClose={onCloseDialog}
            user={selectedUser}
            show={showDetail}
            onBlock={onBlockFromDetail}
         />
         <ConfirmModal
            title={showModal.title}
            open={showModal.open}
            message={showModal.message}
            onClose={onCloseModal}
         />
         <FeedBack
            message={userListViewModel.message}
            open={userListViewModel.isError}
            severity="error"
            handleClose={() => userListViewModel.deleteError()}
         />
      </div>
   );
});
