//Generate me a language slice for redux for switching between en and es
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: 'en', // default language
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.language;

export default languageSlice.reducer;

