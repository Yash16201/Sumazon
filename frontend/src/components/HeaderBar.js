import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import userImg from '../images/user.svg'
import cart from '../images/cart.png'
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../features/auth/authSlice"



const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { user, isDone  } = authState;

  const logoutHandle = () => {
    dispatch(logout())
    if(isDone){
      navigate("/");
    }
  }
  return (
    <>
      
      <header className='header-upper py-3'>
          <div className='container-xxl'>
            <div className='row align-items-center'>
              <div className='col-2'>
                <h1>
                  <Link to="/" className='text-white'>Sumazon</Link>
                </h1>
              </div>
              <div className='col-5'>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Search Any Product Here"/>
                  <span className="input-group-text p-3">
                    <BsSearch className='fs-6'/>
                  </span>
                </div>
              </div>
              <div className='col-5'>
                <div className='header-upper-links d-flex align-items-center justify-content-between'> 
                  <div>
                      {
                      user==null?
                      <Link to="/login" className='d-flex align-items-center gap-10 text-white'>
                          <img src={userImg} alt="user"/>
                          <p className='mb-0'>
                            Log in 
                          </p>
                      </Link> :
                      <div className="dropdown">
                        <button className="btn dropdown-toggle" style={{color:'white'}}  type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {user.username}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><Link className="dropdown-item" to="/updateprofile">My Profile</Link></li>
                          <li><button className="dropdown-item" onClick={logoutHandle}>Logout</button></li>
                        
                        </ul>
                      </div>
                      }
                  </div>
                  <div>
                    {
                      user != null &&
                      <Link to="/cart" className='d-flex align-items-center gap-10 text-white'>
                          <img src={cart} alt="cart" width={50} height={50}/>
                          <p className='mb-0'>
                            Cart
                          </p>
                      </Link>
                    }
                      
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
      </header>
      
    </>
  )
}

export default HeaderBar