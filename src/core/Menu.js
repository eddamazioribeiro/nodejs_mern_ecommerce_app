import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signOut, isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'};
    } else {
        return {color: '#ffffff'}
    }
};

const Menu = ({history}) => {
    return(
        <div>
            <ul className='nav nav-tabs bg-primary'>
                <li className='nav-item'>
                    <Link
                        className='nav-link'
                        style={isActive(history, '/')}
                        to='/'>Home
                    </Link>
                </li>
                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link
                                className='nav-link'
                                style={isActive(history, '/signin')}
                                to='/signin'>Signin
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='nav-link'
                                style={isActive(history, '/signup')}
                                to='/signup'>Signup
                            </Link> 
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li>
                        <span
                            className='nav-link'
                            style={{cursor: 'pointer', color: '#ffffff'}}
                            onClick={() => signOut(() => {
                                history.push('/');
                            })}>Signout
                        </span> 
                    </li>  
                )}              
            </ul>
        </div>
    );
};

export default withRouter(Menu);