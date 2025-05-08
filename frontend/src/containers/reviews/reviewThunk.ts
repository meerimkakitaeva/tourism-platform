import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IPostGuideReview,
  ReviewOfGuides,
  ReviewOfPlatform,
  ReviewOfTour,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchToursReviews = createAsyncThunk<
  ReviewOfTour[],
  void | string
>('toursReview/fetchAll', async (id) => {
  if (id) {
    const response = await axiosApi.get<ReviewOfTour[]>(
      `/tourReviews?tourID=${id}`,
    );
    return response.data;
  } else {
    const response = await axiosApi.get<ReviewOfTour[]>(`/tourReviews`);
    return response.data;
  }
});

export const fetchGuideReviews = createAsyncThunk<
  ReviewOfGuides[],
  void | string
>('guidesReview/fetchAll', async (id) => {
  if (id) {
    const response = await axiosApi.get<ReviewOfGuides[]>(
      `/guideReviews?guideID=${id}`,
    );
    return response.data;
  } else {
    const response = await axiosApi.get<ReviewOfGuides[]>(`/guideReviews`);
    return response.data;
  }
});

export const fetchPlatformReviews = createAsyncThunk<
  ReviewOfPlatform[],
  boolean | undefined
>('platformReview/fetchAll', async (limit?: boolean) => {
  const response = await axiosApi.get<ReviewOfPlatform[]>(
    `/platformReviews${limit ? '?limit=limit' : ''}`,
  );
  return response.data;
});

export const createGuideReview = createAsyncThunk<
  IPostGuideReview,
  IPostGuideReview,
  {
    rejectValue: ValidationError;
  }
>('reviews/createGuideReview', async (review, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/guideReviews', review);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
