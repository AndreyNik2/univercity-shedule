import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { initialReduser } from "./initial/initialSlice";
import { authReduser } from "./auth/authSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialPersistConfig = {
  key: "initial",
  storage: AsyncStorage,
  whitelist: ["selectedGroup", "userType"],
};

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedReducer = combineReducers({
  initial: persistReducer(initialPersistConfig, initialReduser),
  auth: persistReducer(authPersistConfig, authReduser),
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof persistedReducer>;

