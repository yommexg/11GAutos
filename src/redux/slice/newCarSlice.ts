import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { axiosPrivate } from "../../interceptors/axios";

interface GetNewCarsError {
  message: string;
}

interface getNewCarsState {
  newCarsData: object;
  oneNewCarData: object;
  loading: boolean;
}

export const getNewCars = createAsyncThunk(
  "car/getNewCars",
  async (_credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get(`availiable-new-cars`);
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
