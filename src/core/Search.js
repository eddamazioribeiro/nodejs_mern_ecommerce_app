import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getCategories } from './apiCore';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false

    });

    const {
        categories,
        category,
        search,
        results,
        searched } = data;

    useEffect(() => {
        loadCategories();
    });

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({ ...data, categories: data });
            }
        })
    }

    const searchSubmit = () => {
        // code here
    }

    const handleChange = () => {
        // code here
    }

    const searchForm = () => {
        return (
            <form onSubmit={searchSubmit}>
                <span className='input-group-text'>
                    <div className='input-group input-group-lg'>
                        <div className='input-group-prepend'>
                            <select
                                className='btn mr-2'
                                onChange={handleChange('category')}>
                                <option value="All">Pick Category</option>
                                {categories.map((c, i) => (
                                    <option
                                        key={i}
                                        value={c._id}>
                                        {c.name.substr(0, 20)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type='search'
                            className='form-control'
                            onChange={handleChange('search')}
                            placeholder='Serch by name'>
                        </input>
                    </div>
                    <div
                        className='btn input-group-append'
                        style={{ border: 'none' }}>
                        <button className='input-group-text'>
                            Search
                        </button>
                    </div>
                </span>
            </form>
        );
    }

    return (
        <div className='row'>
            <div className='container'>
                {searchForm()}
            </div>
        </div>
    );
}

export default Search;