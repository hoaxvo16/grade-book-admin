import { TextField, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import '../style/index.css';
import { useState } from 'react';

interface IProps {
   onLogin: (username: string, password: string) => void;
}

export const Login = ({ onLogin }: IProps) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   return (
      <div className="login-container">
         <div className="login-header">
            <h2>ADMIN</h2>
            <AdminPanelSettingsIcon htmlColor="" fontSize="large" />
         </div>
         <br />
         <TextField
            onChange={e => setUsername(e.target.value)}
            id="filled-search"
            label="Username"
            type="search"
         />
         <br />
         <TextField
            onChange={e => setPassword(e.target.value)}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
         />
         <br />
         <Button
            onClick={() => onLogin(username, password)}
            style={{ width: 250 }}
            color="primary"
            variant="contained"
         >
            DANG NHAP
         </Button>
      </div>
   );
};
