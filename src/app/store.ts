import { configureStore } from "@reduxjs/toolkit";
import { apiGet } from "../components/api/apiGetAll";
import authReducer from "./rtqStore";


export const store = configureStore({
  reducer: {
    [apiGet.reducerPath]: apiGet.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiGet.middleware),
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;