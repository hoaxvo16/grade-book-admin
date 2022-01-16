import { useHistory } from 'react-router-dom';
import { storageService } from 'shared/services';
import { userViewModel } from 'shared/view-models';

export const Authentication = ({ children }: any) => {
   const history = useHistory();
   const user = storageService.getSessionStorage('info');
   if (user) {
      userViewModel.updateUser(JSON.parse(user));

      if (JSON.parse(user).isSuperAdmin) {
         history.push('/admin');
      } else {
         history.push('/users');
      }
   } else {
      userViewModel.logout();
   }

   return children;
};
