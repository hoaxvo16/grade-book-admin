import { stringToDateDisplay } from 'utils/date';
import { TabProps } from './interface';

export const ClassInfo = ({ classInfo }: TabProps) => {
   return (
      <div style={{ paddingTop: 20 }}>
         <p>
            <b>Tên: </b> <span>{classInfo.name}</span>
         </p>
         <p>
            <b>Ngày bắt đầu: </b>
            <span>{stringToDateDisplay(classInfo.startDate)}</span>
         </p>
         <p>
            <b>Mô tả: </b>
            <span>
               {classInfo.description === ''
                  ? 'Không có'
                  : classInfo.description}
            </span>
         </p>
         <p>
            <b>Phòng: </b>
            <span>{classInfo.room === '' ? 'Không có' : classInfo.room}</span>
         </p>
         <p>
            <b>Số sinh viên: </b>
            <span>{0}</span>
         </p>
         <p>
            <b>Số giáo viên: </b>
            <span>{0}</span>
         </p>
      </div>
   );
};
