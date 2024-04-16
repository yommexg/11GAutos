import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../axios/imterceptors";

interface ForgotError {
  message: string;
}

interface ForgotState {
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const verifyForgotEmailAsync = createAsyncThunk(
  "auth/Forgot/verifyEmailAsync",
  async (
    { email, extra }: { email: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getForgotRequest());

      const { data } = await axiosPrivate.post("forget-password", {
        email,
      });

      toast.success(data?.success);

      navigate("/forgot-otp", {
        state: { email: email },
      });

      dispatch(getForgotComplete());
    } catch (error) {
      //   console.log("Forgot Email Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ForgotError>;
        if (axiosError.response && axiosError.response.status === 409) {
          errorMessage = "Email Already Exist";
        } else if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getForgotComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const verifyForgotOTPAsync = createAsyncThunk(
  "auth/Forgot/verifyOTPAsync",
  async (
    { email, OTP, extra }: { OTP: string; email: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getForgotRequest());

      const { data } = await axiosPrivate.post("forget-password/verify-otp", {
        OTP,
        email,
      });

      toast.success(data?.success);

      navigate("/reset-password", {
        state: { email: email },
      });

      dispatch(getForgotComplete());
    } catch (error) {
      //   console.log("Forgot OTP Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ForgotError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getForgotComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/Forgot",
  async (
    { email, extra, pwd }: { email: string; pwd: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getForgotRequest());

      const { data } = await axiosPrivate.patch("forget-password/reset", {
        email,
        pwd,
      });

      console.log(data);

      toast.success(data?.success);

      navigate("/login", {
        state: { email: email },
      });

      dispatch(getForgotComplete());
    } catch (error) {
      console.log("Registration Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ForgotError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getForgotComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: ForgotState = {
  loading: false,
};

const forgotSlice = createSlice({
  name: "Forgot",
  initialState,
  reducers: {
    getForgotRequest: (state) => {
      state.loading = true;
    },

    getForgotComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { getForgotRequest, getForgotComplete } = forgotSlice.actions;

export default forgotSlice;
