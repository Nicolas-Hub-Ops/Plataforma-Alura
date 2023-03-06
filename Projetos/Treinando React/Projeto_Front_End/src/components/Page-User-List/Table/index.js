import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import React from 'react';

const Table = () => {

    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const res = await axios.get('https://randomuser.me/api/?results=100');
            const data = res.data;
            setUsers(data.results);
            
        } catch (error) {
            console.log(error)   
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

  
    return (
        <div>
            <div className='container'>
                <table className='table-users'>
                    <thead className='thead-users'>
                        <tr className='tr-thead-users'>
                            <th className='th-users'>Image</th>
                            <th className='th-users'>Name</th>
                            <th className='th-users'>Username</th>
                            <th className='th-users'>E-mail</th>
                            <th className='th-users'>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length <= 99 ? <tr><td>Carregando...</td></tr> : (
                            users.map((user) => (
                                <tr className='tr-tbody-users' key={user.login.sha256}>
                                    <td className='tdImg'><a href={user.picture.medium}><img className='img-user' src={user.picture.medium} alt="img-user"/></a></td>
                                    <td className='tdValues'>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
                                    <td className='tdValues'>{user.login.username}</td>
                                    <td className='tdValues'>{user.email}</td>
                                    <td className='tdAge'>{user.dob.age} anos</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;