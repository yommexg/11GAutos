import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { axiosPrivate } from "../../interceptors/axios";

interface GetusedCarsError {
  message: string;
}

interface getUsedCarsState {
  usedCarsData: object;
  oneusedCarData: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getusedCars = createAsyncThunk(
  "car/getusedCars",
  async (_credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.get(`/availiable-used-cars`);
      // console.log(data);
      dispatch(getUsedCarsSuccessful(data));
    } catch (error) {
      console.log("Get Used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetusedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneUsedCar = createAsyncThunk(
  "car/getOneUsedCar",
  async (
    {
      usedCarId,

      extra,
    }: { usedCarId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.get(
        `/availiable-used-cars/${usedCarId}`
      );
      dispatch(getOneUsedCarSucessful(data));

      navigate(`/used-cars/${usedCarId}`);
    } catch (error) {
      console.log("Get used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetusedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getUsedCarsState = {
  usedCarsData: [],
  oneusedCarData: [],
  loading: false,
};

const usedCarSlice = createSlice({
  name: "usedCar",
  initialState,
  reducers: {
    getUsedCarsRequest: (state) => {
      state.loading = true;
    },
    getUsedCarsSuccessful: (state, action) => {
      state.usedCarsData = action.payload;
      state.loading = false;
    },
    getOneUsedCarSucessful: (state, action) => {
      state.oneusedCarData = action.payload;
      state.loading = false;
    },
    getUsedCarsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getUsedCarsSuccessful,
  getUsedCarsComplete,
  getUsedCarsRequest,
  getOneUsedCarSucessful,
} = usedCarSlice.actions;

export default usedCarSlice;
