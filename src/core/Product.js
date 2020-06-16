import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from './Card';
import {read} from './apiCore';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, []);

    const loadSingleProduct = (productId) => {
        read(productId)
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data.product);
            }
        });
    }

    return(
        <Layout
            title={product && product.name}
            description={
                product
                && product.description
                && product.description.substring(0, 100)}
            className='container-fluid'>
            <div className='row'>
                {product
                && product.description
                &&
                <Card
                    product={product}
                    showViewProductButton={false}/>}
            </div>
        </Layout>
    );
}

export default Product;