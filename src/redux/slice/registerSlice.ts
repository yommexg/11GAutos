import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../axios/imterceptors";
import { User } from "../../../types";

interface RegisterError {
  message: string;
}

interface RegisterState {
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const verifyEmailAsync = createAsyncThunk(
  "auth/register/verifyEmailAsync",
  async (
    { email, extra }: { email: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getRegisterRequest());

      const { data } = await axiosPrivate.post("verify-email", {
        email,
      });

      toast.success(data?.success);

      navigate("/register-otp", {
        state: { email: email },
      });

      dispatch(getRegisterComplete());
    } catch (error) {
      // console.log("Verify Email Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<RegisterError>;
        if (axiosError.response && axiosError.response.status === 409) {
          errorMessage = "Email Already Exist";
        } else if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getRegisterComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const verifyOTPAsync = createAsyncThunk(
  "auth/register/verifyOTPAsync",
  async (
    { email, OTP, extra }: { OTP: string; email: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getRegisterRequest());

      const { data } = await axiosPrivate.post("verify-email/otp", {
        OTP,
        email,
      });

      toast.success(data?.success);

      navigate("/register", {
        state: { email: email },
      });

      dispatch(getRegisterComplete());
    } catch (error) {
      // console.log("Verify Email Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<RegisterError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getRegisterComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { userData, extra, pwd }: { userData: User; pwd: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getRegisterRequest());

      const { data } = await axiosPrivate.patch("register", {
        email: userData.email,
        user: userData.username,
        pwd,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      });

      // console.log(data);

      toast.success(data?.success);

      navigate("/login", {
        state: { email: userData.email },
      });

      dispatch(getRegisterComplete());
    } catch (error) {
      console.log("Registration Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<RegisterError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getRegisterComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: RegisterState = {
  loading: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    getRegisterRequest: (state) => {
      state.loading = true;
    },

    getRegisterComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { getRegisterRequest, getRegisterComplete } =
  registerSlice.actions;

export default registerSlice;
