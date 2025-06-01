import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin, userRegister, userLogout, user } from "./authAPI";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await userRegister(data);
      alert("User Registered Successfully");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await userLogin(data);
      alert("User Logged In Successfully");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await userLogout();
      alert("User Logged Out Successfully");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Check if user is authenticated
export const isAuthticUser = createAsyncThunk(
  "/auth/user",
  async (_, thunkAPI) => {
    try {
      const response = await user();
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Authenticated User
      .addCase(isAuthticUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isAuthticUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(isAuthticUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
