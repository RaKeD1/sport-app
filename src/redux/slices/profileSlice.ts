import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import { AxiosResponse } from 'axios';
import { IUser } from '../../models/IUser';

export type LoginParams = {
  login: string;
  password: string;
};

export type RegistrParams = {
  fio: string;
  email: string;
  phone: string;
  group: string;
  login: string;
  password: string;
};

// Функция логина
export const loginAccount = createAsyncThunk<AxiosResponse<AuthResponse>, LoginParams>(
  'user/loginStatus',
  async (params) => {
    console.log('FUNCTION LOGIN');
    try {
      const { login, password } = params;
      const response = await AuthService.login(login, password);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
);

// Функция регистрации
export const registrAccount = createAsyncThunk<AxiosResponse<AuthResponse>, RegistrParams>(
  'user/registrStatus',
  async (params) => {
    try {
      const { fio, phone, email, group, login, password } = params;
      const response = await AuthService.registration(login, password, fio, email, phone, group);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
);

// Функция логаута
export const logoutAccount = createAsyncThunk<void, void>('user/logoutStatus', async () => {
  try {
    await AuthService.logout();
  } catch (error) {
    console.log(error.response?.data?.message);
  }
});

// Ключи статуса
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Profile {
  user: IUser;
  status: Status;
  isAuth: boolean;
}

const initialState: Profile = {
  user: {
    id_account: null,
    id_user: null,
    fio: '',
    email: '',
    phone: '',
    group: '',
    role: '',
    login: '',
  },
  status: Status.LOADING,
  isAuth: false,
};
const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user.fio = action.payload.fio;
    },
  },
  extraReducers: (builder) => {
    // Кейсы для логина
    builder.addCase(loginAccount.pending, (state, action) => {
      state.status = Status.LOADING;
      state.user = initialState.user;
    });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      state.isAuth = true;
    });
    builder.addCase(loginAccount.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.user = initialState.user;
    });
    // Кейсы для регистрации
    builder.addCase(registrAccount.pending, (state, action) => {
      state.status = Status.LOADING;
      state.user = initialState.user;
    });
    builder.addCase(registrAccount.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      state.isAuth = true;
    });
    builder.addCase(registrAccount.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.user = initialState.user;
    });
    // Кейсы для логаута
    builder.addCase(logoutAccount.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logoutAccount.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = initialState.user;
    });
    builder.addCase(logoutAccount.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setUser } = profileSlice.actions;
export const SelectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
