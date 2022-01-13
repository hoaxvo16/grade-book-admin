import { Typography, Box, Dialog } from '@mui/material';
import { Avatar } from 'shared/components';
import { User } from 'shared/models';

interface IProps {
   show: boolean;
   user: User;
   onClose: () => void;
}

export const UserDetail = ({ user, show, onClose }: IProps) => {
   return (
      <Dialog onClose={onClose} open={show}>
         <Box padding={2}>
            <Box>
               <Avatar user={user} />
            </Box>
            <Typography>{user.email}</Typography>
            <Typography>{user.firstName}</Typography>
         </Box>
      </Dialog>
   );
};
