import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOrder,
  ITourMutation,
  ITourReview,
  Tour,
  TourFull,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';
import { LIMIT } from '@/constants';

export const fetchTours = createAsyncThunk<
  | {
      tours: Tour[];
      allToursLength: number;
    }
  | Tour[],
  | {
      guide?: string;
      skip?: number;
      limit?: number;
    }
  | undefined
>('tours/fetchAll', async (arg) => {
  if (arg?.guide) {
    const response = await axiosApi.get<Tour[]>(`/tours/?guide=${arg.guide}`);
    return response.data;
  }
  const response = await axiosApi.get<{
    tours: Tour[];
    allToursLength: number;
  }>(`/tours?skip=${arg?.skip || 0}&limit=${arg?.limit ?? LIMIT}`);

  return response.data;
});

export const fetchToursWithDiscountPrice = createAsyncThunk<
  Tour[],
  { skip: number; limit: number } | undefined
>('tours/fetchToursWithDiscountPrice', async (arg) => {
  if (arg) {
    const { data } = await axiosApi.get<Tour[]>(
      `/tours/toursWithDiscountPrice?skip=${arg.skip}&limit=${arg.limit}`,
    );

    return data;
  } else {
    const { data } = await axiosApi.get<Tour[]>(
      '/tours/toursWithDiscountPrice',
    );

    return data;
  }
});

export const fetchToursByFilter = createAsyncThunk<
  Tour[],
  {
    date?: string;
    location?: string;
    categories: string[];
    skip?: number;
    limit?: number;
  }
>(
  'tours/fetchByFilter',
  async ({ date, location, categories, skip, limit }) => {
    const url = `/tours/filter?location=${location}&date=${date}&category=${categories.join(
      ',',
    )}`;
    const response = await axiosApi<Tour[]>(
      `${url}&skip=${skip}&limit=${limit ?? LIMIT}`,
    );
    return response.data;
  },
);

export const fetchAdminTours = createAsyncThunk<
  { tours: Tour[]; allToursLength: number },
  { all?: boolean; skip?: number; limit?: number }
>('tours/fetchAdminAll', async ({ all, skip, limit }) => {
  if (all) {
    const response = await axiosApi.get<{
      tours: Tour[];
      allToursLength: number;
    }>(`/tours/all?all=true&skip=${skip}&limit=${limit}`);
    return response.data;
  }
  const response = await axiosApi.get<{
    tours: Tour[];
    allToursLength: number;
  }>(`/tours/all?skip=${skip}&limit=${limit ?? LIMIT}`);
  return response.data;
});

export const fetchTour = createAsyncThunk<TourFull, string>(
  'tours/fetchOne',
  async (id) => {
    const response = await axiosApi.get<TourFull>(`/tours/${id}`);
    return response.data;
  },
);

export const publishTour = createAsyncThunk<void, string>(
  'tours/publish',
  async (tourID: string) => {
    await axiosApi.patch(`/tours/${tourID}/togglePublished`);
  },
);

export const tourReview = createAsyncThunk<
  ITourReview,
  ITourReview,
  {
    rejectValue: ValidationError;
  }
>('reviews/postOne', async (formData: ITourReview, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<ITourReview>('/tourReviews', formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const createOrder = createAsyncThunk<
  void,
  IOrder,
  { rejectValue: ValidationError }
>('orders/createOne', async (order, { rejectWithValue }) => {
  try {
    await axiosApi.post('/orders', order);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const postTour = createAsyncThunk<
  void,
  ITourMutation,
  { rejectValue: ValidationError }
>('tours/create', async (tourMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(tourMutation) as (keyof ITourMutation)[];
    keys.forEach((key) => {
      const value = tourMutation[key];

      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item, item.name);
            }
          });
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await axiosApi.post('/tours', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

interface updateTourParams {
  id: string;
  tourMutation: ITourMutation;
}

export const editTour = createAsyncThunk<
  void,
  updateTourParams,
  { rejectValue: ValidationError }
>('tours/edit', async (updateTourParams, { rejectWithValue }) => {
  try {
    const tourMutation = updateTourParams.tourMutation;
    const formData = new FormData();
    const keys = Object.keys(tourMutation) as (keyof ITourMutation)[];
    keys.forEach((key) => {
      const value = tourMutation[key];

      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item, item.name);
            }
          });
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await axiosApi.put(`/tours/${updateTourParams.id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteTour = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('tours/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/tours/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchToursGuide = createAsyncThunk(
  'tours/guideTours',
  async (id: string) => {
    const response = await axiosApi.get<Tour[]>(`/tours?guide=${id}`);
    return response.data;
  },
);
