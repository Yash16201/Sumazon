import React, { useEffect, useRef } from 'react'
// import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {singleProductInfo} from "../features/product/productSlice" 
import { useParams } from 'react-router-dom'
import { addToCart  } from '../features/cart/cartSlice'


const SinglePage = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const { cartItems } = cartState;
    const productState = useSelector((state) => state.product);
    const { singleProduct, isLoading } = productState;
    let hasProductFetched = useRef(false);


    useEffect(() => {
        if(!hasProductFetched.current && !isLoading){
          dispatch(singleProductInfo(id))
          hasProductFetched.current = true
        }
    },[dispatch, isLoading, cartItems, id]);
    
    const handleAddToCart = () =>{
        dispatch(addToCart(singleProduct));
    }
    return (
        <div className='container my-5'>
            {
                singleProduct?
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={singleProduct.picture} alt='product' height={500}/>
                        </div>
                        <div className='col-md-6' style={{paddingTop:"200px"}}>
                            <h2>{singleProduct.name} ${singleProduct.price}</h2>
                            <p> {singleProduct.description} </p>
                            <p> {singleProduct.quantity} left in stock </p>
                            <button className='btn btn-primary' onClick={handleAddToCart}> Add to cart </button>

                        </div>
                    </div>
                    :
                    <p> Product Not found </p>
                
            }
        </div>
    )
}

export default SinglePage