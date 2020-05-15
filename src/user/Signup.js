import React, {useState} from 'react';
import Layout from '../core/Layout'
import {API} from '../config'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signUp = (user) => {
        console.log(user);

        fetch(`${API}/signup`,{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const clickSubmit = (event) => {
        event.preventDefault();

        signUp({name, email, password});
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
                    onChange={handleChange('name')}>
                </input>
            </div>
            <div className='form-group'>
                <label
                    className='text-muted'>E-mail
                </label>
                <input
                    type='email'
                    className='form-control'
                    onChange={handleChange('email')}>
                </input>
            </div>
            <div className='form-group'>
                <label
                    className='text-muted'>Password
                </label>
                <input
                    type='password'
                    className='form-control'
                    onChange={handleChange('password')}>
                </input>
            </div>
            <button
                onClick={clickSubmit}
                className='btn btn-primary'>Submit
            </button>                     
        </form>            
        );
    }

    return(
        <Layout
            title='Signup'
            description='Signup to Node React E-commerce App'
            className='container col-md-8 offset-mde-2'>
            {signUpForm()}
        </Layout>
    );
}

export default Signup;