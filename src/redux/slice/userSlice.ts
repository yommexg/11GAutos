import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { axiosPrivate } from "../../interceptors/axios";
import { toast } from "react-toastify";

interface GetUserError {
  message: string;
}

interface GetUserParams {
  userId: string;
  accessToken: string;
}

interface getUserState {
  userData: object;
  loading: boolean;
}

interface FileWithPreview extends File {
  previewUrl?: string;
}

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (
    { userId, accessToken }: GetUserParams,
    { dispatch, rejectWithValue }
  ) => {
    axiosPrivate.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    try {
      dispatch(getUserRequest());
      const { data } = await axiosPrivate.get(`/user/${userId}`);
      dispatch(getUserSuccessful(data));
    } catch (error) {
      console.log("Get User Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUserError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUserComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);
export const sellerRequest = createAsyncThunk(
  "user/sellerRequest",
  async (
    {
      documentName,
      userId,
      selectedFile,
      accessToken,
    }: {
      documentName: string;
      userId: string;
      selectedFile: FileWithPreview;
      accessToken: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getUserRequest());

      const formData = new FormData();

      formData.append("documentName", documentName);
      formData.append("Document", selectedFile);

      const { data } = await axiosPrivate.patch(
        `/sell-request/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success(data.message);

      await dispatch(getUser({ userId, accessToken }));

      dispatch(getUserComplete());
    } catch (error) {
      console.log("Sell Request Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUserError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUserComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getUserState = {
  userData: [],
  loading: false,
};

const getUserSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccessful: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    getUserComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { getUserSuccessful, getUserComplete, getUserRequest } =
  getUserSlice.actions;

export default getUserSlice;
