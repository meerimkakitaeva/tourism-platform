import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IPostGuideRating,
  RatingOfGuide,
  RatingOfTour,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchTourRating = createAsyncThunk<RatingOfTour[], void | string>(
  'toursRating/fetchAll',
  async (id) => {
    const response = await axiosApi.get<RatingOfTour[]>(
      `/tourRatings?tourID=${id}`,
    );
    return response.data;
  },
);

export const fetchGuideRating = createAsyncThunk<RatingOfGuide[], string>(
  'toursRating/fetchGuideRating',
  async (id: string) => {
    const response = await axiosApi.get<RatingOfGuide[]>(
      `/guideRatings?guideID=${id}`,
    );
    return response.data;
  },
);

export const createGuideRating = createAsyncThunk<
  IPostGuideRating,
  IPostGuideRating,
  {
    rejectValue: ValidationError;
  }
>('toursRating/createGuideRating', async (rating, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<IPostGuideRating>(
      '/guideRatings',
      rating,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
