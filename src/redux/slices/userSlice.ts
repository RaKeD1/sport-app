import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import {} from 'axios';
import { Status } from './profileSlice';
import $api from '../../http';
import { AppDispatch, RootState } from '../store';
import UserService from '../../services/UserService';

// export const fetchUsers = async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const fetch = await $api.get<IUser[]>('/users');
//     console.log('fetch', fetch.data);
//     dispatch(userSlice.actions.usersFetchingSuccess(fetch.data));
//     return fetch.data;
//   } catch (error) {
//     console.log(error.response?.data?.message);
//     return [];
//   }
// };
export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkApi) => {
  try {
    const response = await UserService.fetchUsers();
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue('Не удлаость загрузить пользователей');
  }
});
export interface User {
  users: IUser[];
  status: Status;
  isLoading: boolean;
}

const initialState: User = {
  users: [],
  isLoading: false,
  status: Status.SUCCESS,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
      state.status = Status.LOADING;
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.status = Status.SUCCESS;
      state.users = action.payload;
    },
    usersFetchingError(state) {
      state.isLoading = false;
      state.status = Status.ERROR;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.status = Status.SUCCESS;
      state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = true;
      state.status = Status.LOADING;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
    },
  },
});
export const SelectUsers = (state: RootState) => state.usersReducer.users;

export default userSlice.reducer;
