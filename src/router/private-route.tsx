import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
   component?: any;
   children?: any;
}

let is = true;

export const PrivateRoute = (props: PrivateRouteProps) => {
   const { component: Component, children, ...rest } = props;

   return (
      <Route
         {...rest}
         render={routeProps =>
            is ? (
               Component ? (
                  <Component {...routeProps} />
               ) : (
                  children
               )
            ) : (
               <Redirect
                  to={{
                     pathname: '/login',
                     state: { from: routeProps.location },
                  }}
               />
            )
         }
      />
   );
};
