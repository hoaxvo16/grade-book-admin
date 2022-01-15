import { makeObservable, observable, action } from 'mobx';
import { TOKEN_KEY } from 'shared/constants';
import { storageService } from 'shared/services';
import { Admin } from 'shared/models';
import { BaseViewModel } from './base-view-model';
class UserViewModel extends BaseViewModel {
   user: Admin = new Admin();
   dataVersion: number = 0;

   constructor() {
      super();
      makeObservable(this, {
         dataVersion: observable,
         user: observable,
         updateUser: action,
      });
   }

   isLogin() {
      return storageService.getLocalStorage(TOKEN_KEY) !== null;
   }

   updateUser(user: Admin) {
      console.log('update user');
      this.user = user;
      storageService.setSessionStorage('info', JSON.stringify(user));
   }

   logout() {
      storageService.clearUser();
   }
}

export const userViewModel = new UserViewModel();
