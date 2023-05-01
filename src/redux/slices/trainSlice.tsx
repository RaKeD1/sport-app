import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios, { AxiosResponse } from 'axios';
import { ITrain } from '../../models/ITrain';
import TrainService from '../../services/TrainService';
import { Status } from './profileSlice';

export type NewTrainParams = {
  account_id: number;
  team: string;
  players: string[];
};

export type GetTrainParams = {
  account_id: number;
  team: string;
  date: string;
};

export type Players = ITrain[];

export const postNewTrain = createAsyncThunk<AxiosResponse<Players>, NewTrainParams>(
  'train/postNewTrain',
  async (params, { rejectWithValue }) => {
    try {
      const { account_id, team, players } = params;
      const response = await TrainService.newTrain(account_id, team, players);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getTeamTrain = createAsyncThunk<AxiosResponse<Players>, GetTrainParams>(
  'train/getTeamTrain',
  async (params, { rejectWithValue }) => {
    try {
      const { account_id, team, date } = params;
      const response = await TrainService.getTrain(account_id, team, date);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

export interface Train {
  players: Players;
  status: Status;
}

const initialState: Train = {
  players: [],
  status: Status.LOADING,
};

const trainSlice = createSlice({
  name: 'Training',
  initialState,
  reducers: {
    setError(state) {
      state.status = Status.ERROR;
    },
  },
  extraReducers: (builder) => {
    // Кейсы для создания новой тренировки
    builder.addCase(postNewTrain.pending, (state) => {
      console.log('LOADING');
      state.status = Status.LOADING;
      state.players = initialState.players;
    });
    builder.addCase(postNewTrain.fulfilled, (state, action) => {
      state.players = action.payload.data;
      console.log('players', state.players);
      state.status = Status.SUCCESS;
    });
    builder.addCase(postNewTrain.rejected, (state, action) => {
      console.log('REJECTED');
      alert(action.payload);
      state.status = Status.ERROR;
      state.players = initialState.players;
    });

    // Кейсы для получения тренировки
    builder.addCase(getTeamTrain.pending, (state) => {
      console.log('LOADING');
      state.status = Status.LOADING;
      state.players = initialState.players;
    });
    builder.addCase(getTeamTrain.fulfilled, (state, action) => {
      state.players = action.payload.data;
      console.log('players', state.players);
      state.status = Status.SUCCESS;
    });
    builder.addCase(getTeamTrain.rejected, (state, action) => {
      console.log('REJECTED');
      alert(action.payload);
      state.status = Status.ERROR;
      state.players = initialState.players;
    });
  },
});

export const {} = trainSlice.actions;

export default trainSlice.reducer;
