import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './style.css';

const OneClient = () => {

    const [info, setInfo] = useState([]);
    const getInfo = async () => {
        try {
            const res = await axios.get('http://localhost:4000/list/client/');
            const data = res.data;
            console.log(data);
            setInfo(data);
            console.log(info);
            
        } catch (error) {
            console.log(error)   
        }
    }
    useEffect(() => {
        getInfo();
    }, [])


    return (
        <div>
            <Link to="/ListClients"><img className="return-page" src="https://img.icons8.com/sf-black-filled/64/808080/chevron-left.png" alt="return to page"/></Link>
            <div className='container-one-geral'>
                <div className='container-one-image'>
                    <img src="http://localhost:4000/files/1672932993221-user.png" alt="Client"/>
                </div>
                <div className='container-one-info'>
                    <ul>
                        <li>
                            <label className='label-one'>Nome</label>
                            <input className='input-one' value={'Myllena Sousa Rodrigues'}/>
                        </li>
                        <li>
                            <label className='label-one'>E-mail</label>
                            <input className='input-one' value={'myllenasousarodrigues17@gmail.com'}/>
                        </li>
                        
                        <li>
                            <label className='label-one'>Telefone</label>
                            <input className='input-one' value={'(61)9-9787-9889'}/>
                        </li>
                        <li>
                            <label className='label-one'>CPF</label>
                            <input className='input-one' value={'058.051.771-37'}/>
                        </li>
                        <li>
                            <label className='label-one'>País - Estado</label>
                            <input className='input-one' value={'Brasil - DF'}/>
                        </li>
                        <li>
                            <label className='label-one'>Endereço</label>
                            <input className='input-one' value={'SHA Conjunto 5 Chac 43 Lote 32'}/>
                        </li>
                        <li>
                            <label className='label-one'>Estado Civil</label>
                            <input className='input-one' value={'Solteira'}/>
                        </li>
                    </ul>
                </div>
                <div className='btns'>
                    <button className='btn-put'>Salvar</button>
                    <button className='btn-del'>Apagar</button>
                </div>
            </div>
        </div>
    )
}


export default OneClient;