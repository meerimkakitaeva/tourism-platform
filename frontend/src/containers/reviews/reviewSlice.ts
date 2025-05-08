import { createSlice } from '@reduxjs/toolkit';
import {
  createGuideReview,
  fetchGuideReviews,
  fetchPlatformReviews,
  fetchToursReviews,
} from './reviewThunk';
import { ReviewOfGuides, ReviewOfPlatform, ReviewOfTour } from '@/type';
import { RootState } from '@/store/store';

interface ReviewsState {
  toursReview: ReviewOfTour[];
  fetchToursLoading: boolean;
  guidesReview: ReviewOfGuides[];
  fetchGuidesLoading: boolean;
  platformReview: ReviewOfPlatform[];
  fetchPlatformLoading: boolean;
  postGuideReviewLoading: boolean;
}

const initialState: ReviewsState = {
  toursReview: [],
  fetchToursLoading: false,
  guidesReview: [],
  fetchGuidesLoading: false,
  platformReview: [],
  fetchPlatformLoading: false,
  postGuideReviewLoading: false,
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToursReviews.pending, (state) => {
      state.fetchToursLoading = true;
    });
    builder.addCase(
      fetchToursReviews.fulfilled,
      (state, { payload: toursReview }) => {
        state.toursReview = toursReview;
        state.fetchToursLoading = false;
      },
    );
    builder.addCase(fetchToursReviews.rejected, (state) => {
      state.fetchToursLoading = false;
    });
    builder.addCase(fetchGuideReviews.pending, (state) => {
      state.fetchGuidesLoading = true;
    });
    builder.addCase(
      fetchGuideReviews.fulfilled,
      (state, { payload: guidesReview }) => {
        state.guidesReview = guidesReview;
        state.fetchGuidesLoading = false;
      },
    );
    builder.addCase(fetchGuideReviews.rejected, (state) => {
      state.fetchGuidesLoading = false;
    });

    builder.addCase(fetchPlatformReviews.pending, (state) => {
      state.fetchPlatformLoading = true;
    });
    builder.addCase(
      fetchPlatformReviews.fulfilled,
      (state, { payload: platformReview }) => {
        state.platformReview = platformReview;
        state.fetchPlatformLoading = false;
      },
    );
    builder.addCase(fetchPlatformReviews.rejected, (state) => {
      state.fetchPlatformLoading = false;
    });

    builder.addCase(createGuideReview.pending, (state) => {
      state.postGuideReviewLoading = true;
    });
    builder.addCase(createGuideReview.fulfilled, (state) => {
      state.postGuideReviewLoading = false;
    });
    builder.addCase(createGuideReview.rejected, (state) => {
      state.postGuideReviewLoading = false;
    });
  },
});

export const toursReviewReducer = reviewSlice.reducer;
export const selectToursReviews = (state: RootState) =>
  state.reviews.toursReview;
export const selectGuidesReviews = (state: RootState) =>
  state.reviews.guidesReview;
export const selectPlatformReviews = (state: RootState) =>
  state.reviews.platformReview;
