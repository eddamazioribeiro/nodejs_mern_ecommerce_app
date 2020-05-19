import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Layout from './core/Layout';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';


const Routes = () => {
    return(
        <BrowserRouter>
            <Route 
                path='/'
                exact component={Home}/>            
            <Route 
                path='/signin'
                exact component={Signin}/>
            <Route 
                path='/signup'
                exact component={Signup}/>
            <PrivateRoute 
                path='/user/dashboard'
                exact component={Dashboard}/>                                  
        </BrowserRouter>
    );
};

export default Routes;