import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePage from './pages/SinglePage';
import UpdateProfile from './pages/UpdateProfile';
import Cart from './pages/Cart';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />}/>
          </Route>
          <Route path='/login' element={<Layout />}>
            <Route index element={<Login />}/>
          </Route>
          <Route path='/updateprofile' element={<Layout />}>
            <Route index element={<UpdateProfile />}/>
          </Route>
          <Route path='/signup' element={<Layout />}>
            <Route index element={<Register />}/>
          </Route>
          <Route path='/cart' element={<Layout />}>
            <Route index element={<Cart />}/>
          </Route>
          <Route path='/product/:id' element={<Layout />}>
            <Route index element={<SinglePage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
