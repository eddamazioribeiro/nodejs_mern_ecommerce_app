import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signIn, authenticate} from '../auth';

const SignIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, error, loading, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }
    
    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({...values, loading: true});

        signIn({email, password})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    });
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true,
                                loading: false
                            });
                        }
                    );
                }
            });
    }

    const signInForm = () => {
        return(
            <form>
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

    const showLoading = () => {
        if (loading) {
            return (
                <div
                    className='alert alert-info'>
                        <h2>Loading...</h2>
                </div>
            );
        }
    }

    const redirectUser = () => {
        if (redirectToReferrer) {
            return(
                <Redirect to="/"/>
            );
        }
    }

    return(
        <Layout
            title='Signin'
            description='Signin to Node React E-commerce App'
            className='container col-md-8 offset-mde-2'>
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
}

export default SignIn;