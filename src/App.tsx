import { Route, Switch, useLocation } from 'react-router-dom';
import { Sidebar } from 'layout';
import { AdminList, Authentication, ClassList, UserList } from 'pages';
import { PrivateRoute } from 'router';
import { fullHeightFlex } from 'shared/styles';
import 'shared/styles/index.css';

function App() {
   const location = useLocation();
   const isInAuthenPage = location.pathname !== '/login';

   return (
      <div style={fullHeightFlex('row')}>
         {isInAuthenPage && <Sidebar />}

         <Switch>
            <Route path={'/login'} component={Authentication} />
            <PrivateRoute path={'/users'} component={UserList} />
            <PrivateRoute path={'/classes'} component={ClassList} />
            <PrivateRoute path={'/admin'} component={AdminList} />
         </Switch>
      </div>
   );
}

export default App;
