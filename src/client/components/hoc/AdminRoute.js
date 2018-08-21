import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({ component: PrivateComponent, auth, ...rest }) => {
  // console.log(auth);
  return (
    <Route
      {...rest}
      render={props =>{
          // console.log(props);
        if(auth === false){
            return <Redirect to="" />
        }
        if(auth && !auth.isAdmin){
            return <Redirect to="" />
        }
        return <PrivateComponent {...props} />
        // (auth === false ) ? <Redirect to="/" /> : <Component {...props} />
      }
    }
    />
  );
};

export default AdminRoute;
