import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const UserRoute = ({ component: PrivateComponent, auth, ...rest }) => {
  // console.log(auth);
  return (
    <Route
      {...rest}
      render={props =>{
        if(auth === false){
            return <Redirect to="" />
        }
        // console.log(props);
        // if(auth && auth.email !== 'jaylim106@gmail.com'){
        //     return <Redirect to="" />
        // }
        return <PrivateComponent {...props} />
      }
    }
    />
  );
};

export default UserRoute;
