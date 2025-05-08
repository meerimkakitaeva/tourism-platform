import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  isLightMode: boolean | null;
}

const initialState: State = {
  isLightMode: null,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setIsLightMode: (state, { payload }: PayloadAction<boolean | null>) => {
      state.isLightMode = payload;
    },
  },
});

export const configReducer = configSlice.reducer;
export const { setIsLightMode } = configSlice.actions;
