import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
