import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {listOrders} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    }

    useEffect(() => {
        loadOrders();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return(
                <h1 className='text-danger display-2'>
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return(
                <h1 className='text-danger'>
                    No orders
                </h1>
            );
        }
    }

    const showInput = (key, value) => {
        return(
            <div
                className='input-group mb-2 mr-sm-2'>
                <div className='input-group-prepend'>
                    <div className='input-group-text'>
                        {key}
                    </div>
                </div>
                <input
                    type='text'
                    value={value}
                    className='form-control'
                    readOnly>
                </input>
            </div>
        );
    }

    return(
        <Layout
            title='Orders'
            description={`Hello, ${user.name}! You can manage all the orders here`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showOrdersLength()}
                    {orders.map((order, i) => {
                        return(
                            <div
                                key={i}
                                className='mt-5'
                                style={{borderBottom: '5px solid indigo'}}>
                                <h2 className='mb-5'>
                                    <span className='bg-primary'>
                                        Order ID: {order._id}
                                    </span>
                                </h2>
                                <ul>
                                    <li className='list-group-item'>
                                        {order.status}
                                    </li>
                                    <li className='list-group-item'>
                                        Transaction ID: {order.transaction_id}
                                    </li>
                                    <li className='list-group-item'>
                                        Amount: ${order.amount}
                                    </li>
                                    <li className='list-group-item'>
                                        Ordered by: {order.user.name}
                                    </li>
                                    <li className='list-group-item'>
                                        Ordered on: {moment(order.createdAt).format('DD/MM/yyyy')}, {moment(order.createdAt).fromNow()}
                                    </li>
                                    <li className='list-group-item'>
                                        Delivered address: {order.address}
                                    </li>                                                                                                                                                                     
                                </ul>
                                <h3 className='mt-4 mb-4 font-italic'>
                                    Total products in the order: {order.products.length}
                                </h3>
                                {order.products.map((prod, i) => (
                                    <div
                                        key={i}
                                        className='mb-4'
                                        style={{padding: '20px', boder: '1px solid indigo'}}>
                                        {showInput('Product name', prod.name)}
                                        {showInput('Product price', prod.price)}
                                        {showInput('Product total', prod.count)}
                                        {showInput('Product Id', prod._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default Orders;