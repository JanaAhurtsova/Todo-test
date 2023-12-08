import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './reducer';

export const store = configureStore({
  reducer: TodoReducer
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;