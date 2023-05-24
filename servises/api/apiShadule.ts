import axios, { AxiosError } from 'axios'
import { errorCatch } from './error.api';

axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

export const getShedule = async (group:string, week:string) => {
  try {
    const { data } = await axios.get(
      "/schedule/lessons", {params: {group: group, week: week}}
    );
    return data;
  } catch (error) {
    return errorCatch(error)
  }
};

export const getTeachersShedule = async (teacher: string, week: string) => {
  try {
    const { data } = await axios.get("/teacher/schedule", {
      params: { teacher: teacher, week: week },
    });
    return data;
  } catch (error) {
    return errorCatch(error);
  }
};

export const getTeachersList = async () => {
  try {
    axios.defaults.headers.common["no-time-limit"] = true;
    const { data } = await axios.get("/teacher/list");
    return data
  } catch (error) {
    return errorCatch(error)
  }
}

