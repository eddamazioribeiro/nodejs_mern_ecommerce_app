import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from '../admin/apiAdmin';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        getProducts()
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = (productId) => {
        deleteProduct(productId, user._id, token)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts();
            }
        });
    }

    return(
        <Layout
            title='Manage Products'
            description='Create, update or delete Products'
            className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>
                        Total {products.lenght} products
                    </h2>
                    <hr/>
                    <ul className='list-group'>
                        {products.map((prod, i) => {
                            return(
                                <li
                                    key={i}
                                    className='list-group-item d-flex justify-content-between align-items-center'>
                                    <strong>
                                        {prod.name}
                                    </strong>
                                    <Link
                                        to={`/admin/procuct/update/${prod._id}`}>
                                        <span className='badge badge-warning badge-pill'>
                                            Update
                                        </span>
                                        <span
                                            onClick={() => {
                                                destroy(prod._id);
                                            }}
                                            className='badge badge-danger badge-pill'>
                                            Delete
                                        </span>                                        
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>           
        </Layout>
    );
}

export default ManageProducts;