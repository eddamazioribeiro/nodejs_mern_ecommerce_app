import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showResultMsg, setShowResultMsg] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setShowResultMsg(false);

        createCategory(user._id, token, {name})
        .then((data) => {
            setShowResultMsg(true);                
            
            if (data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        });
    }

    const newCategoryForm = () => {
        return(
            <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>
                        Name
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        onChange={handleChange}
                        value={name}
                        required
                        autoFocus>
                    </input>
                </div>
                <button className='btn btn-outline-primary'>
                    Create Category
                </button>                
            </form>
        );
    }

    const showResult = () => {
        setTimeout(() => {
            setShowResultMsg(false);
        }, 2000);

        if (success) {            
            return(
                <h3 className='text-success'>
                    {name} successfully created!
                </h3>
            );
        } else if (error) {
            return(
                <h3 className='text-danger'>
                    Category name already in use!
                </h3>
            );  
        }
    }

    const goBack = () => {
        return(
            <div className='mt-5'>
                <Link
                    to='/admin/dashboard'
                    className='text-warning'>
                        Back to dashboard
                </Link>
            </div>
        );
    }
    
    return(
        <Layout
            title='Add a new category'
            description={`Hello, ${user.name}! Ready to add a new category?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showResultMsg ? showResult() : ''}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
}

export default AddCategory;