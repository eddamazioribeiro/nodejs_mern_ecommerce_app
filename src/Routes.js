import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';

const Routes = () => {
    return(
        <div>
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
            </BrowserRouter>
        </div>
    );
};

export default Routes;