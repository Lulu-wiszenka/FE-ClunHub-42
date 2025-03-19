import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8080/api';

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
     

      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      return response.data;

      /*await new Promise((resolve) => setTimeout(resolve, 1500)); // Симуляція затримки
      return {
        user: {
          id: "user_" + Math.random().toString(36).slice(2, 11),
          username: userData.username,
          email: userData.email,
        },
        token: "test_token_" + Math.random().toString(36).slice(2, 11),
      };*/
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration error"
      );
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login error");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
