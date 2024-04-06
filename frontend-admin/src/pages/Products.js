import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { allProducts, deleteProduct } from '../features/product/productSlice'


const Products = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { products, isTaskLoading } = productState;
  let areProductsFetched = useRef(false);

  useEffect(()=>{
    if(!areProductsFetched.current && !isTaskLoading){
      dispatch(allProducts())
      areProductsFetched.current = true
    }
    
  },[dispatch,products,isTaskLoading])

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product))
  }
  
  return (
    <div className='container my-5'>
        <div className='row'>
            <div className='col-md-8'>
                <h2>Product Information</h2>
            </div>
            <div className='col-md-4'>
                <Link to="/addproduct" className='btn btn-success'>+Add Product</Link>
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <div className='table-responsive'>
                    <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            products.length > 0 ? 
                            products.map((product) =>(
                                product.isDeleted !== "True" &&
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <Link to={`/view/${product._id}`} className='btn btn-sm btn-primary mx-2'>View </Link>
                                        <Link to={`/update/${product._id}`} className='btn btn-sm btn-secondary mx-2'>Update</Link>
                                        <button type='button' className='btn btn-sm btn-danger mx-2' onClick={() => {deleteHandler(product)}} >Delete Product</button>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={4} style={{textAlign:'center'}}> No Products </td>
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

export default Products