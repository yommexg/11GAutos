import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { axiosPrivate } from "../../interceptors/axios";

interface GetCarItemsError {
  message: string;
}

interface getCarItemsState {
  carItemsData: object;
  oneCarItemData: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getCarItems = createAsyncThunk(
  "car/getCarItems",
  async (_credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getCarItemsRequest());
      const { data } = await axiosPrivate.get(`/availiable-car-ass`);
      // console.log(data);
      dispatch(getCarItemsSuccessful(data));
    } catch (error) {
      console.log("Get Car Items Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarItemsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarItemsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneCarItem = createAsyncThunk(
  "car/getOneCarItem",
  async (
    { itemId, extra }: { itemId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getCarItemsRequest());
      const { data } = await axiosPrivate.get(`/availiable-car-ass/${itemId}`);
      dispatch(getOneCarItemSucessful(data));

      navigate(`/car-ass/${itemId}`);
    } catch (error) {
      console.log("Get One Car Item Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarItemsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarItemsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getCarItemsState = {
  carItemsData: [],
  oneCarItemData: [],
  loading: false,
};

const carItemSlice = createSlice({
  name: "CarItem",
  initialState,
  reducers: {
    getCarItemsRequest: (state) => {
      state.loading = true;
    },
    getCarItemsSuccessful: (state, action) => {
      state.carItemsData = action.payload;
      state.loading = false;
    },
    getOneCarItemSucessful: (state, action) => {
      state.oneCarItemData = action.payload;
      state.loading = false;
    },
    getCarItemsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getCarItemsSuccessful,
  getCarItemsComplete,
  getCarItemsRequest,
  getOneCarItemSucessful,
} = carItemSlice.actions;

export default carItemSlice;
