import { useHistory } from 'react-router-dom';
import { UserAuthen } from 'shared/types';
import { loginViewModel } from './authen-view-model';
import { Login } from './components/Login';

export const Authentication = () => {
   const history = useHistory();
   const onLogin = async (username: string, password: string) => {
      const user: UserAuthen = {
         email: username,
         password: password,
      };

      await loginViewModel.authenUser(user, 'login');
      history.push('/users');
   };
   return <Login onLogin={onLogin} />;
};
