import Form from '../Form';
import './Page.css';
import React from 'react';

const ForgotPassword = () => {
    return (
        <div className='forgot-password'>
            <div className="form-forgot-passward">
                <h1> Redeem <span>admin area</span></h1>
                <Form message="Resposta da verificação" title="Redeem" />
            </div>
        </div>
    )
}

export default ForgotPassword;