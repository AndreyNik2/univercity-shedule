import axios from 'axios'

axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

export const getShedule = async (group:string, week:string) => {
  try {
    const { data } = await axios.get(
      "/schedule/lessons", {params: {group: group, week: week}}
    );
    return data;
  } catch (error) {
    return (`loading shedule with error ${error}`);
  }
};

