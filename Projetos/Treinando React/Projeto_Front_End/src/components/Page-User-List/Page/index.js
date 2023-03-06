import React from 'react';
import './Page.css';
import Search from '../search';
import Table from '../Table';


const UserList = () => {
    return (
        <header>
            <div className='user-list'>
                <Search />
                <Table />
            </div>
        </header>
    )
}

export default UserList;