import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchValue: string;
}
const initialState: FilterState = {
  searchValue: '',
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  //actions on 21
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});
export const { setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
