import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosResponse } from 'axios';
import { Status } from './profileSlice';
import { IAction } from '../../models/IAction';
import ActionService from '../../services/ActionService';

type FetchError = {
  message: string;
};

export type GetActionsParams = {
  date: string;
  team: string;
};

type Actions = IAction[];

export const getTrainActions = createAsyncThunk<
  AxiosResponse<Actions>,
  GetActionsParams,
  { rejectValue: FetchError }
>('train/getTrainActions', async (params, { rejectWithValue }) => {
  try {
    const { team, date } = params;
    const response = await ActionService.getTrainActions(team, date);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response?.data);
  }
});

export interface TrainActions {
  data: Actions;
  status: Status;
  error: string | null;
}

const initialState: TrainActions = {
  data: [],
  status: Status.LOADING,
  error: null,
};

const actionsSlice = createSlice({
  name: 'Actions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Кейсы для получения действий
    builder.addCase(getTrainActions.pending, (state) => {
      console.log('LOADING');
      state.status = Status.LOADING;
      state.data = initialState.data;
    });
    builder.addCase(getTrainActions.fulfilled, (state, action) => {
      state.data = action.payload.data;
      console.log('actions', state.data);
      state.status = Status.SUCCESS;
    });
    builder.addCase(getTrainActions.rejected, (state, action) => {
      console.log('REJECTED');
      state.status = Status.ERROR;
      state.error = action.payload.message;
      state.data = initialState.data;
    });
  },
});

export const SelectTrainActionsStatus = (state: RootState) => state.actions.status;
export const SelectTrainActionsError = (state: RootState) => state.actions.error;
export const SelectTrainActions = (state: RootState) => state.actions.data;
export const {} = actionsSlice.actions;

export default actionsSlice.reducer;
