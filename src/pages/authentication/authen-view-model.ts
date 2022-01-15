import { AuthenError, HttpError } from 'shared/errors';
import { TOKEN_KEY } from 'shared/constants';
import { UserAuthen, UserResponse } from 'shared/types';
import { httpService, cryptoService, storageService } from 'shared/services';
import { BaseViewModel, userViewModel } from 'shared/view-models';

class LoginViewModel extends BaseViewModel {
   async authenUser(user: UserAuthen) {
      let url = '/AdminApi/authentication';

      storageService.clearUser();
      this.startLoading();

      const response: UserResponse | HttpError = await httpService.sendPost(
         url,
         user
      );

      this.stopLoading();
      if (response instanceof HttpError) {
         this.handleError(response);
         return null;
      } else {
         this.storeUser(response);
         return response;
      }
   }

   storeUser(response: UserResponse) {
      const encryptToken = cryptoService.encrypt(response.token);
      storageService.setLocalStorage(TOKEN_KEY, encryptToken);
      userViewModel.updateUser(response.admin);
   }

   handleError(response: HttpError) {
      const error: AuthenError = new AuthenError(response);
      this.makeError(error.getMessage());
   }
}

export const loginViewModel = new LoginViewModel();
