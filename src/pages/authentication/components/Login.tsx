import { TextField, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import '../style/index.css';

export const Login = () => {
   return (
      <div className="login-container">
         <div className="login-header">
            <h2>ADMIN</h2>
            <AdminPanelSettingsIcon htmlColor="" fontSize="large" />
         </div>
         <br />
         <TextField id="filled-search" label="Username" type="search" />
         <br />
         <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
         />
         <br />
         <Button style={{ width: 250 }} color="primary" variant="contained">
            DANG NHAP
         </Button>
      </div>
   );
};
