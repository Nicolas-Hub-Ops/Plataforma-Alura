import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

const Form = () => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [remail, setRemail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [response, setResponse] = React.useState('');
    
    const navigate = useNavigate();
    
    const register = async (e) => {
        e.preventDefault()
        try {
            if(email === remail) {
                console.log('Email correto')
                const object = {
                    username,
                    email,
                    password
                }
                const post = await axios({
                    url: "http://localhost:4000/new/admin/",
                    method: "post",
                    data: object
                })
                console.log(post);
                navigate('/');
            } else {
                setResponse('Email Inválido')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form onSubmit={register}>
            <div className="group-signup">   
                <input 
                    type='text' 
                    placeholder='Username'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)} 
                    required/>
                <span className="bar"></span>
            </div>
            <div className="group-signup">   
                <input 
                    type='email' 
                    placeholder='Email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)} 
                    required/>
                <span className="bar"></span>
            </div>
            <div className="group-signup">    
                <input 
                    type='email' 
                    placeholder='Check Email'
                    name='remail'
                    onChange={(e) => setRemail(e.target.value)} 
                    required/>
                <span className="bar"></span>
            </div>
            <div className="group-signup">   
                <input 
                    type='password' 
                    placeholder='Password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)} 
                    required/>
                <span className="bar"></span>
            </div>
            <span className='alert'>{response}</span>
            <div className='btn-signup'>
                <button type='submit'>Sign Up</button>
                <Link to="/">Sign In</Link>
            </div>
        </form>
    )
}

export default Form;