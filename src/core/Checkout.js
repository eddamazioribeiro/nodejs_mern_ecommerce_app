import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';

const Checkout = ({products}) => {
    const getTotal = () => {
        return products.reduce((currVal, nextVal) => {
            return currVal + nextVal.count * nextVal.price;
        }, 0);
    }

    const showCheckout = () => {
        return(
            <div className='mt-2 mb-2'>
                {isAuthenticated() ? (
                    <Link to='/checkout'>
                        <button className='btn btn-success'>
                            Checkout
                        </button>
                    </Link>                        

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