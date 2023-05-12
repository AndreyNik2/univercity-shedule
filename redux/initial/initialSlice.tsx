import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataGroups, IGroups } from "../../models/IGroups";
import { IDataWeeks } from "../../models/IWeeks";
import { ICurrent } from "../../models/ICurrent";
import { fetchGroups, fetchWeeks, getCurrentDay } from "./operations";

interface IInitialState {
  selectedGroup: IGroups;
  allGroups: IDataGroups;
  weeks: null | IDataWeeks;
  currentDay: ICurrent;
  isLoading: boolean;
  error: string;
}

export const initialState: IInitialState = {
  selectedGroup: { name: "", code: "" },
  allGroups: {
    data: [{ name: "", code: "" }],
  },
  weeks: null,
  currentDay: { currentWeek: "", currentDay: 0 },
  isLoading: false,
  error: "",
};

export const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchGroups.fulfilled.type,
        (state, action: PayloadAction<IDataGroups>) => {
          state.isLoading = false;
          state.error = "";
          state.allGroups = action.payload;
        }
      )
      .addCase(fetchGroups.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchGroups.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        fetchWeeks.fulfilled.type,
        (state, action: PayloadAction<IDataWeeks>) => {
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
      .addCase(
        getCurrentDay.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});


export const { selectGroup } = initialSlice.actions
export const initialReduser = initialSlice.reducer;
