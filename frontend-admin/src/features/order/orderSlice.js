import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import orderServices from "./orderServices"

const initialState = {
    orders:[],
    isError: false,
    isDone: false,
    isOrderLoading: false,
    message: "",
}

export const allorder = createAsyncThunk(
    "order/allorder",
    async (thunkAPI) => {
        try {
            return await orderServices.orders();
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
        .addCase(allorder.pending, (state) => {
            state.isOrderLoading = true;
        })
        .addCase(allorder.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isDone = true;
            state.isOrderLoading = false;
            state.isError = false;
            state.message = "Done";
        })
        .addCase(allorder.rejected, (state, action) => {
            state.isDone = false;
            state.isOrderLoading = false;
            state.isError = true;
            state.message = action.error;
        })       
    },
});

export default orderSlice.reducer

