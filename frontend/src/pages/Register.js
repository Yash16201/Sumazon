import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as yup from "yup";
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {register} from "../features/auth/authSlice"
import PageTitle from '../components/PageTitle';

let authSchema = yup.object().shape({
    username : yup.string().required("username is required"),
    email : yup.string().email("Should be valid").required("Email is required"),
    mobile : yup.number().required("phone is required"),
    address : yup.string().required("address is required"),
    password : yup.string().required("Password is required"),
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues:{
          username:"",
          email:"",
          mobile:"",
          address:"",
          password:"",
      },
      validationSchema: authSchema,
      onSubmit: (values) =>{
          dispatch(register(values));
      }
    });
  const authState = useSelector((state) => state);
  const {  isError, isDone, isLoading, message } = authState.auth;

  useEffect(() => {
    if(isDone){
        navigate("/login")
    }
  },[navigate, isError, isDone, isLoading, message]);
  
  return (
    <>
        <PageTitle title="Register"/>   
        <section className='login-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Register</h3>
                            <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <div className='form-group'>
                                    <input className='form-control my-3' type="text" name="username" placeholder="Enter Username here" onChange={formik.handleChange("username")} value={formik.values.username}/>
                                    <div className='error'>
                                        <p className='text-danger'>{formik.touched.username && formik.errors.username}</p>
                                    </div>
                                </div>
                                <div className='form-group'> 
                                    <input className='form-control my-3' type="email" name="email" placeholder="Enter Email" onChange={formik.handleChange("email")} value={formik.values.email}/>
                                    <div className='error'>
                                        <p className='text-danger'>{formik.touched.email && formik.errors.email}</p>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input className='form-control my-3' type="text" name="mobile" placeholder="Enter Phone" onChange={formik.handleChange("mobile")} value={formik.values.mobile}/>
                                    <div className='error'>
                                        <p className='text-danger'>{formik.touched.mobile && formik.errors.mobile}</p>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input className='form-control my-3' type="text" name="address" placeholder="Enter Address" onChange={formik.handleChange("address")} value={formik.values.address}/>
                                    <div className='error'>
                                        <p className='text-danger'>{formik.touched.address && formik.errors.address}</p>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input className='form-control my-3' type="password" name="password" placeholder="Enter Password" onChange={formik.handleChange("password")} value={formik.values.password}/>
                                    <div className='error'>
                                        <p className='text-danger'>{formik.touched.password && formik.errors.password}</p>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                    <button className='btn btn-primary' type='submit' onClick={formik.handleSubmit}>Sign Up</button>
                                    <Link to="/login" className='btn btn-primary text-white mx-3'>Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Register