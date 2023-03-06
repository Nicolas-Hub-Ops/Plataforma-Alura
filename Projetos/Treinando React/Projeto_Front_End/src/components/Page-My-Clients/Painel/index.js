import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './style.css';

const Painel = () => {

    const [clients, setClients] = useState([]);
    const getClients = async () => {
        try {
            const res = await axios.get('http://localhost:4000/list/client/');
            const data = res.data;
            console.log(data);
            setClients(data);
            
        } catch (error) {
            console.log(error)   
        }
    }
    useEffect(() => {
        getClients();
    }, []);


    return(
        <div>
            {
                clients.length === 0 ? <h1 className="loading">Carregando...</h1> : (
                    clients.map((client) => (
                        <Link to={`/client/${client._id}`} className='painel'>
                            <img className='image-painel' src={`http://localhost:4000/files/${client.foto}`} alt="response"/>
                            <h1 className='name-painel'>
                                {client.nome}
                            </h1>
                        </Link>
                    ))
                )
            }
        </div>
    )
}

export default Painel;