import React, { useEffect, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {allProducts} from "../features/product/productSlice" 
import ProductsCard from '../components/ProductsCard'


const HomePage = ({searchTerm}) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { products, isLoading } = productState;
  let hasProductFetched = useRef(false);

  useEffect(() => {
    if(!hasProductFetched.current && !isLoading){
      dispatch(allProducts())
      hasProductFetched.current = true
    }
  },[dispatch, products, isLoading]);

  const rowsArray = (arr, size) => {
    return Array.from({length: Math.ceil(arr.length / size)}, (_, index) => arr.slice(index * size, (index + 1) * size));
  };

  const rows = rowsArray(products, 3)

  // const filteredProducts  =  products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  
  return (
    <>
      <div className='container my-5'>
          {
            rows.map((row, rowIndex) => (
              <div key={rowIndex} className='row my-3'>
                {
                  row.map((p) => (
                    p.isDeleted !== "True" ?
                    <div key={p._id} className='col-md-4'>
                       <ProductsCard key={p._id} id={p._id} title={p.name} imageUrl={p.picture} description={p.description} price={p.price} />
                    </div>: <></>
                  ))
                }
              </div>
            ))
          }
      </div>
    </>
  )
}

export default HomePage