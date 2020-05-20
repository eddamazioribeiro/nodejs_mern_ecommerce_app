import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const AdminRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated() &&
                    isAuthenticated().user.role === 1) {
                    return (
                        <Component {...props}/>
                    )
                } else {
                    return (
                        <Redirect
                        to={{
                            pathname: '/signin',
                            state: {from: props.location}
                        }}/>
                    )
                }
            }}>

        </Route>
    );
}

export default AdminRoute;