import { Check, DoDisturb } from '@mui/icons-material';
import { Dialog, Button, DialogContent, DialogActions } from '@mui/material';
import { baseColors } from 'assets/colors';
import { CSSProperties } from 'react';
import { Avatar } from 'shared/components';
import { User } from 'shared/models';
import { centerHorizontal } from 'shared/styles';

interface IProps {
   show: boolean;
   user: User;
   onClose: () => void;
   onBlock: () => void;
}

export const UserDetail = ({ user, show, onClose, onBlock }: IProps) => {
   const { container, topContainer } = makeStyles();
   return (
      <Dialog onClose={onClose} open={show}>
         <DialogContent>
            <div style={container}>
               <Avatar size={70} user={user} />
               <div style={topContainer}>
                  <div style={{ marginBottom: '0.7rem', ...centerHorizontal }}>
                     <b style={{ marginRight: 5 }}>Email: </b>
                     <span> {user.email}</span>
                     {user.isEmailConfirmed ? (
                        <div
                           style={{
                              color: baseColors.green,
                              ...centerHorizontal,
                              marginLeft: 10,
                              fontSize: 14,
                           }}
                        >
                           <Check /> Đã xác nhận
                        </div>
                     ) : (
                        <div
                           style={{
                              color: baseColors.red,
                              ...centerHorizontal,
                              marginLeft: 10,
                              fontSize: 14,
                           }}
                        >
                           <DoDisturb /> Chưa xác nhận
                        </div>
                     )}
                  </div>
                  <p>
                     <b>Họ: </b> <span>{user.lastName} </span>
                  </p>

                  <p>
                     <b>Tên: </b> <span>{user.firstName}</span>
                  </p>

                  <p>
                     <b>MSSV: </b> <span>{user.studentIdentification}</span>
                  </p>
                  <p>
                     <b>Trạng thái: </b>
                     <span
                        style={
                           user.isLocked
                              ? { color: baseColors.red }
                              : { color: baseColors.green }
                        }
                     >
                        {user.isLocked ? 'Bị khóa' : 'Bình thường'}
                     </span>
                  </p>
               </div>

               {user.isLocked ? (
                  <Button onClick={onBlock} color="success" variant="contained">
                     Bỏ chặn người dùng
                  </Button>
               ) : (
                  <Button onClick={onBlock} color="error" variant="contained">
                     Chặn người dùng
                  </Button>
               )}
            </div>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
         </DialogActions>
      </Dialog>
   );
};

const makeStyles = () => {
   const container: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   };

   const topContainer: CSSProperties = {
      padding: '20px 0px',
   };

   const bottomContainer: CSSProperties = {};

   return { container, topContainer, bottomContainer };
};
