import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productServices from "./productServices"


const initialState = {
    newProduct : {},
    products: [],
    singleProduct : {},
    isError: false,
    isDone: false,
    isTaskLoading: false,
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

export const addProduct = createAsyncThunk(
    "product/addproduct",
    async (product,thunkAPI) => {
        try {
            return await productServices.addproduct(product);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const editProduct = createAsyncThunk(
    "product/editProduct",
    async (product,thunkAPI) => {
        try {
            return await productServices.editProduct(product);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (product,thunkAPI) => {
        try {
            return await productServices.deleteProduct(product);
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
            state.isTaskLoading = true;
        })
        .addCase(allProducts.fulfilled, (state, action) => {
            state.isDone = true;
            state.isTaskLoading = false;
            state.isError = false;
            state.products = action.payload;
            state.message = "Done";
        })
        .addCase(allProducts.rejected, (state, action) => {
            state.isDone = false;
            state.isTaskLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(addProduct.pending, (state) => {
            state.isTaskLoading = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.isDone = true;
            state.isTaskLoading = false;
            state.isError = false;
            state.newProduct = action.payload;
            state.message = "Done";
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.isDone = false;
            state.isTaskLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(editProduct.pending, (state) => {
            state.isTaskLoading = true;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.isDone = true;
            state.isTaskLoading = false;
            state.isError = false;
            state.message = "Done";
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.isDone = false;
            state.isTaskLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteProduct.pending, (state) => {
            state.isTaskLoading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isDone = true;
            state.isTaskLoading = false;
            state.isError = false;
            state.message = "Done";
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.isDone = false;
            state.isTaskLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        
        .addCase(singleProductInfo.pending, (state) => {
            state.isTaskLoading = true;
        })
        .addCase(singleProductInfo.fulfilled, (state, action) => {
            state.isDone = true;
            state.isTaskLoading = false;
            state.isError = false;
            state.singleProduct = action.payload;
            state.message = "Done";
        })
        .addCase(singleProductInfo.rejected, (state, action) => {
            state.isDone = false;
            state.isTaskLoading = false;
            state.isError = true;
            state.message = action.error;
        })       
    },
});

export default productSlice.reducer