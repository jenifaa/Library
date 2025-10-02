import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  //  middleware:()=> GetDefaultMiddleware().concat(api)
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
