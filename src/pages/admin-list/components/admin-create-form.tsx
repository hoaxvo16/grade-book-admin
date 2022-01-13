import {
   Button,
   Checkbox,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   FormControlLabel,
   FormGroup,
   TextField,
} from '@mui/material';
import { useState } from 'react';

interface IProps {
   open: boolean;
   onClose: () => void;
   onCreate: (
      username: string,
      password: string,
      isSuperAdmin: boolean
   ) => void;
}

export const AdminCreateForm = ({ open, onClose, onCreate }: IProps) => {
   const [checked, setCheck] = useState(false);

   const [username, setUsername] = useState('');

   const [password, setPassword] = useState('');

   const [error, setError] = useState({
      passwordError: false,
      passwordErrorMessage: '',
      usernameError: false,
      usernameErrorMessage: '',
   });

   const onUsernameChange = (e: any) => {
      const value = e.target.value.trim();
      if (value !== '') {
         setError({ ...error, usernameError: false, usernameErrorMessage: '' });
      }
      setUsername(value);
   };

   const onPasswordChange = (e: any) => {
      const value = e.target.value.trim();
      if (value !== '') {
         setError({
            ...error,
            passwordError: false,
            passwordErrorMessage: '',
         });
      }
      setPassword(value);
   };
   const onSubmit = () => {
      if (password === '') {
         setError({
            ...error,
            passwordError: true,
            passwordErrorMessage: 'Mật khẩu trống',
         });
      }
      if (username === '') {
         setError({
            ...error,
            usernameError: true,
            usernameErrorMessage: 'Tên người dùng trống',
         });
      }
      if (username !== '' && password !== '') {
         onCreate(username, password, checked);
      }
   };
   return (
      <Dialog open={open} onClose={onClose} onBackdropClick={() => {}}>
         <DialogTitle>Tạo tài khoản Admin</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Tạo tài khoản admin cho GradeBook, admin này chỉ có quyền trên
               các lớp học và user, không được phép tạo admin mới, cấp quyền cao
               nhất để admin này có mọi quyền
            </DialogContentText>
            <TextField
               autoFocus
               margin="dense"
               id="name"
               label="Tên người dùng"
               type="text"
               value={username}
               error={error.usernameError}
               helperText={error.usernameErrorMessage}
               onChange={onUsernameChange}
               fullWidth
               variant="standard"
            />
            <TextField
               autoFocus
               margin="dense"
               id="password"
               label="Mật khẩu"
               type="text"
               helperText={error.passwordErrorMessage}
               value={password}
               error={error.passwordError}
               onChange={onPasswordChange}
               fullWidth
               variant="standard"
            />
            <FormGroup>
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={checked}
                        onClick={() => setCheck(!checked)}
                     />
                  }
                  label="Cấp quyền cao nhất"
               />
            </FormGroup>
         </DialogContent>
         <DialogActions>
            <Button variant="contained" color="error" onClick={onClose}>
               Hủy
            </Button>
            <Button onClick={onSubmit} variant="contained">
               Tạo
            </Button>
         </DialogActions>
      </Dialog>
   );
};
