import queryString from 'query-string'; 
import {API} from '../config';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const list = (params) => {
    const query = queryString.stringify(params);

    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getCategories = () => {
    return(
        fetch(`${API}/categories`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}

export const getFilteredProducts = (skip, limit, filters ={}) => {
    const data ={limit, skip, filters};
    
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const read = (productId) => {
    return(
        fetch(`${API}/product/${productId}`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}

export const listRelatedProducts = (productId) => {
    return(
        fetch(`${API}/products/related/${productId}`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}