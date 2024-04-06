import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../features/cart/cartSlice'
import { MdDelete } from "react-icons/md";
import { makeOrder } from '../features/order/orderSlice'
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;
  const authState = useSelector((state) => state.auth);
  const { user } = authState;


  const handleItemIncrease = (cartIndex) => {
    dispatch(increaseQuantity(cartIndex));
  }
  const handleItemDecrease = (cartIndex) => {
    dispatch(decreaseQuantity(cartIndex));
  }
  const handleRemoveItem = (cartIndex) => {
    dispatch(removeFromCart(cartIndex));
  }
  const handleCheckOut = (cartTotal) => {
    const userData = user;
    const orderData = {
        user:userData,
        cart:cartItems,
        cartTotal:cartTotal
    }
    dispatch(makeOrder(orderData));
    dispatch(clearCart());
    navigate("/");
  }
  return (
    <div className='container my-5'>
        <div className='row'>
            <div className='col-md-8'>
                <div className="card">
                    <div className="card-body">
                        <div className='table-responsive'>
                            <table className='table table-stripped'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Price</th>
                                        <th>Quantity in cart</th>
                                        <th>Item Actions</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    cartItems.length > 0?
                                    cartItems.map((cart) =>(
                                        <tr key={cart._id} className='my-5'>
                                            <td>{cart.name}</td>
                                            <td>${cart.price*cart.Quantity}</td>
                                            <td>{cart.Quantity}</td>
                                            <td>
                                                <button type='button' className='btn btn-sm btn-danger' onClick={() => handleItemDecrease(cart._id)}>-</button> {cart.Quantity} <button type='button' className='btn btn-sm btn-primary' onClick={() => handleItemIncrease(cart._id )}>+</button>
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-sm btn-danger' onClick={() => handleRemoveItem(cart._id)}> <MdDelete/> </button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={5} style={{textAlign:'center'}}> No Items in cart </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {
            cartItems.length > 0?
                <div className='col-md-4'>
                <div className="card">
                        <div className="card-body">
                            <div className='table-responsive'>
                                <table className='table'>
                                    <tbody>
                                    <tr>
                                        <td>Cart Total</td>
                                        <td>${cartItems.reduce((total, item) => total + item.price * item.Quantity, 0)}</td>
                                    </tr>
                                    <tr className='my-3'>   
                                        <td className='col' colSpan={2}>
                                            <button type='button' style={{width:"100%"}} className='btn btn btn-secondary' onClick={() => handleCheckOut(cartItems.reduce((total, item) => total + item.price * item.Quantity, 0))}> Proceed to checkout </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            : <></>
            }
        
        </div>

    </div>
  )
}

export default Cart