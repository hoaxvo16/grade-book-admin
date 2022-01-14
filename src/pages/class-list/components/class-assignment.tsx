import { Ballot } from '@mui/icons-material';
import { baseColors } from 'assets/colors';
import { TabProps } from './interface';

export const ClassAssignment = ({ classInfo }: TabProps) => {
   return (
      <div style={{ height: 400, overflow: 'auto', paddingTop: 20 }}>
         {classInfo.assignments.map(item => (
            <div
               key={item.id}
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: 20,
               }}
            >
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     color: baseColors.purple,
                     paddingBottom: 10,
                  }}
               >
                  <Ballot />
                  <h3>{item.name}</h3>
               </div>
               <span>
                  Số điểm:
                  {item.point}
               </span>
            </div>
         ))}
         {classInfo.assignments.length === 0 && (
            <p>Chưa có cột điểm nào được tạo</p>
         )}
      </div>
   );
};
