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