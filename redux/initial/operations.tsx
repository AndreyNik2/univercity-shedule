import axios from "axios";
import { AppDispatch } from "../store";
import { initialSlice } from "./initialSlice";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGroups } from "../../models/IGroups";


axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

export const fetchGroups = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(initialSlice.actions.fetchingGroups());
        const { data } = await axios.get<IGroups[]>("/schedule/groups");
        dispatch(initialSlice.actions.fetchGroupFulfilled(data))
    } catch (e) {
        dispatch(initialSlice.actions.fetchingGroupError(e.message))
    }

}

// export const getGroup = async () => {
//   try {
//     const { data } = await axios.get<IGroups>("/schedule/groups");
//     return data;
//   } catch (error: unknown) {
//     return;
//   }
// };

// export const getGroups = createAsyncThunk(
//   "init/getGroups",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get<IGroups[]>("/schedule/groups");
//     return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );


export const getWeeks = async () => {
  try {
    const { data } = await axios.get("/schedule/weeks");
    return data;
  } catch (error: unknown) {
    return;
  }
};

export const getCurrentDay = async () => {
  try {
    const { data } = await axios.get("/schedule/time/current");
    return data;
  } catch (error: unknown) {
    return;
  }
};

export const getShedule = async (group: string, week: string) => {
  try {
    const { data } = await axios.get("/schedule/lessons", {
      params: { group: group, week: week },
    });
    return data;
  } catch (error: unknown) {
    return;
  }
};

