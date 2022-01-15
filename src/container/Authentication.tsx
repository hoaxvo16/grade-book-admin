import { storageService } from 'shared/services';
import { userViewModel } from 'shared/view-models';

export const Authentication = ({ children }: any) => {
   const user = storageService.getSessionStorage('info');
   if (user) userViewModel.updateUser(JSON.parse(user));
   else {
      userViewModel.logout();
   }

   return children;
};
