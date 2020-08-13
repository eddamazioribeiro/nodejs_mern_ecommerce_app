import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import {getBraintreeClientToken} from './apiCore';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, refresh}) => {
    const [data, setData] = useState({
        success: false,
        clientToken: '',
        error: '',
        instance: {},
        address: ''
    });

    useEffect(() => {
        getPaymentToken(userId, token);
    }, []);    

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getPaymentToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
        .then(data => {
            if (data.error) {
                setData({...data, error: data.error});
            } else {
                setData({...data, clientToken: data.clientToken});
                console.log(data.clientToken)
            }

            refresh(true);
        })
    }

    const getTotal = () => {
        return products.reduce((currVal, nextVal) => {
            return currVal + nextVal.count * nextVal.price;
        }, 0);
    }

    const showCheckout = () => {
        return(
            <div className='mt-2 mb-2'>
                {isAuthenticated() ? (
                    <div>
                        {showDropIn()}
                    </div>                       

                ) : (
                    <Link to='/signin'>
                        <button className='btn btn-primary'>
                            Sign in to checkout
                        </button>
                    </Link>
                )}
            </div>
        );
    }

    const showDropIn = () => {
        return(
            <div>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{
                                authorization: data.clientToken
                            }}
                            onInstance={instance => (data.instance = instance)}/>
                            <button
                                className='btn btn-success'>
                                Checkout
                            </button>
                    </div>
                ) : null}
            </div>
        );
    }
    
    return(
        <div>
            <h2>
                Total: ${getTotal()}
                {showCheckout()}
            </h2>
        </div>
    );
}

export default Checkout;