import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";

import loginSlice from "./slice/loginSlice";
import logoutSlice from "./slice/logoutSlice";
import getUserSlice from "./slice/getUserSlice";
import registerSlice from "./slice/registerSlice";
import forgotSlice from "./slice/forgotPasswordSlice.";
import newCarSlice from "./slice/newCarSlice";
import usedCarSlice from "./slice/usedCarSlice";

const rootReducer = combineReducers({
  login: loginSlice.reducer,
  getUser: getUserSlice.reducer,
  logout: logoutSlice.reducer,
  register: registerSlice.reducer,
  forgot: forgotSlice.reducer,
  newCar: newCarSlice.reducer,
  usedCar: usedCarSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
