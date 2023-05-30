import axios, { AxiosError } from "axios";
import { errorCatch } from "./error.api";

axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

export const getShedule = async (group: string, week: string) => {
  try {
    const { data } = await axios.get("/schedule/lessons", {
      params: { group: group, week: week },
    });
    return data;
  } catch (error) {
    return errorCatch(error);
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

export const getTeachersJournal = async (id: string) => {
  try {
    const { data } = await axios.get("/teacher/journal", {
      params: { teacher: id },
    });
    return data;
  } catch (error) {
    return errorCatch(error);
  }
};

export const getTeachersJournalHistory = async (id: string) => {
  try {
    const { data } = await axios.get("/teacher/journalHistory", {
      params: { key: id },
    });
    return data;
  } catch (error) {
    return errorCatch(error);
  }
};

export const getTeachersLoad = async (id: string) => {
  try {
    const { data } = await axios.get("/teacher/load", {
      params: { teacher: id },
    });
    return data;
  } catch (error) {
    return errorCatch(error);
  }
};

export const getHourAccounting = async (id: string) => {
  try {
    const { data } = await axios.get("/teacher/hours", {
      params: { teacher: id },
    });
    return data;
  } catch (error) {
    return errorCatch(error);
  }
};
