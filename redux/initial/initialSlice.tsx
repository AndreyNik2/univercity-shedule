import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroups } from "../../models/IGroups";
import { IWeeks } from "../../models/IWeeks";
import { ICurrent } from "../../models/ICurrent";
import { fetchGroups, fetchWeeks, getCurrentDay } from "./operations";




interface IInitialState {
  selectedGroup: string;
  allGroups: IGroups[];
  weeks: IWeeks[];
  currentDay: ICurrent;
  isLoading: boolean;
  error: string;
}

export const initialState: IInitialState = {
  selectedGroup: "",
  allGroups: [],
  weeks: [],
  currentDay: { currentWeek: "", currentDay: 0 },
  isLoading: false,
  error: "",
};

export const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGroups.fulfilled.type](state, action: PayloadAction<IGroups[]>) {
      state.isLoading = false;
      state.error = "";
      state.allGroups = action.payload;
    },
    [fetchGroups.pending.type](state) {
      state.isLoading = true;
    },
    [fetchGroups.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchWeeks.fulfilled.type](state, action: PayloadAction<IWeeks[]>) {
      state.isLoading = false;
      state.error = "";
      state.weeks = action.payload;
    },
    [fetchWeeks.pending.type](state) {
      state.isLoading = true;
    },
    [fetchWeeks.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCurrentDay.fulfilled.type](state, action: PayloadAction<ICurrent>) {
      state.isLoading = false;
      state.error = "";
      state.currentDay = action.payload;
    },
    [getCurrentDay.pending.type](state) {
      state.isLoading = true;
    },
    [getCurrentDay.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default initialSlice.reducer;
