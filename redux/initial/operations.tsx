import axios from "axios";
import { AppDispatch } from "../store";
import { initialSlice } from "./initialSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGroups } from "../../models/IGroups";
import { IWeeks } from "../../models/IWeeks";
import { ICurrent } from "../../models/ICurrent";


axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

export const fetchGroups = createAsyncThunk(
  "initial/fetchGroups",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IGroups[]>("/schedule/groups");
    return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Sorry something went wrong. Failed to load groups");
    }
  }
);

export const fetchWeeks = createAsyncThunk(
  "initial/fetchWeeks",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IWeeks[]>("/schedule/weeks");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        "Sorry something went wrong. Failed to load weeks"
      );
    }
  }
);

export const getCurrentDay = createAsyncThunk(
  "initial/getCurrentDay",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<ICurrent>("/schedule/time/current");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        "Sorry something went wrong. Failed to load weeks"
      );
    }
  }
);


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

