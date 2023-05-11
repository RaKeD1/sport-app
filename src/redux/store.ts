import { configureStore } from '@reduxjs/toolkit';
import { configure } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import profile from './slices/profileSlice';
import train from './slices/trainSlice';
import createTrain from './slices/createTrainSlice';
import actionTypes from './slices/actionTypesSlice';

export const store = configureStore({
  reducer: {
    profile,
    train,
    createTrain,
    actionTypes,
  },
});
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
