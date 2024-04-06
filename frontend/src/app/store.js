import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import productSlice from '../features/product/productSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice
  },
});
