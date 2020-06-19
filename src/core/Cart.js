import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from './Card';
import {getCart, removeItem} from './cartHelpers';
import {Link} from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        setItems(getCart());
        setRefresh(false);
    }, [refresh]);

    const showItems = (items) => {
        return(
            <div>
                <h2>
                    Your cart has {`${items.length}`} items
                </h2>
                {items.map((p, i) => (
                    <Card
                        key={i}
                        product={p}
                        showAddToCart={false}
                        showRemoveProduct={true}
                        cartUpdate={true}
                        refresh={(value = false) => {
                            setRefresh(value);
                        }}/>
                    )
                )}
            </div>
        );
    }

    const noItemsMessage = () => {
        return(
            <h2>
                Your cart is empty.
                <br/> 
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