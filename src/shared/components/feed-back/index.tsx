import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React from 'react';

interface IProps {
   open: boolean;
   handleClose: () => void;
   severity: AlertColor;
   message: string;
}
export const FeedBack = ({ open, handleClose, severity, message }: IProps) => {
   return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
         <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
         >
            {message}
         </Alert>
      </Snackbar>
   );
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
