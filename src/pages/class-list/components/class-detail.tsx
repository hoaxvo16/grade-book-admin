import {
   Box,
   Dialog,
   DialogContent,
   Tabs,
   Tab,
   DialogActions,
   Button,
} from '@mui/material';
import React from 'react';
import { ClassDetailInfo } from 'shared/models';
import { ClassAssignment } from './class-assignment';
import { ClassMember } from './class-member';
import { ClassInfo } from './class-info';

interface IProps {
   show: boolean;
   onClose: () => void;
   classInfo: ClassDetailInfo;
}

export const ClassDetail = ({ show, onClose, classInfo }: IProps) => {
   const [value, setValue] = React.useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const renderItem = React.useMemo(() => {
      switch (value) {
         case 0:
            return <ClassInfo classInfo={classInfo} />;
         case 1:
            return <ClassMember classInfo={classInfo} />;
         case 2:
            return <ClassAssignment classInfo={classInfo} />;
      }
   }, [value, classInfo]);

   return (
      <Dialog onClose={onClose} open={show}>
         <DialogContent style={{ height: 500 }}>
            <Box sx={{ width: '100%' }}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                     value={value}
                     onChange={handleChange}
                     aria-label="basic tabs example"
                  >
                     <Tab label="Thông tin lớp" />
                     <Tab label="Thành viên" />
                     <Tab label="Cột điểm" />
                  </Tabs>
               </Box>
            </Box>
            {renderItem}
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
         </DialogActions>
      </Dialog>
   );
};
