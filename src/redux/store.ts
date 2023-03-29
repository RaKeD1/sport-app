import { configureStore } from '@reduxjs/toolkit';
import { configure } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import profile from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    profile,
  },
});
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
