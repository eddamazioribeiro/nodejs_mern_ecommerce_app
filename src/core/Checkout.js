import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import {getBraintreeClientToken} from './apiCore';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {
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
            }
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

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce
                console.log('Senda nonce and total to process: ', nonce, getTotal(products));
            })
            .catch(error => {
                console.log('dropin error', error);
                setData({...data, error: error.message});
            });
    }

    const showDropIn = () => {
        return(
            <div onBlur={() => setData({...data, error: ''})}>
                {data.clientToken !== null && data.clientToken !== '' && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{
                                authorization: data.clientToken
                            }}
                            onInstance={(instance) => (data.instance = instance)}/>
                        <button
                            className='btn btn-success'
                            onClick={buy}>
                            Pay
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }
    
    const showError = (error) => {
        return(
            <div 
                className='alert alert-danger'
                style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        );
    }

    return(
        <div>
            <h2>
                Total: ${getTotal()}
                {showError(data.error)}
                {showCheckout()}
            </h2>
        </div>
    );
}

export default Checkout;