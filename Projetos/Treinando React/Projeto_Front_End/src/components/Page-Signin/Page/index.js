import Form from '../Form';
import './Page.css';
import React from 'react';

const SignIn = () => {
    return (
        <div className='login-page'>
            <div className="form">
                <h1> Sign-In <span className='area'>admin area</span></h1>
                <Form />
            </div>
        </div>
    )
}

export default SignIn;