import axios from 'axios'

axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

export const getGroups = async () => {
    try {
        const { data } = await axios.get("/schedule/groups");
        return data
    } catch (error: unknown) {
        return 
    }
}

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

export const getShedule = async (group:string, week:string) => {
  try {
    const { data } = await axios.get(
      "/schedule/lessons", {params: {group: group, week: week}}
    );
    return data;
  } catch (error: unknown) {
    return;
  }
};

