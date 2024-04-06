import React, { useEffect, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { allorder } from '../features/order/orderSlice'



const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);
  const { orders, isOrderLoading } = orderState;
  let areOrdersFetched = useRef(false);

  useEffect(()=>{
    if(!areOrdersFetched.current && !isOrderLoading){
      dispatch(allorder())
      areOrdersFetched.current = true
    }
  },[dispatch,orders,isOrderLoading])

  return (
    <div className='container my-5'>
        <h2>Order Information</h2>
        <div className="card">
            <div className="card-body">
                <div className='table-responsive'>
                    <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th>Order By</th>
                                <th>Order Amount</th>
                                <th>Payment Method</th>
                                <th>Order to be sent at</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            orders.length > 0 ? 
                            orders.map((order) =>(
                                <tr key={order._id}>
                                    <td>{order.orderBy.username}</td>
                                    <td>{order.paymentDetails.amount}</td>
                                    <td>{order.paymentDetails.method}</td>
                                    <td>{order.address}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={4} style={{textAlign:'center'}}> No Orders </td>
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

export default Orders