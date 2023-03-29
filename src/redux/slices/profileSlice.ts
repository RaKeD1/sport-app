import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export type FIO = {
  name: string;
  surname: string;
  patronymic: string;
};
export interface Profile {
  fio: FIO;
  email: string;
  phone: string;
  role: string;
  login: string;
}

const initialState: Profile = {
  fio: {
    name: '',
    surname: '',
    patronymic: '',
  },
  email: 'Введите-свой@email.ru',
  phone: '+7xxxxxxxxxx',
  role: 'Ученик',
  login: '',
};
const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setFioValue(state, action: PayloadAction<FIO>) {
      state.fio.name = action.payload.name;
      state.fio.surname = action.payload.surname;
      state.fio.patronymic = action.payload.patronymic;
    },
  },
});
export const { setFioValue } = profileSlice.actions;
export const SelectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
