import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logIn, logOut } from "./operations";
import { IUser } from "../../models/IUser";

export interface IInitialState {
  user: IUser;
  isLoadingUser: boolean;
  error: string;
}

interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

const initialState: IInitialState = {
  user: {
    name: "",
    access_token: "",
    adm: false,
    id: "",
    expired_in: 0,
    status: "",
  },
  isLoadingUser: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        logIn.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.isLoadingUser = false;
          state.user.access_token = action.payload.access_token;
          state.user.adm = action.payload.adm;
          state.user.id = action.payload.id;
          state.user.expired_in = action.payload.expired_in;
          state.user.status = action.payload.status;
          state.user.name = action.payload.name
        }
      )
      .addCase(logIn.pending.type, (state) => {
        state.isLoadingUser = true;
        state.error = "";

      })
      .addCase(logIn.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled.type, (state) => {
        state.isLoadingUser = false;
        state.error = "";
        state.user.access_token = "";
        state.user.adm = false;
        state.user.id = "";
        state.user.expired_in = 0;
        state.user.status = "";
      })
      .addCase(logOut.pending.type, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(logOut.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      }),
});

export const authReduser = authSlice.reducer;
