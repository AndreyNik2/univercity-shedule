import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { initialSlice } from './initial/initialSlice'
import initialReduser from './initial/initialSlice'




const rootReduser = combineReducers({
    initialReduser
});

export const setupStore = () => {
    return configureStore({
    reducer: rootReduser
});
}



export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']