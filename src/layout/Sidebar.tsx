import { AssignmentInd, School, Settings } from '@mui/icons-material';
import { baseColors } from 'assets/colors';
import { CSSProperties, useState } from 'react';
import { useHistory } from 'react-router-dom';

const sideBarItems = [
   {
      icon: <AssignmentInd />,
      content: 'Danh sach nguoi dung',
      path: '/users',
   },

   {
      icon: <School />,
      content: 'Danh sach lop hoc',
      path: 'classes',
   },

   {
      icon: <Settings />,
      content: 'Cai dat',
      path: 'setting',
   },
];

export const Sidebar = () => {
   const [selectedId, setSelectedId] = useState(0);

   const history = useHistory();

   const { sideBar, item, itemTitle, header, selectedItem } = makeStyles();
   const onClickItem = (path: string) => {
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
               <p style={itemTitle}>{e.content}</p>
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
