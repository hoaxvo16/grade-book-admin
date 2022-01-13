import { Backdrop, CircularProgress } from '@mui/material';

interface IProps {
   open: boolean;
   onClose?: () => void;
}

export const Loading = ({ open, onClose }: IProps) => {
   return (
      <Backdrop
         style={{ position: 'absolute' }}
         sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
         open={open}
         onClick={onClose}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
   );
};
