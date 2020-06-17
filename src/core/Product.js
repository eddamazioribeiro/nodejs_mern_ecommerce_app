import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from './Card';
import {read, listRelatedProducts} from './apiCore';

const Product = (props) => {
    const [product, setProduct] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const loadSingleProduct = (productId) => {
        read(productId)
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data.product);
                
                listRelatedProducts(data.product._id)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProducts(data)
                    }
                })
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
                <div className='col-8'>
                    {product
                    && product.description
                    &&
                    <Card
                        product={product}
                        showViewProductButton={false}/>}
                </div>
                <div className='col-4'>
                    <h4>Related products</h4>
                    {relatedProducts.map((p, i) => (
                        <div className='mb-3'>
                            <Card
                                key={i}
                                product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Product;