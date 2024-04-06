import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product/productSlice'
import orderReducer from '../features/order/orderSlice'



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    product: productReducer,
    order: orderReducer
  },
});
