import { Person } from '@mui/icons-material';
import { baseColors } from 'assets/colors';
import { CSSProperties } from 'react';
import { Avatar } from 'shared/components';
import { User } from 'shared/models';
import { centerHorizontal } from 'shared/styles';
import { TabProps } from './interface';

export const ClassMember = ({ classInfo }: TabProps) => {
   const { pStyle } = makeStyles();
   return (
      <div style={{ height: 400, overflow: 'auto', paddingTop: 20 }}>
         <h3 style={pStyle}>
            Giáo viên
            <Person />
         </h3>
         <div style={{ paddingBottom: 20, ...centerHorizontal }}>
            <Avatar user={classInfo.mainTeacher} />
            <span
               style={{ marginLeft: 10 }}
            >{`${classInfo.mainTeacher.lastName} ${classInfo.mainTeacher.firstName}`}</span>
         </div>
         {classInfo.subTeachers.map((user, idx) => (
            <div key={idx} style={{ paddingBottom: 20, ...centerHorizontal }}>
               <Avatar user={user} />
               <span
                  style={{ marginLeft: 10 }}
               >{`${user.lastName} ${user.firstName}`}</span>
            </div>
         ))}
         <h3 style={pStyle}>
            Sinh viên
            <Person fontSize="medium" />
         </h3>
         {classInfo.students.map((user, idx) => (
            <div key={idx} style={{ paddingBottom: 20, ...centerHorizontal }}>
               <Avatar user={user} />
               <span
                  style={{ marginLeft: 10 }}
               >{`${user.lastName} ${user.firstName}`}</span>
            </div>
         ))}
         {classInfo.students.length === 0 && <p>Lớp học chưa có sinh viên</p>}
      </div>
   );
};

const makeStyles = () => {
   const pStyle: CSSProperties = {
      color: baseColors.purple,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20,
   };

   return { pStyle };
};
