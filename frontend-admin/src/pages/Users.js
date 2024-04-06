import React, { useEffect, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { allusers } from '../features/auth/authSlice'



const Users = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { allusersinfo,isLoading } = authState;
  let areUsersFetched = useRef(false);

  useEffect(()=>{
    if(!areUsersFetched.current && !isLoading){
      dispatch(allusers())
      areUsersFetched.current = true
    }
  },[dispatch,allusersinfo,isLoading])

  
  return (
    <div className='container my-5'>
        <h2>User Information</h2>
        <div className="card">
            <div className="card-body">
                <div className='table-responsive'>
                    <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Mobile</th>
                                <th>User Address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allusersinfo.length > 0 ? 
                            allusersinfo.map((user) =>(
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={4} style={{textAlign:'center'}}> No Users </td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Users