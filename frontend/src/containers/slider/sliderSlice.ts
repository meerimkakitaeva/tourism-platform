import { IMainSlider, ValidationError } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  deleteSliders,
  editSliders,
  fetchOneSlider,
  fetchSliders,
  postSliders,
} from '@/containers/slider/sliderThunk';

interface SliderState {
  mainSliders: IMainSlider[];
  fetchSlidersLoading: boolean;
  oneMainSlider: IMainSlider | null;
  fetchOneSliderLoading: boolean;
  postSliderLoading: boolean;
  postSliderError: ValidationError | null;
  editSliderLoading: boolean;
  deleteSliderLoading: boolean | string;
}

const initialState: SliderState = {
  mainSliders: [],
  fetchSlidersLoading: false,
  oneMainSlider: null,
  fetchOneSliderLoading: false,
  postSliderLoading: false,
  postSliderError: null,
  editSliderLoading: false,
  deleteSliderLoading: false,
};

export const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    addSlider: (state, action) => {
      state.oneMainSlider = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.news };
      },
    );
    builder.addCase(fetchSliders.pending, (state) => {
      state.fetchSlidersLoading = true;
    });
    builder.addCase(fetchSliders.fulfilled, (state, { payload }) => {
      state.mainSliders = payload;
      state.fetchSlidersLoading = false;
    });
    builder.addCase(fetchSliders.rejected, (state) => {
      state.fetchSlidersLoading = false;
    });
    builder.addCase(fetchOneSlider.pending, (state) => {
      state.fetchOneSliderLoading = true;
    });
    builder.addCase(fetchOneSlider.fulfilled, (state, action) => {
      state.fetchOneSliderLoading = false;
      state.oneMainSlider = action.payload;
    });
    builder.addCase(fetchOneSlider.rejected, (state) => {
      state.fetchOneSliderLoading = false;
    });
    builder.addCase(postSliders.pending, (state) => {
      state.postSliderLoading = true;
      state.postSliderError = null;
    });
    builder.addCase(postSliders.fulfilled, (state) => {
      state.postSliderLoading = false;
    });
    builder.addCase(postSliders.rejected, (state, { payload: error }) => {
      state.postSliderLoading = false;
      state.postSliderError = error || null;
    });
    builder.addCase(editSliders.pending, (state) => {
      state.editSliderLoading = true;
    });
    builder.addCase(editSliders.fulfilled, (state) => {
      state.editSliderLoading = false;
    });
    builder.addCase(editSliders.rejected, (state) => {
      state.editSliderLoading = false;
    });
    builder.addCase(deleteSliders.pending, (state, action) => {
      state.deleteSliderLoading = action.meta.arg;
    });
    builder.addCase(deleteSliders.fulfilled, (state) => {
      state.deleteSliderLoading = false;
    });
    builder.addCase(deleteSliders.rejected, (state) => {
      state.deleteSliderLoading = false;
    });
  },
});
export const { addSlider } = sliderSlice.actions;

export const selectAllMainSliders = (state: RootState) =>
  state.sliders.mainSliders;
export const selectOneMainSliders = (state: RootState) =>
  state.sliders.oneMainSlider;
