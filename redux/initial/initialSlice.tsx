import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGroups } from "../../models/IGroups";

type CurrentTime = {
  currentWeek: string;
  currentDay: number;
};


interface IInitialState {
  selectedGroup: string;
  allGroups: IGroups[];
  weeks: [];
  currentTime: CurrentTime;
  isLoading: boolean;
  error: string;
}

export const initialState: IInitialState =  {
    selectedGroup: "",
    allGroups: [],
    weeks: [],
    currentTime: { currentWeek: "", currentDay: 0 },
    isLoading: false,
    error: "",
}
  
export const initialSlice = createSlice({
    name: 'initial',
    initialState,
    reducers: {
        fetchingGroups(state) {
            state.isLoading = true
        },
        fetchGroupFulfilled(state, action: PayloadAction<IGroups[]>) {
            state.isLoading = false;
            state.error = '';
            state.allGroups = action.payload;

        },
        fetchingGroupError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
}
)

export default initialSlice.reducer;

