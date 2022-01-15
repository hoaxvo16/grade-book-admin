import {
   AdminPanelSettings,
   AssignmentInd,
   LogoutOutlined,
   School,
} from '@mui/icons-material';
import { baseColors } from 'assets/colors';
import { observer } from 'mobx-react-lite';
import { CSSProperties, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userViewModel } from 'shared/view-models';

const sideBarItems = [
   {
      icon: <AssignmentInd />,
      content: 'Danh sách người dùng',
      path: '/users',
   },

   {
      icon: <School />,
      content: 'Danh sách lớp học',
      path: '/classes',
   },
   {
      icon: <LogoutOutlined />,
      content: 'Đăng xuất',
      path: '/login',
   },
];

export const Sidebar = observer(() => {
   const [selectedId, setSelectedId] = useState(0);

   const history = useHistory();

   const { sideBar, item, itemTitle, header, selectedItem } = makeStyles();
   const onClickItem = (path: string) => {
      if (path === '/login') {
         userViewModel.logout();
      }
      history.push(path);
   };
   useEffect(() => {
      if (userViewModel.user.isSuperAdmin) {
         setSelectedId(0);
      } else {
         setSelectedId(1);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userViewModel.user]);
   return (
      <div style={sideBar}>
         <div style={header}>Dashboard</div>
         {userViewModel.user.isSuperAdmin && (
            <div
               onClick={() => {
                  onClickItem('/admin');
                  setSelectedId(0);
               }}
               style={selectedId === 0 ? { ...item, ...selectedItem } : item}
            >
               <AdminPanelSettings />
               <span style={itemTitle}>Danh sách Admin</span>
            </div>
         )}

         {sideBarItems.map((e, idx) => (
            <div
               key={idx + 1}
               onClick={() => {
                  onClickItem(e.path);
                  setSelectedId(idx + 1);
               }}
               style={
                  idx + 1 === selectedId ? { ...item, ...selectedItem } : item
               }
            >
               {e.icon}
               <span style={itemTitle}>{e.content}</span>
            </div>
         ))}
      </div>
   );
});

const makeStyles = () => {
   const sideBar: CSSProperties = {
      backgroundColor: baseColors.lightDark,
      height: '100%',
      width: 300,
   };
   const item: CSSProperties = {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 30px',
      cursor: 'pointer',
      transition: 'all 0.5s',
   };

   const selectedItem: CSSProperties = {
      color: baseColors.lightBlue,
      backgroundColor: baseColors.extraLightDark,
   };
   const itemTitle: CSSProperties = {
      marginLeft: 10,
   };

   const header: CSSProperties = {
      backgroundColor: baseColors.black,
      padding: '20px 30px',
      color: 'white',
   };

   return { sideBar, item, itemTitle, header, selectedItem };
};
