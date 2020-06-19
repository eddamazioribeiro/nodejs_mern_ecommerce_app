import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddProduct from './admin/AddProduct';
import AddCategory from './admin/AddCategory';
import Home from './core/Home';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route 
                path='/'
                exact component={Home}/>
            <Route 
                path='/shop'
                exact component={Shop}/>                         
            <Route 
                path='/signin'
                exact component={Signin}/>
            <Route 
                path='/signup'
                exact component={Signup}/>
            <PrivateRoute 
                path='/user/dashboard'
                exact component={Dashboard}/>
            <AdminRoute 
                path='/admin/dashboard'
                exact component={AdminDashboard}/> 
            <AdminRoute 
                path='/create/category'
                exact component={AddCategory}/>
            <AdminRoute 
                path='/create/product'
                exact component={AddProduct}/>
            <Route 
                path='/product/:productId'
                exact component={Product}/>
            <Route 
                path='/cart'
                exact component={Cart}/>                                                                                                           
        </BrowserRouter>
    );
};

export default Routes;