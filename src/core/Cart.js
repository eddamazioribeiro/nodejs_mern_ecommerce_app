import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from './Card';
import {getCart} from './cartHelpers';
import {Link} from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        setItems(getCart());
    }, []);

    const showItems = (items) => {
        return(
            <div>
                <h2>
                    Your cart has {`${items.length}`} items
                </h2>
                {items.map((p, i) => (
                    <Card key={i} product={p}/>
                    )
                )}
            </div>
        );
    }

    const noItemsMessage = () => {
        return(
            <h2>
                Your cart is empty.
                <Link to='/shop'>
                    Continue shopping
                </Link>
            </h2>  
        );
    }

    return(
        <Layout
            title='Shopping Cart'
            description='Manage your cart items. Add, remove, checkout or continue shopping.'
            className='container-fluid'>
            <div className='row'>
                <div className='col-6'>
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className='col-6'>
                    <p>Show checkout options / shipping address / total / update quantity</p>
                </div>                
            </div>               
        </Layout>
    );
}

export default Cart;