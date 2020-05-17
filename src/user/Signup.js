import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {signUp} from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }
    
    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({...values, error: false});

        signUp({name, email, password})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    });
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        success: true
                    });
                }
            }) ;
    }

    const signUpForm = () => {
        return(
            <form>
            <div className='form-group'>
                <label
                    className='text-muted'>Name
                </label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('name')}
                    value={name}>
                </input>
            </div>
            <div className='form-group'>
                <label
                    className='text-muted'>E-mail
                </label>
                <input
                    type='email'
                    className='form-control'
                    onChange={handleChange('email')}
                    value={email}>
                </input>
            </div>
            <div className='form-group'>
                <label
                    className='text-muted'>Password
                </label>
                <input
                    type='password'
                    className='form-control'
                    onChange={handleChange('password')}
                    value={password}>
                </input>
            </div>
            <button
                onClick={clickSubmit}
                className='btn btn-primary'>Submit
            </button>                     
        </form>            
        );
    }

    const showError = () => {
        return(
            <div
                className='alert alert-danger'
                style={{display: error ? '' : 'none'}}>
                    {error}
            </div>
        );
    }

    const showSuccess = () => {
        return(
            <div
                className='alert alert-info'
                style={{display: success ? '' : 'none'}}>
                    New account is created. Please <Link to='/signin'>Sign-in</Link>
            </div>
        );
    }

    return(
        <Layout
            title='Signup'
            description='Signup to Node React E-commerce App'
            className='container col-md-8 offset-mde-2'>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
}

export default Signup;