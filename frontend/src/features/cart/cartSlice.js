import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"

const initialState = {
    cartItems : localStorage.getItem("userCart") ? JSON.parse(localStorage.getItem("userCart")) : [],
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addToCart(state,action){
            
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if(itemIndex >= 0){
                    state.cartItems[itemIndex].Quantity += 1;
                    state.cartItems[itemIndex].TotalPrice += action.payload.price;
            }
            else{
                const item = {...action.payload, Quantity:1, TotalPrice:action.payload.price};
                state.cartItems.push(item);
            }
                    
            localStorage.setItem("userCart", JSON.stringify(state.cartItems))
            toast.success("Success Notification !", {
                position: "top-right"
              });
        },
        removeFromCart(state,action){
            const updatedCart = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
            state.cartItems = updatedCart;
            localStorage.setItem("userCart", JSON.stringify(state.cartItems))
        },
        increaseQuantity(state,action){
            const itemQuantity = state.cartItems.findIndex(
                (item) => item._id === action.payload
            );
            state.cartItems[itemQuantity].Quantity += 1;
            state.cartItems[itemQuantity].TotalPrice += action.payload.price;
            localStorage.setItem("userCart", JSON.stringify(state.cartItems))  
        },
        decreaseQuantity(state,action){
            const itemQuantity = state.cartItems.findIndex(
                (item) => item._id === action.payload
            );
            if(state.cartItems[itemQuantity].Quantity > 1){
                state.cartItems[itemQuantity].Quantity -= 1;
                state.cartItems[itemQuantity].TotalPrice -= action.payload.price;
            }else{
                const romveLastItem = state.cartItems.filter(
                    (item) => item._id !== action.payload
                );
                state.cartItems = romveLastItem;
            }
            localStorage.setItem("userCart", JSON.stringify(state.cartItems))  
        },
        clearCart(state){
            state.cartItems = [];
            localStorage.removeItem("userCart");
        }
    }
})

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotal} = cartSlice.actions;
const {reducer} = cartSlice;
export default reducer;