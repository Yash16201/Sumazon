import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { allusers } from '../features/auth/authSlice'
import { allProducts } from '../features/product/productSlice'
import { allorder } from '../features/order/orderSlice'



const Homepaje = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { allusersinfo,isLoading } = authState;

  const productState = useSelector((state) => state.product);
  const { products, isTaskLoading } = productState;

  const orderState = useSelector((state) => state.order);
  const { orders, isOrderLoading } = orderState;

  let areUsersFetched = useRef(false);
  let areProductsFetched = useRef(false);
  let areOrdersFetched = useRef(false);



  useEffect(()=>{
    if(!areUsersFetched.current && !isLoading){
      dispatch(allusers())
      areUsersFetched.current = true
    }
    if(!areProductsFetched.current && !isTaskLoading){
      dispatch(allProducts())
      areProductsFetched.current = true
    }
    if(!areOrdersFetched.current && !isOrderLoading){
      dispatch(allorder())
      areOrdersFetched.current = true
    }
  },[dispatch,orders,products,allusersinfo,isLoading,isTaskLoading,isOrderLoading])
  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text text-center">{products.length > 0 ? products.length: 0}</p>
              <Link to="/products" className="btn btn-primary" style={{width:"100%"}}>Manage Products</Link>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
        <div className="card">
          <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text text-center">{allusersinfo.length > 0 ? allusersinfo.length: 0}</p>
              <Link to="/users" className="btn btn-primary" style={{width:"100%"}}>View Users</Link>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
        <div className="card">
          <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text text-center">{orders.length > 0 ? orders.length: 0}</p>              
              <Link to="/orders" className="btn btn-primary" style={{width:"100%"}}>VIew Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepaje