import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";
import { UsedCar } from "../../../types";

interface FileWithPreview extends File {
  previewUrl?: string;
}

interface GetUsedCarsError {
  message: string;
}

interface getUsedCarsState {
  usedCarsData: object;
  oneUsedCarData: object;
  usedCarsDataByUserId: object;
  oneUsedCarDataByUserId: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getUsedCars = createAsyncThunk(
  "car/getUsedCars",
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
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getUsedCarsByUserId = createAsyncThunk(
  "car/getUsedCarsByUserId ",
  async ({ userId }: { userId: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.get(`/used-car/seller/${userId}`);
      // console.log(data);
      dispatch(getUsedCarsByUserIdSuccessful(data));
    } catch (error) {
      console.log("Get used Cars by userId Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
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
    { usedCarId, extra }: { usedCarId: string; extra: ExtraArgs },
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
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);
export const getOneUsedCarByUserId = createAsyncThunk(
  "car/getOneUsedCar",
  async (
    { usedCarId, extra }: { usedCarId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.get(
        `/availiable-used-cars/${usedCarId}`
      );
      dispatch(getOneUsedCarByUserIdSucessful(data));

      navigate(`/seller-car/${usedCarId}`);
    } catch (error) {
      console.log("Get used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);
export const addUsedCar = createAsyncThunk(
  "car/addUsedCar",
  async (
    {
      car: {
        carName,
        carColor,
        carBrand,
        price,
        quantity,
        year,
        discount,
        gearType,
        energyType,
        engineNumber,
        engineType,
        plateNumber,
        carLocation: { busStop, city, country, state },
        description,
      },
      selectedFiles,
      userId,
      extra,
    }: {
      car: UsedCar;
      selectedFiles: FileWithPreview[];
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getUsedCarsRequest());

      const formData = new FormData();

      formData.append("carName", carName);
      formData.append("carBrand", carBrand);
      formData.append("color", carColor);
      formData.append("gearType", gearType);
      formData.append("year", year.toString());
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());
      formData.append("quantity", quantity.toString());
      formData.append("description", description);
      formData.append("engineType", engineType);
      formData.append("engineNumber", engineNumber);
      formData.append("plateNumber", plateNumber);
      formData.append("carColor", carColor);
      formData.append("energyType", energyType);

      formData.append("carLocation[busStop]", busStop);
      formData.append("carLocation[city]", city);
      formData.append("carLocation[country]", country);
      formData.append("carLocation[state]", state);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("Used-Car", selectedFiles[i]);
      }

      const { data } = await axiosPrivate.post(
        `/${userId}/create-used-car`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.success);

      await dispatch(getUsedCars());

      await dispatch(getUsedCarsByUserId({ userId }));

      dispatch(getUsedCarsComplete());

      navigate("/sell-car");
    } catch (error) {
      console.log("Add Used Car Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
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
  oneUsedCarData: [],
  usedCarsDataByUserId: [],
  oneUsedCarDataByUserId: [],
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
    getUsedCarsByUserIdSuccessful: (state, action) => {
      state.usedCarsDataByUserId = action.payload;
      state.loading = false;
    },
    getOneUsedCarSucessful: (state, action) => {
      state.oneUsedCarData = action.payload;
      state.loading = false;
    },
    getOneUsedCarByUserIdSucessful: (state, action) => {
      state.oneUsedCarDataByUserId = action.payload;
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
  getUsedCarsByUserIdSuccessful,
  getOneUsedCarByUserIdSucessful,
} = usedCarSlice.actions;

export default usedCarSlice;
