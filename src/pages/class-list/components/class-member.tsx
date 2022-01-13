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
         {users.map((user, idx) => (
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
         {users.map((user, idx) => (
            <div key={idx} style={{ paddingBottom: 20, ...centerHorizontal }}>
               <Avatar user={user} />
               <span
                  style={{ marginLeft: 10 }}
               >{`${user.lastName} ${user.firstName}`}</span>
            </div>
         ))}
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

let users: User[] = [];

const user1 = new User();

user1.firstName = 'Hoa';

user1.lastName = 'Vo Xuan';

user1.profilePictureUrl =
   'https://lh3.googleusercontent.com/a-/AOh14GjpOMaar9UtSDsvtKG74PzXm6yLiJ72Ua1HdoMCUg=s96-c';
const user2 = new User();

user2.firstName = 'Hoa';

user2.lastName = 'Vo Xuan';

user2.profilePictureUrl =
   'https://lh3.googleusercontent.com/a-/AOh14GjpOMaar9UtSDsvtKG74PzXm6yLiJ72Ua1HdoMCUg=s96-c';
const user3 = new User();

user3.firstName = 'Hoa';

user3.lastName = 'Vo Xuan';

user3.profilePictureUrl =
   'https://lh3.googleusercontent.com/a-/AOh14GjpOMaar9UtSDsvtKG74PzXm6yLiJ72Ua1HdoMCUg=s96-c';

users = [user1, user2, user3, user1, user2];
