import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { axiosPrivate } from "../../interceptors/axios";

interface GetNewCarsError {
  message: string;
}

interface getNewCarsState {
  newCarsData: object;
  oneNewCarData: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getNewCars = createAsyncThunk(
  "car/getNewCars",
  async (_credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get(`/availiable-new-cars`);
      // console.log(data);
      dispatch(getNewCarsSuccessful(data));
    } catch (error) {
      console.log("Get Used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneNewCar = createAsyncThunk(
  "car/getOneNewCar",
  async (
    {
      newCarId,

      extra,
    }: { newCarId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get(
        `/availiable-new-cars/${newCarId}`
      );
      dispatch(getOneNewCarSucessful(data));

      navigate(`/new-cars/${newCarId}`);
    } catch (error) {
      console.log("Get New Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getNewCarsState = {
  newCarsData: [],
  oneNewCarData: [],
  loading: false,
};

const newCarSlice = createSlice({
  name: "newCar",
  initialState,
  reducers: {
    getNewCarsRequest: (state) => {
      state.loading = true;
    },
    getNewCarsSuccessful: (state, action) => {
      state.newCarsData = action.payload;
      state.loading = false;
    },
    getOneNewCarSucessful: (state, action) => {
      state.oneNewCarData = action.payload;
      state.loading = false;
    },
    getNewCarsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getNewCarsSuccessful,
  getNewCarsComplete,
  getNewCarsRequest,
  getOneNewCarSucessful,
} = newCarSlice.actions;

export default newCarSlice;
