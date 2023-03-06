import Form from '../Form';
import './Page.css';
import React from 'react';

const Signup = () => {
    return (
        <div className='signup-page'>
            <div className="form-signup">
                <h1> Sign-Up <span className='dominio'>admin area</span></h1>
                <Form />
            </div>
        </div>
    )
}

export default Signup;