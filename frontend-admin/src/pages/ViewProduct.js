import React, { useEffect, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { singleProductInfo } from '../features/product/productSlice'
import { useParams } from 'react-router-dom'


const ViewProduct = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { singleProduct, isTaskLoading } = productState;
  let isProductFetched = useRef(false);

  useEffect(()=>{
    if(!isProductFetched.current && !isTaskLoading){
      dispatch(singleProductInfo(id))
      isProductFetched.current = true
    }
    
  },[dispatch,id,singleProduct,isTaskLoading])
  
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
                        </div>
                    </div>
                :
                <p> Product Not found </p>    
            }
        </div>
  )
}

export default ViewProduct