import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { AsyncThunkRejectedActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";

axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const logIn = createAsyncThunk<
  IUser,
  { code: string; rememberMe: boolean }
>(
  "auth/login",
  async (userData: { code: string; rememberMe: boolean }, thunkAPI) => {
    try {
      const { data } = await axios.post<IUser>("/login", { code: userData.code, rememberMe: userData.rememberMe });
      // After successful login, add the token to the HTTP header
      setAuthHeader(data.access_token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Login failed ${error}`);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(`Logaut failed ${error}`);
  }
});
