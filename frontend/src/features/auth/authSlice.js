import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authServices from "./authServices"

const tokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null

const initialState = {
    user: tokenFromLocalStorage,
    isError: false,
    isDone: false,
    isLoading: false,
    message: "",
}

export const login = createAsyncThunk(
    "auth/login",
    async (user_data, thunkAPI) => {
        try {
            return await authServices.login(user_data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (user_data, thunkAPI) => {
        try {
            return await authServices.register(user_data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (thunkAPI) => {
        try {
            return await authServices.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (user, thunkAPI) => {
        try {
            return await authServices.updateProfile(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
            state.userInfo = action.payload;
            state.message = "Done";
        })
        .addCase(login.rejected, (state, action) => {
            state.isDone = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.message = "Done";
        })
        .addCase(register.rejected, (state, action) => {
            state.isDone = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })  
        .addCase(logout.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.user = {};
            state.message = "Done";
        })
        .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.isDone = true;
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
            state.message = "Done";
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.isDone = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })   
    },
});

export default authSlice.reducer