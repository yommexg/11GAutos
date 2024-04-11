import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AxiosJSON } from "./apiSlice";
import { AxiosError } from "axios";

interface LoginError {
  message: string;
}

interface LoginState {
  data: object;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

const axiosReq = AxiosJSON();

export const loginAsync = createAsyncThunk(
  "auth/LoginAsync",
  async (
    { user, pwd }: { user: string; pwd: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getLoginRequest());
      const { data } = await axiosReq.post("login", { user, pwd });
      dispatch(getLoginSuccess(data?.data));
    } catch (error) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getLoginFail(errorMessage));
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: LoginState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLoginRequest: (state) => {
      state.loading = true;
    },

    getLoginSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    getLoginFail: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },

    clearError: (state) => {
      state.error = false;
      state.errorMessage = null;
      state.loading = false;
      state.data = [];
    },
  },
});

export const { clearError, getLoginFail, getLoginRequest, getLoginSuccess } =
  loginSlice.actions;

export default loginSlice;
