import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataGroups, IGroups } from "../../models/IGroups";
import { IDataWeeks } from "../../models/IWeeks";
import { ICurrent } from "../../models/ICurrent";
import {
  fetchGroups,
  fetchTeachers,
  fetchWeeks,
  getCurrentDay,
} from "./operations";
import { IDataTeachers, ITeachers } from "../../models/ITeachers";

interface IInitialState {
  selectedTeacher: ITeachers;
  teachrsList: IDataTeachers;
  selectedGroup: IGroups;
  allGroups: IDataGroups;
  weeks: null | IDataWeeks;
  currentDay: ICurrent;
  isLoading: boolean;
  error: string;
  userType: string;
}

export const initialState: IInitialState = {
  selectedTeacher: { name: "", id: "" },
  teachrsList: {
    data: [{ name: "", id: "" }],
  },
  selectedGroup: { name: "", code: "" },
  allGroups: {
    data: [{ name: "", code: "" }],
  },
  weeks: null,
  currentDay: { currentWeek: "", currentDay: 0 },
  isLoading: false,
  error: "",
  userType: "",
};

export const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    selectTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
    setUser: (state, action) => {
      state.userType = action.payload;
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
      )
      .addCase(
        fetchTeachers.fulfilled.type,
        (state, action: PayloadAction<IDataTeachers>) => {
          state.isLoading = false;
          state.error = "";
          state.teachrsList = action.payload;
        }
      )
      .addCase(fetchTeachers.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTeachers.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const { selectGroup, selectTeacher, setUser } = initialSlice.actions;
export const initialReduser = initialSlice.reducer;
