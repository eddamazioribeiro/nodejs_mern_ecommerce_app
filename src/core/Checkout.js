import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import {getBraintreeClientToken, processPayment, createOrder} from './apiCore';
import {emptyCart} from './cartHelpers';
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
                setData({clientToken: data.clientToken});
            }
        })
    }

    const handleAddress = event => {
        setData({...data, address: event.target.value});
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
                nonce = data.nonce;

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                .then(response => {
                    const createOrderData = { 
                        products: products,
                        transaction_id: response.transaction_id,
                        amount: response.transaction.amount,
                        address: data.address
                    };
                    
                    createOrder(userId, token, createOrderData);

                    setData({...data, success: response.success});
                    emptyCart(() => {
                        refresh(true);
                        console.log('Successfully processed the payment and empty cart');
                    });
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                setData({...data, error: error.message});
            });
    }

    const showDropIn = () => {
        return(
            <div onBlur={() => setData({...data, error: ''})}>
                {data.clientToken !== null && data.clientToken !== '' && products.length > 0 ? (
                    <div>
                        <div className='form-group mb-3'>
                            <label className='text-muted'>
                                Delivery address:
                            </label>
                            <textarea
                                onChange={handleAddress}
                                className='form-control'
                                value={data.address}
                                placeholder='Type your delivery address here'>
                            </textarea>
                        </div>
                        <DropIn
                            options={{
                                authorization: data.clientToken,
                                paypal: {
                                    flow: 'vault'
                                }
                            }}
                            onInstance={(instance) => (data.instance = instance)}/>
                        <button
                            className='btn btn-success btn-block'
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

    const showSuccess = (success) => {
        return(
            <div 
                className='alert alert-info'
                style={{display: success ? '' : 'none'}}>
                Payment processed successfully! Thanks for purchasing
            </div>
        );
    }

    return(
        <div>
            <h2>
                Total: ${getTotal()}
                {showSuccess(data.success)}
                {showError(data.error)}
                {showCheckout()}
            </h2>
        </div>
    );
}

export default Checkout;