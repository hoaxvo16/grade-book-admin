import { Observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { FeedBack } from 'shared/components';
import { UserAuthen } from 'shared/types';
import { loginViewModel } from './authen-view-model';
import { Login } from './components/Login';

export const Authentication = () => {
   const history = useHistory();
   const onLogin = async (username: string, password: string) => {
      const user: UserAuthen = {
         username: username,
         password: password,
      };

      const result = await loginViewModel.authenUser(user);

      if (result) {
         if (result.admin.isSuperAdmin) {
            history.push('/admin');
         } else {
            history.push('/users');
         }
      }
   };
   return (
      <>
         <Observer>
            {() => {
               const { isError, message } = loginViewModel;
               return (
                  <FeedBack
                     severity="error"
                     message={message}
                     open={isError}
                     handleClose={() => loginViewModel.deleteError()}
                  />
               );
            }}
         </Observer>

         <Login onLogin={onLogin} />
      </>
   );
};
