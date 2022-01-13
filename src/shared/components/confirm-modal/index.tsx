import { Button, Dialog } from '@mui/material';
import { centerVertical } from 'shared/styles';

interface IProps {
   open: boolean;
   onClose: (type: 'confirm' | 'cancel') => void;
   message: string;
   title: string;
}

export const ConfirmModal = ({ open, onClose, message, title }: IProps) => {
   return (
      <Dialog open={open} onBackdropClick={() => {}}>
         <div style={{ padding: 20, ...centerVertical }}>
            <h3 style={{ paddingBottom: 30 }}>{title}</h3>
            <p>{message}</p>

            <div style={{ paddingTop: 20 }}>
               <Button
                  variant="contained"
                  style={{ marginRight: 50 }}
                  onClick={() => onClose('confirm')}
               >
                  Xác nhận
               </Button>
               <Button
                  variant="contained"
                  onClick={() => onClose('confirm')}
                  color="error"
               >
                  Hủy
               </Button>
            </div>
         </div>
      </Dialog>
   );
};
