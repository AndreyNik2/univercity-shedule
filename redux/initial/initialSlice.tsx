import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataGroups } from "../../models/IGroups";
import { IDataWeeks } from "../../models/IWeeks";
import { ICurrent } from "../../models/ICurrent";
import { fetchGroups, fetchWeeks, getCurrentDay } from "./operations";

interface IInitialState {
  selectedGroup: string;
  allGroups: IDataGroups[];
  weeks: IDataWeeks[];
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
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchGroups.fulfilled.type,
        (state, action: PayloadAction<IDataGroups[]>) => {
          state.isLoading = false;
          state.error = "";
          state.allGroups = action.payload;
        }
      )
      .addCase(
        fetchGroups.pending.type,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        fetchGroups.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        fetchWeeks.fulfilled.type,
        (state, action: PayloadAction<IDataWeeks[]>) => {
          state.isLoading = false;
          state.error = "";
          state.weeks = action.payload;
        }
      )
      .addCase(fetchWeeks.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchWeeks.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        getCurrentDay.fulfilled.type,
        (state, action: PayloadAction<ICurrent>) => {
          state.isLoading = false;
          state.error = "";
          state.currentDay = action.payload;
        }
      )
      .addCase(getCurrentDay.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentDay.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    })

  // {
  //   [fetchGroups.fulfilled.type](state, action: PayloadAction<IDataGroups[]>) {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.allGroups = action.payload;
  //   },
  //   [fetchGroups.pending.type](state) {
  //     state.isLoading = true;
  //   },
  // [fetchGroups.rejected.type](state, action: PayloadAction<string>) {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },
  // [fetchWeeks.fulfilled.type](state, action: PayloadAction<IDataWeeks[]>) {
  //   state.isLoading = false;
  //   state.error = "";
  //   state.weeks = action.payload;
  // },
  //   [fetchWeeks.pending.type](state) {
  //     state.isLoading = true;
  //   },
  // [fetchWeeks.rejected.type](state, action: PayloadAction<string>) {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },
  //   [getCurrentDay.fulfilled.type](state, action: PayloadAction<ICurrent>) {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.currentDay = action.payload;
  //   },
  // [getCurrentDay.pending.type](state) {
  //   state.isLoading = true;
  // },
    // [getCurrentDay.rejected.type](state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  // },
});

export default initialSlice.reducer;
