import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios, { AxiosResponse } from 'axios';
import { ITrain } from '../../models/ITrain';
import TrainService from '../../services/TrainService';
import { Status } from './profileSlice';

type FetchError = {
  message: string;
};

export type NewTrainParams = {
  account_id: number;
  team: string;
  selectPlayers: number[];
};

export type GetTrainParams = {
  account_id: number;
  team: string;
  date: string;
};

export type TrainParams = {
  team: string;
  date: string;
};

export type PostActionParams = {
  id_train: number;
  id_action_type: number;
  name_action: string;
  result: string;
  condition: string;
  score: number;
  date: string;
  team: string;
};

export type Players = ITrain[];

export const postNewTrain = createAsyncThunk<
  AxiosResponse<Players>,
  NewTrainParams,
  { rejectValue: FetchError }
>('train/postNewTrain', async (params, { rejectWithValue }) => {
  try {
    const { account_id, team, selectPlayers } = params;
    console.log('team', team);
    const response = await TrainService.newTrain(account_id, team, selectPlayers);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response?.data);
  }
});

export const getTeamTrain = createAsyncThunk<
  AxiosResponse<Players>,
  GetTrainParams,
  { rejectValue: FetchError }
>('train/getTeamTrain', async (params, { rejectWithValue }) => {
  try {
    const { account_id, team, date } = params;
    const response = await TrainService.getTrain(account_id, team, date);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response?.data);
  }
});

export const postAction = createAsyncThunk<AxiosResponse<ITrain>, PostActionParams>(
  'train/postActionParams',
  async (params, { rejectWithValue }) => {
    try {
      const { id_train, id_action_type, name_action, result, condition, score, date, team } =
        params;
      console.log('id_train in redux', id_train);
      const response = await TrainService.addAction(
        id_train,
        id_action_type,
        name_action,
        result,
        condition,
        score,
        date,
        team,
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export interface Train {
  date: string;
  team: string;
  players: Players;
  status: Status;
  error: string | null;
}

const initialState: Train = {
  date: '',
  team: '',
  players: [],
  status: Status.LOADING,
  error: null,
};

const trainSlice = createSlice({
  name: 'Training',
  initialState,
  reducers: {
    setTeam(state, action: PayloadAction<string>) {
      state.team = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setTrainParams(state, action: PayloadAction<TrainParams>) {
      state.date = action.payload.date;
      state.team = action.payload.team;
    },
    setError(state) {
      state.status = Status.ERROR;
    },
    setLoading(state) {
      state.status = Status.LOADING;
    },
    clearTrain(state) {
      state = initialState;
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
      state.error = action.payload.message;
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
      state.status = Status.ERROR;
      state.error = action.payload.message;
      state.players = initialState.players;
    });

    // Кейсы для добавления действия
    builder.addCase(postAction.pending, (state) => {
      console.log('LOADING');
      state.status = Status.LOADING;
    });
    builder.addCase(postAction.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      const updPlayer = action.payload.data;
      const playersData = state.players.map((item) => {
        if (item.id_train === updPlayer.id_train) {
          return updPlayer;
        }
        return item;
      });
      state.players = playersData;
    });
    builder.addCase(postAction.rejected, (state, action) => {
      console.log('REJECTED');
      alert(action.payload);
      console.log(action.payload);
      state.status = Status.ERROR;
    });
  },
});

export const SelectTrainStatus = (state: RootState) => state.train.status;
export const SelectTrainError = (state: RootState) => state.train.error;
export const SelectTrainPlayers = (state: RootState) => state.train.players;
export const SelectTrainTeam = (state: RootState) => state.train.team;
export const SelectTrainDate = (state: RootState) => state.train.date;
export const SelectTrain = (state: RootState) => state.train;
export const { setTeam, setDate, setError, setLoading, clearTrain, setTrainParams } =
  trainSlice.actions;

export default trainSlice.reducer;
