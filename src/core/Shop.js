import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Checkbox from './Checkbox';
import RadioButton from './RadioButton';
import {getCategories} from './apiCore.js';
import {prices} from './fixedPrices';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories()
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        init();
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy == 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        setMyFilters(newFilters);
    }

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let i in data) {
            if (data[i]._id === parseInt(value)) {
                array = data[i].array;
            }
        }

        return array;
    }

    return(
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Categories</h4>
                    <ul>
                        <Checkbox
                            categoties={categories}
                            handleFilters={filters => {
                                handleFilters(filters, 'category')
                            }}/>
                    </ul>
                    <h4>Price</h4>
                    <div>
                        <RadioButton
                            prices={prices}
                            handleFilters={filters => {
                                handleFilters(filters, 'price')
                            }}/>
                    </div>                    
                </div>
                <div className="col-8">
                    {JSON.stringify(myFilters)}
                </div>                
            </div>
        </Layout>
    );
}

export default Shop;