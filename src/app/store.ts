import { configureStore } from "@reduxjs/toolkit";
import { apiGet } from "../components/api/apiGetAll";


export const store = configureStore({
  reducer: {
    [apiGet.reducerPath]: apiGet.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiGet.middleware),
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;