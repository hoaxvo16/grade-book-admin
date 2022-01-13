import { Typography, Box, Dialog } from '@mui/material';

interface IProps {
   show: boolean;
}

export const AdminDetail = ({ show }: IProps) => {
   return (
      <Dialog open={show}>
         <Box>
            <Typography>User detail</Typography>
         </Box>
      </Dialog>
   );
};
