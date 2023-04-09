import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../../models/IUser';
import { API_URL } from '../../http';

export type LoginParams = {
  login: string;
  password: string;
};

export type Error = {
  message: string;
  errors: [];
};

export type RegistrParams = {
  name: string;
  surname: string;
  patronimyc: string;
  email: string;
  phone: string;
  group: string;
  login: string;
  password: string;
};

// Функция логина
export const loginAccount = createAsyncThunk<AxiosResponse<AuthResponse>, LoginParams>(
  'user/loginStatus',
  async (params, { rejectWithValue }) => {
    console.log('FUNCTION LOGIN');
    try {
      const { login, password } = params;
      const response = await AuthService.login(login, password);
      console.log(response);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Функция регистрации
export const registrAccount = createAsyncThunk<AxiosResponse<AuthResponse>, RegistrParams>(
  'user/registrStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { name, surname, patronimyc, phone, email, group, login, password } = params;
      const response = await AuthService.registration(
        login,
        password,
        name,
        surname,
        patronimyc,
        email,
        phone,
        group,
      );
      console.log(response);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      alert(error.response.data.message);
      console.log(error.response);
      return rejectWithValue(error.response.data.message);
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

// Функция проверки авторизации
export const checkAuth = createAsyncThunk<AxiosResponse<AuthResponse>, void>(
  'user/checkAuthStatus',
  async () => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log('RESPONSE', response);
      return response;
    } catch (error) {
      console.log('ERROR', error.response?.data?.message);
    }
  },
);

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
    name: '',
    surname: '',
    patronimyc: '',
    email: '',
    phone: '',
    group: '',
    role: '',
    login: '',
  },
  status: Status.SUCCESS,
  isAuth: false,
};
const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setError(state) {
      state.status = Status.ERROR;
    },
  },
  extraReducers: (builder) => {
    // Кейсы для логина
    builder.addCase(loginAccount.pending, (state) => {
      console.log('LOADING');
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
      console.log('REJECTED');
      alert(action.payload);
      state.status = Status.ERROR;
      state.user = initialState.user;
    });
    // Кейсы для регистрации
    builder.addCase(registrAccount.pending, (state) => {
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
      console.log('REJECTED');
      alert(action.payload);
      state.status = Status.ERROR;
      state.user = initialState.user;
    });
    // Кейсы для логаута
    builder.addCase(logoutAccount.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logoutAccount.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = initialState.user;
    });
    builder.addCase(logoutAccount.rejected, (state) => {
      state.status = Status.ERROR;
    });
    // Кейсы для проверки авторизации
    builder.addCase(checkAuth.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      state.isAuth = true;
      state.user = action.payload.data.user;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      console.log('ERROR');
      state.status = Status.ERROR;
    });
  },
});

export const { setUser, setError } = profileSlice.actions;
export const SelectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
