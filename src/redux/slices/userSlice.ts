import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { AxiosResponse } from 'axios';
import { Status } from './profileSlice';
import { RootState } from '../store';
import UserService from '../../services/UserService';
import { FetchError } from './trainSlice';
import RoleService from '../../services/RoleService';

type RemoveRoleUsersParams = {
  users: number[];
};

type GiveRoleUsersParams = RemoveRoleUsersParams & {
  role: string;
};

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkApi) => {
  try {
    const response = await UserService.fetchUsers();
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue('Не удалость загрузить пользователей');
  }
});

export const giveRoleUsers = createAsyncThunk<
  AxiosResponse<IUser[]>,
  GiveRoleUsersParams,
  { rejectValue: FetchError }
>('user/giveRoleUsers', async (params, { rejectWithValue }) => {
  try {
    const { role, users } = params;
    const response = await RoleService.giveRoles(role, users);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response?.data);
  }
});

export const removeRoleUsers = createAsyncThunk<
  AxiosResponse<IUser[]>,
  RemoveRoleUsersParams,
  { rejectValue: FetchError }
>('user/removeRoleUsers', async (params, { rejectWithValue }) => {
  try {
    const { users } = params;
    const response = await RoleService.removeRoles(users);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response?.data);
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

    [giveRoleUsers.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.status = Status.SUCCESS;
      const response = action.payload.data;
      const updUsers = state.users.map((user) => {
        const findUser = response.find((obj) => obj.id_account === user.id_account);
        if (findUser) {
          return findUser;
        } else return user;
      });
      state.users = updUsers;
    },
    [giveRoleUsers.pending.type]: (state, action) => {
      state.isLoading = true;
      state.status = Status.LOADING;
    },
    [giveRoleUsers.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      alert(action.payload.message);
    },

    [removeRoleUsers.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.status = Status.SUCCESS;
      const response = action.payload.data;
      const updUsers = state.users.map((user) => {
        const findUser = response.find((obj) => obj.id_account === user.id_account);
        if (findUser) {
          return findUser;
        } else return user;
      });
      state.users = updUsers;
    },
    [removeRoleUsers.pending.type]: (state, action) => {
      state.isLoading = true;
      state.status = Status.LOADING;
    },
    [removeRoleUsers.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      alert(action.payload.message);
    },
  },
});
export const SelectUsers = (state: RootState) => state.usersReducer.users;

export default userSlice.reducer;
