import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import * as yup from "yup";
import {useFormik} from "formik"
import { addProduct } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';

let productSchema = yup.object().shape({
    name : yup.string().required("name is required"),
    price : yup.number().required("price is required"),
    description : yup.string().required("description is required"),
    quantity : yup.number().required("quantity is required"),
    picture : yup.string().required("picture is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state.product);
  const { isDone } = productState;

  const formik = useFormik({
    initialValues:{
        name:"",
        price:"",
        description:"",
        quantity:"",
        picture:"",
    },
    validationSchema: productSchema,
    onSubmit: (values) =>{
        dispatch(addProduct(values));
        if(isDone){
            navigate("/products")
        }
    }
  });
  
  return (
    <div className='container my-5'>
        <h2>Add Product Information</h2>
            
        <div className="card">
            <div className="card-body">
                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                    <div className='form-group'>
                        Name
                        <input className='form-control my-3' type="text" name="name" placeholder="Enter Product Name Here" onChange={formik.handleChange("name")} value={formik.values.name}/>
                        <div className='error'>
                            <p className='text-danger'>{formik.touched.name && formik.errors.name}</p>
                        </div>
                    </div>
                    <div className='form-group'>
                        Price
                        <input className='form-control my-3' type="text" name="price" placeholder="Enter Product Price Here" onChange={formik.handleChange("price")} value={formik.values.price}/>
                        <div className='error'>
                            <p className='text-danger'>{formik.touched.price && formik.errors.price}</p>
                        </div>
                    </div>
                    <div className='form-group'>
                        Description
                        <input className='form-control my-3' type="text" name="description" placeholder="Enter Product Description Here" onChange={formik.handleChange("description")} value={formik.values.description}/>
                        <div className='error'>
                            <p className='text-danger'>{formik.touched.description && formik.errors.description}</p>
                        </div>
                    </div>
                    <div className='form-group'>
                        Quantity
                        <input className='form-control my-3' type="text" name="quantity" placeholder="Enter Product Quantity Here" onChange={formik.handleChange("quantity")} value={formik.values.quantity}/>
                        <div className='error'>
                            <p className='text-danger'>{formik.touched.quantity && formik.errors.quantity}</p>
                        </div>
                    </div>
                    <div className='form-group'>
                        Image URL
                        <input className='form-control my-3' type="text" name="picture" placeholder="Enter Product Image Link Here" onChange={formik.handleChange("picture")} value={formik.values.picture}/>
                        <div className='error'>
                            <p className='text-danger'>{formik.touched.picture && formik.errors.picture}</p>
                        </div>
                    </div>
                    <button className='btn btn-primary' type='submit' onClick={formik.handleSubmit}>Add Product</button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default AddProduct