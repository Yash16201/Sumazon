import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productServices from "./productServices"

const initialState = {
    products: [],
    singleProduct : {},
    isError: false,
    isDone: false,
    isLoading: false,
    message: "",
}

export const allProducts = createAsyncThunk(
    "product/all-products",
    async (thunkAPI) => {
        try {
            return await productServices.products();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const singleProductInfo = createAsyncThunk(
    "product/productbyid",
    async (id, thunkAPI) => {
        try {
            return await productServices.singleProductById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const productSlice = createSlice({
    name:"product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(allProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(allProducts.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
            state.message = "Done";
        })
        .addCase(allProducts.rejected, (state, action) => {
            state.isDone = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(singleProductInfo.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(singleProductInfo.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.singleProduct = action.payload;
            state.message = "Done";
        })
        .addCase(singleProductInfo.rejected, (state, action) => {
            state.isDone = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })       
    },
});

export default productSlice.reducer