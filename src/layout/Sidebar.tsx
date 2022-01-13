import {
   AdminPanelSettings,
   AssignmentInd,
   LogoutOutlined,
   School,
} from '@mui/icons-material';
import { baseColors } from 'assets/colors';
import { CSSProperties, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userViewModel } from 'shared/view-models';

const sideBarItems = [
   {
      icon: <AssignmentInd />,
      content: 'Danh sách người dùng',
      path: '/users',
   },

   {
      icon: <AdminPanelSettings />,
      content: 'Danh sách Admin',
      path: '/admin',
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

export const Sidebar = () => {
   const [selectedId, setSelectedId] = useState(0);

   const history = useHistory();

   const { sideBar, item, itemTitle, header, selectedItem } = makeStyles();
   const onClickItem = (path: string) => {
      if (path === '/login') {
         userViewModel.logout();
      }
      history.push(path);
   };
   return (
      <div style={sideBar}>
         <div style={header}>Dashboard</div>
         {sideBarItems.map((e, idx) => (
            <div
               key={idx}
               onClick={() => {
                  onClickItem(e.path);
                  setSelectedId(idx);
               }}
               style={idx === selectedId ? { ...item, ...selectedItem } : item}
            >
               {e.icon}
               <span style={itemTitle}>{e.content}</span>
            </div>
         ))}
      </div>
   );
};

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
