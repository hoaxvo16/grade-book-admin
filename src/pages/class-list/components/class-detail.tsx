import { Typography, Box, Dialog } from '@mui/material';
import { ClassDetailInfo } from 'shared/models';

interface IProps {
   show: boolean;
   onClose: () => void;
   classInfo: ClassDetailInfo;
}

export const ClassDetail = ({ show, onClose, classInfo }: IProps) => {
   return (
      <Dialog onClose={onClose} open={show}>
         <Box>
            <Typography>{classInfo.name}</Typography>
         </Box>
      </Dialog>
   );
};
