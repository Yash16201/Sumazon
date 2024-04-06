import React from 'react'
import * as yup from "yup";
import {useFormik} from "formik"
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

let profileSchema = yup.object().shape({
    username : yup.string().required("username is required"),
    email : yup.string().email("Should be valid").required("Email is required"),
    mobile : yup.number().required("phone is required"),
    address : yup.string().required("address is required"),
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const formik = useFormik({
    initialValues:{
        id:user?._id,
        username:user?.username,
        email:user?.email,
        mobile:user?.mobile,
        address:user?.address,
    },
    validationSchema: profileSchema,
    onSubmit: (values) =>{
        dispatch(updateProfile(values));
        navigate("/");
    }
  });
  return (
    <>
        <section className='login-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='mb-3'>Update Profile</h3>
                            <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <input className='form-control my-3' type="text" name="username" placeholder="Enter Username here" onChange={formik.handleChange("username")} value={formik.values.username}/>
                                <input className='form-control my-3' type="email" name="email" placeholder="Enter Email" onChange={formik.handleChange("email")} value={formik.values.email}/>
                                <input className='form-control my-3' type="text" name="mobile" placeholder="Enter Phone" onChange={formik.handleChange("mobile")} value={formik.values.mobile}/>
                                <input className='form-control my-3' type="text" name="address" placeholder="Enter Address" onChange={formik.handleChange("address")} value={formik.values.address}/>
                            </form>
                            <div>
                                <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                    <button className='btn btn-primary' type='submit' onClick={formik.handleSubmit}>Sign Up</button>
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

export default UpdateProfile