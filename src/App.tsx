import { Switch, useHistory } from 'react-router-dom';
import { Sidebar } from 'layout';
import { Authentication, ClassList, UserList } from 'pages';
import { PrivateRoute } from 'router';
import { fullHeightFlex } from 'shared/styles';
import 'shared/styles/index.css';
import { useEffect } from 'react';

function App() {
   const history = useHistory();

   useEffect(() => {
      history.push('/users');
   }, [history]);

   return (
      <div style={fullHeightFlex('row')}>
         <Sidebar />

         <Switch>
            <PrivateRoute path={'/login'} component={Authentication} />
            <PrivateRoute path={'/users'} component={UserList} />
            <PrivateRoute path={'/classes'} component={ClassList} />
         </Switch>
      </div>
   );
}

export default App;
