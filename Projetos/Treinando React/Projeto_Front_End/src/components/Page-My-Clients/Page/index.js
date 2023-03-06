import { Link } from 'react-router-dom';
import Painel from '../Painel';
import './Page.css';
import React from 'react';

const PageMyClients = () => {
    return (
        <div className='page-my-clients'>
            <Link to="/ListClients/Register" className='btn-cadastra'>Cadastrar</Link>
            <Painel/>
        </div>
    )
}

export default PageMyClients;