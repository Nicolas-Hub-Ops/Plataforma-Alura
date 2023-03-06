//import { Link, useLocation } from 'react-router-dom';
import './style.css';
import React from 'react';

const Form = (props) => {

    return (
        <form>
            <div className="group-forgotpassword">
                <label>E-mail:</label>      
                <input type='email' placeholder='' required/>
                <span className="bar"></span>
                <span className='message'>{props.message}</span>
            </div>
            <div className='btn'>
                <button type='submit'>{props.title}</button>
            </div>
        </form>
    )
}

export default Form;