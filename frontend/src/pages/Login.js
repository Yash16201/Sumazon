import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as yup from "yup";
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {login} from "../features/auth/authSlice"
import PageTitle from '../components/PageTitle';

let authSchema = yup.object().shape({
    email : yup.string().email("Should be valid").required("Email is required"),
    password : yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    validationSchema: authSchema,
    onSubmit: (values) =>{
        dispatch(login(values));
    }
  });

  const authState = useSelector((state) => state);
  const { user, isError, isDone, isLoading, message } = authState.auth;

  useEffect(() => {
    if(isDone){
        navigate("/")
    }
  },[navigate, user, isError, isDone, isLoading, message]);
  return (
    <>  
        <PageTitle title="Login"/> 
        <section className='login-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Login</h3>
                            <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <div className='form-group'>
                                    <input className='form-control' type="email" name="email" placeholder="Enter Email" onChange={formik.handleChange("email")} value={formik.values.email}/>
                                    <div className='error'>
                                        <p className='text-danger'>{formik.touched.email && formik.errors.email}</p>
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
                                    <button className='btn btn-primary' type='submit' onClick={formik.handleSubmit}>Login</button>
                                    <Link to="/signup" className='btn btn-primary text-white mx-3'>Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}

export default Login