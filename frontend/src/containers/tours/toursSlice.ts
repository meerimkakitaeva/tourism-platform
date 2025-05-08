import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteTour,
  editTour,
  fetchAdminTours,
  fetchTour,
  fetchTours,
  fetchToursByFilter,
  fetchToursGuide,
  fetchToursWithDiscountPrice,
  postTour,
  publishTour,
  tourReview,
} from './toursThunk';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import { Tour, TourFull, ValidationError } from '@/type';

interface ToursState {
  tours: Tour[];
  allToursLength: number;
  toursWithDiscountPrice: Tour[];
  tour: TourFull | null;
  fetchAllLoading: boolean;
  fetchAdminTourLoading: boolean;
  fetchOneLoading: boolean;
  postTourLoading: boolean;
  postTourError: ValidationError | null;
  tourReviews: [];
  postReviewError: ValidationError | null;
  postReviewLoading: boolean;
  orderError: ValidationError | null;
  orderButtonLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean | string;
  publishLoading: boolean | string;
  modal: boolean;
  hotTours: Tour[];
  guideTours: Tour[];
  loadingGuideTours: boolean;
}

const initialState: ToursState = {
  tours: [],
  allToursLength: 0,
  toursWithDiscountPrice: [],
  tour: null,
  fetchAllLoading: false,
  fetchAdminTourLoading: false,
  fetchOneLoading: false,
  postTourLoading: false,
  postTourError: null,
  tourReviews: [],
  postReviewError: null,
  postReviewLoading: false,
  orderError: null,
  orderButtonLoading: false,
  editLoading: false,
  deleteLoading: false,
  publishLoading: false,
  modal: false,
  hotTours: [],
  guideTours: [],
  loadingGuideTours: false,
};

export const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    resetPostReviewError: (state) => {
      state.postReviewError = null;
    },
    showModal: (state, action) => {
      state.modal = action.payload;
    },
    clearOrderError: (state) => {
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.tours };
      },
    );

    builder.addCase(fetchTours.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchTours.fulfilled, (state, { payload }) => {
      if (payload instanceof Array) {
        payload.length >= 4
          ? (state.hotTours = [payload[0], payload[1], payload[2], payload[3]])
          : (state.hotTours = []);
        state.tours = payload;
      } else {
        payload.tours.length >= 4
          ? (state.hotTours = [
              payload.tours[0],
              payload.tours[1],
              payload.tours[2],
              payload.tours[3],
            ])
          : (state.hotTours = []);
        state.allToursLength = payload.allToursLength;
        state.tours = payload.tours;
      }

      state.fetchAllLoading = false;
    });
    builder.addCase(fetchTours.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(
      fetchToursWithDiscountPrice.fulfilled,
      (state, { payload }) => {
        state.toursWithDiscountPrice = payload;
      },
    );

    builder.addCase(fetchToursByFilter.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchToursByFilter.fulfilled,
      (state, { payload: tours }) => {
        state.tours = tours;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchToursByFilter.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchAdminTours.pending, (state) => {
      state.fetchAdminTourLoading = true;
    });
    builder.addCase(fetchAdminTours.fulfilled, (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.tours = payload;
      } else {
        state.tours = payload.tours;
        state.allToursLength = payload.allToursLength;
      }

      state.fetchAdminTourLoading = false;
    });
    builder.addCase(fetchAdminTours.rejected, (state) => {
      state.fetchAdminTourLoading = false;
    });

    builder.addCase(fetchTour.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchTour.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.tour = action.payload;
    });
    builder.addCase(fetchTour.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(tourReview.pending, (state) => {
      state.postReviewLoading = true;
      state.postReviewError = null;
    });
    builder.addCase(tourReview.fulfilled, (state) => {
      state.postReviewLoading = false;
    });
    builder.addCase(tourReview.rejected, (state, { payload: error }) => {
      state.postReviewLoading = false;
      state.postReviewError = error || null;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.orderButtonLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.orderButtonLoading = false;
    });
    builder.addCase(createOrder.rejected, (state, { payload: error }) => {
      state.orderButtonLoading = false;
      state.orderError = error || null;
    });
    builder.addCase(postTour.pending, (state) => {
      state.postTourLoading = true;
      state.postTourError = null;
    });
    builder.addCase(postTour.fulfilled, (state) => {
      state.postTourLoading = false;
    });
    builder.addCase(postTour.rejected, (state, { payload: error }) => {
      state.postTourLoading = false;
      state.postTourError = error || null;
    });

    builder.addCase(editTour.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editTour.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editTour.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(deleteTour.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteTour.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTour.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(publishTour.pending, (state, action) => {
      state.publishLoading = action.meta.arg;
    });
    builder.addCase(publishTour.fulfilled, (state) => {
      state.publishLoading = false;
    });
    builder.addCase(publishTour.rejected, (state) => {
      state.publishLoading = false;
    });

    builder.addCase(fetchToursGuide.pending, (state, action) => {
      state.loadingGuideTours = true;
    });
    builder.addCase(
      fetchToursGuide.fulfilled,
      (state, { payload: guideTours }) => {
        state.loadingGuideTours = false;
        state.guideTours = guideTours;
      },
    );
    builder.addCase(fetchToursGuide.rejected, (state) => {
      state.loadingGuideTours = false;
    });
  },
});

export const { resetPostReviewError, showModal, clearOrderError } =
  toursSlice.actions;
export const toursReducer = toursSlice.reducer;
export const selectAllTours = (state: RootState) => state.tours.tours;
export const selectAllToursLength = (state: RootState) =>
  state.tours.allToursLength;
export const selectToursWithDiscountTours = (state: RootState) =>
  state.tours.toursWithDiscountPrice;
export const selectOneTour = (state: RootState) => state.tours.tour;
export const selectFetchAllLoading = (state: RootState) =>
  state.tours.fetchAllLoading;
export const selectFetchOneLoading = (state: RootState) =>
  state.tours.fetchOneLoading;
export const selectPostReviewError = (state: RootState) =>
  state.tours.postReviewError;
export const selectPostReviewLoading = (state: RootState) =>
  state.tours.postReviewLoading;
export const selectTourReviews = (state: RootState) => state.tours.tourReviews;
export const selectOrderError = (state: RootState) => state.tours.orderError;
export const selectPostTourLoading = (state: RootState) =>
  state.tours.postTourLoading;
export const selectPostTourError = (state: RootState) =>
  state.tours.postTourError;
export const selectEditTourLoading = (state: RootState) =>
  state.tours.editLoading;
export const selectDeleteTourLoading = (state: RootState) =>
  state.tours.deleteLoading;
export const selectTourPublishLoading = (state: RootState) =>
  state.tours.publishLoading;
export const selectAdminTourLoading = (state: RootState) =>
  state.tours.fetchAdminTourLoading;
export const galleryModal = (state: RootState) => state.tours.modal;
export const selectHotTours = (state: RootState) => state.tours.hotTours;
export const selectGuideTours = (state: RootState) => state.tours.guideTours;
export const selectLoadingGuideTours = (state: RootState) =>
  state.tours.loadingGuideTours;
