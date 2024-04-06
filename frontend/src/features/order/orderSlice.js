import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import orderServices from "./orderServices"

const initialState = {
    isError: false,
    isDone: false,
    isLoading: false,
    message: "",
}

export const makeOrder = createAsyncThunk(
    "order/make-order",
    async (orderData, thunkAPI) => {
        try {
            return await orderServices.makeOrder(orderData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const orderSlice = createSlice({
    name:"order",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(makeOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(makeOrder.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload;
        })
        .addCase(makeOrder.rejected, (state, action) => {
            state.isDone = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })       
    },
});

export default orderSlice.reducer

