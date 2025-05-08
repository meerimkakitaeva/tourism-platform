import { createSlice } from '@reduxjs/toolkit';
import { RatingOfGuide, RatingOfTour } from '@/type';
import { RootState } from '@/store/store';
import {
  createGuideRating,
  fetchGuideRating,
  fetchTourRating,
} from '@/containers/ratings/ratingThunk';

interface ToursRatingState {
  toursRating: RatingOfTour[];
  guideRating: RatingOfGuide[];
  fetchAllLoading: boolean;
  fetchRatingGuide: boolean;
  postRatingGuideLoading: boolean;
}

const initialState: ToursRatingState = {
  toursRating: [],
  guideRating: [],
  fetchAllLoading: false,
  fetchRatingGuide: false,
  postRatingGuideLoading: false,
};

export const toursRatingSlice = createSlice({
  name: 'toursRating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTourRating.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchTourRating.fulfilled,
      (state, { payload: toursRating }) => {
        state.toursRating = toursRating;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchTourRating.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchGuideRating.pending, (state) => {
      state.fetchRatingGuide = true;
    });
    builder.addCase(
      fetchGuideRating.fulfilled,
      (state, { payload: guideRating }) => {
        state.fetchRatingGuide = false;
        state.guideRating = guideRating;
      },
    );
    builder.addCase(fetchGuideRating.rejected, (state) => {
      state.fetchRatingGuide = false;
    });

    builder.addCase(createGuideRating.pending, (state) => {
      state.postRatingGuideLoading = true;
    });
    builder.addCase(createGuideRating.fulfilled, (state) => {
      state.postRatingGuideLoading = false;
    });
    builder.addCase(createGuideRating.rejected, (state) => {
      state.postRatingGuideLoading = false;
    });
  },
});

export const toursRatingReducer = toursRatingSlice.reducer;
export const selectToursRating = (state: RootState) =>
  state.ratings.toursRating;
export const selectGuidRating = (state: RootState) => state.ratings.guideRating;
