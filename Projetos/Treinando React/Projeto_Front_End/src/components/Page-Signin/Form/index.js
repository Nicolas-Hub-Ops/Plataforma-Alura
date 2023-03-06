import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

const Form = () => {
    
    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ server, setServer ] = React.useState('');

    const navigate = useNavigate();
    
    const login = async (e) => {
        e.preventDefault()
        try {
            const object = {
                username,
                password
            }

            const post = await axios({
                url: "http://localhost:4000/admin/login",
                method: "post",
                data: object
            })

            if(post.data.auth) {
                console.log({'auth': true});
                localStorage.setItem("permission", post.data.auth);
                navigate('/Userlist');
            }

        } catch (error) {
            setServer('Username não existe ou a senha é inválida')
        }
    }

    return (
        <form onSubmit={login}>
            <div className="group-signin">      
                <input 
                    type='text' 
                    placeholder='Username'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                />
                <span className="bar"></span>
            </div>
            <div className="group-signin">      
                <input 
                    type='password' 
                    placeholder='Password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <span className="bar"></span>
            </div>
            <div className='checkbox-signin'>
            </div>
            <span className='response'>{server}</span>
            <div className='btn-signin'>
                <button type='submit'>Sign In</button>
                <Link className='signup' to="/signup">Create Account</Link>
            </div>
        </form>
    )
}

export default Form;