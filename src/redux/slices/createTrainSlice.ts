import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface NewTrainData {
  team: string;
  players: number[];
}

const initialState: NewTrainData = {
  players: [],
  team: '',
};

const createTrainSlice = createSlice({
  name: 'createTraining',
  initialState,
  reducers: {
    setTeam(state, action: PayloadAction<string>) {
      state.team = action.payload;
    },
    clearTeam(state) {
      state.team = initialState.team;
    },
    setPlayers(state, action: PayloadAction<number[]>) {
      state.players = action.payload;
    },
    // addPlayer(state, action: PayloadAction<string>) {
    //   state.players.push(action.payload);
    // },
    // removePlayer(state, action: PayloadAction<string>) {
    //   const player = action.payload;
    //   state.players = state.players.filter((item) => item != player);
    // },
  },
});

export const SelectCreateTrain = (state: RootState) => state.createTrain;
export const { setTeam, clearTeam, setPlayers } = createTrainSlice.actions;

export default createTrainSlice.reducer;
