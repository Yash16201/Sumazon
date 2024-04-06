import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'
import Homepaje from './pages/Homepaje';
import Login from './pages/Login';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import UpdateProduct from './pages/UpdateProduct';
import UpdateProfile from './pages/UpdateProfile';


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Homepaje/>}/>
            </Route>
            <Route path='/login' element={<Layout/>}>
              <Route index element={<Login/>}/>
            </Route>
            <Route path='/users' element={<Layout/>}>
              <Route index element={<Users/>}/>
            </Route>
            <Route path='/orders' element={<Layout/>}>
              <Route index element={<Orders/>}/>
            </Route>
            <Route path='/products' element={<Layout/>}>
              <Route index element={<Products/>}/>
            </Route>
            <Route path='/addproduct' element={<Layout/>}>
              <Route index element={<AddProduct/>}/>
            </Route>
            <Route path='/view/:id' element={<Layout/>}>
              <Route index element={<ViewProduct/>}/>
            </Route>
            <Route path='/update/:id' element={<Layout/>}>
              <Route index element={<UpdateProduct/>}/>
            </Route>
            <Route path='/updateprofile' element={<Layout/>}>
              <Route index element={<UpdateProfile/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
