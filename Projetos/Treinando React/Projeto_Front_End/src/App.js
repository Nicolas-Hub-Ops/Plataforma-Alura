import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from "./components/Page-Signin/Page";
import Title from './components/Top-Title';
import Dashboard from './components/Dashboard-Menu';
import PageUserList from './components/Page-User-List/Page';
import PageHttpTester from './components/Page-Http-Tester/Page';
import PageRandomDogs from './components/Page-Random-Dogs/Page';
import PageMyClients from './components/Page-My-Clients/Page';
import Signup from './components/Page-Signup/Page';
import ForgotPassword from './components/Page-Forgot-Password/Page';
import OneClient from './components/Page-My-Clients/Info';
import Register from './components/Page-My-Clients/Register';
import React from 'react';


function App() {
  
  const Private = ({ Item, Titulo}) => {
  
    console.log(localStorage)

    return localStorage.permission ? (
      <>
        <Dashboard />
        <Title title={Titulo}/> 
          <div className='container-page'>
            <Item />
          </div>
      </>
    ) : <Signin />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/' element={<Signin />}/>
        <Route path='/UserList' element={<Private Item={PageUserList} Titulo={'User List'}/>}/>
        <Route path='/HttpStatusTester' element={<Private Item={PageHttpTester} Titulo={'Http Status Tester'}/>}/>
        <Route path='/RandomDogs' element={<Private Item={PageRandomDogs} Titulo={'Random Dogs'}/>}/>
        <Route path='/ListClients' element={<Private Item={PageMyClients} Titulo={'My Clients'}/>}/>
        <Route path="/ListClients/*" element={<Private Item={OneClient} Titulo={'Cliente 1'}/>}/>
        <Route path="/ListClients/Register" element={<Private Item={Register} Titulo={'New Client'}/>} />
        <Route path='*' element={<h1> Not Found </h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
