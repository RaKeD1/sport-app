import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../../models/IUser';
import { API_URL } from '../../http';
import UserService from '../../services/UserService';

export type LoginParams = {
  name: string;
  surname: string;
  patronimyc: string;
  email: string;
  phone: string;
  team: string;
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
  team: string;
  login: string;
  password: string;
};

export type FetchUserParams = {
  id_user: number;
};

const localAuth = (local: string) => {
  if (local === 'false') return false;
  else if (local === 'true') return true;
  else return null;
};

// Функция логина
export const loginAccount = createAsyncThunk<AxiosResponse<AuthResponse>, LoginParams>(
  'user/loginStatus',
  async (params, { rejectWithValue }) => {
    console.log('FUNCTION LOGIN');
    try {
      const { login, password } = params;
      const response = await AuthService.login(login, password);
      console.log('login', response);
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
      const { name, surname, patronimyc, phone, email, team, login, password } = params;
      const response = await AuthService.registration(
        login,
        password,
        name,
        surname,
        patronimyc,
        email,
        phone,
        team,
      );
      console.log('registration', response);
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
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log('RESPONSE', response);
      return response;
    } catch (error) {
      if (!error.response) {
        alert(error.message);
        throw error;
      }
      alert(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Функция запроса данных о пользователе
export const fetchUser = createAsyncThunk<AxiosResponse<IUser>, FetchUserParams>(
  'user/fetchUserStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { id_user } = params;
      const response = await UserService.fetchUser(id_user);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      alert(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
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
    team: '',
    role: '',
    login: '',
  },
  status: Status.SUCCESS,
  // isAuth: null,
  isAuth: localStorage.isAuth ? localAuth(localStorage.isAuth) : false,
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
      console.log('USer', state.user);
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      state.isAuth = true;
      localStorage.isAuth = true;
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
      localStorage.isAuth = true;
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
      localStorage.isAuth = false;
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
      localStorage.isAuth = true;
      state.user = action.payload.data.user;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      console.log('ERROR');
      state.status = Status.ERROR;
    });

    // Кейсы для запроса данных о пользователе
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      console.log(action.payload.data);
      state.user.name = action.payload.data.name;
      state.user.surname = action.payload.data.surname;
      state.user.patronimyc = action.payload.data.patronimyc;
      state.user.phone = action.payload.data.phone;
      state.user.email = action.payload.data.email;
      state.user.team = action.payload.data.team;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      console.log('ERROR');
      state.status = Status.ERROR;
    });
  },
});

export const { setUser, setError } = profileSlice.actions;
export const SelectProfile = (state: RootState) => state.profile;
export const SelectUser = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
