import { Link, useLocation } from 'react-router-dom';
import './style.css';
import React from 'react';

const Dashboard = () => {

    const local = useLocation();

    function seePath(path) {
        if(local.pathname === path) {
            return `routeSelect`;
        }
    }

    function logout() {
        localStorage.clear()
        console.log({
            'auth': false,
            'action': 'localStorage.clear()',
            'message': 'Logout realizado com sucesso',
        })
    }

    return (
        <div>
            <div><img className='menu-little' id="menu-pequeno" src="https://cdn-icons-png.flaticon.com/512/55/55003.png" alt="icone de menu"/></div>
            <menu className="menu" id="menu-grande" >
                <div>
                    <ul>
                        <li><Link className={`links ${seePath('/UserList')}`} to="/UserList"><i className="fi fi-bs-users"></i></Link></li>
                        <li><Link className={`links ${seePath('/HttpStatusTester')}`} to="/HttpStatusTester"><img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/cat-head.png" alt="icon-cat"/></Link></li>
                        <li><Link className={`links ${seePath('/RandomDogs')}`} to="/RandomDogs"><img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/year-of-dog.png" alt="icon-dog"/></Link></li>
                        <li><Link className={`links ${seePath('/ListClients')}`} to="/ListClients"><i className="fi fi-sr-users-alt"></i></Link></li>
                        <li><Link className="logout" to="/" onClick={logout}><i className="fi fi-br-exit"></i></Link></li>
                    </ul>
                </div>
            </menu>
        </div>
    )
}

export default Dashboard;