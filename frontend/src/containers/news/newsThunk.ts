import { createAsyncThunk } from '@reduxjs/toolkit';
import { INews, INewsMutation, ValidationError } from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchNews = createAsyncThunk<INews[]>(
  'news/fetchAll',
  async () => {
    const response = await axiosApi.get<INews[]>('/news');
    return response.data;
  },
);
export const fetchAdminNews = createAsyncThunk<INews[], void | string>(
  'news/fetchAdminAll',
  async (all) => {
    const response = await axiosApi.get<INews[]>(`/news/all?true=${all}`);
    return response.data;
  },
);
export const fetchOneNews = createAsyncThunk<INews, string>(
  'news/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/news/${id}`);
    return response.data;
  },
);

export const publishNews = createAsyncThunk<void, string>(
  'news/publish',
  async (newsID: string) => {
    await axiosApi.patch(`/news/${newsID}/togglePublished`);
  },
);

export const postNews = createAsyncThunk<
  void,
  INewsMutation,
  { rejectValue: ValidationError }
>('news/create', async (newsMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(newsMutation) as (keyof INewsMutation)[];
    keys.forEach((key) => {
      const value = newsMutation[key];

      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === 'string') {
              formData.append(key, item);
            } else if (item instanceof File) {
              formData.append(key, item, item.name);
            } else {
              formData.append(key, JSON.stringify(item));
            }
          });
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await axiosApi.post('/news', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

interface updateNewsParams {
  id: string;
  newsMutation: INewsMutation;
}

export const editNews = createAsyncThunk<
  void,
  updateNewsParams,
  { rejectValue: ValidationError }
>('news/edit', async (updateNewsParams, { rejectWithValue }) => {
  try {
    const newsMutation = updateNewsParams.newsMutation;
    const formData = new FormData();
    const keys = Object.keys(newsMutation) as (keyof INewsMutation)[];
    keys.forEach((key) => {
      const value = newsMutation[key];

      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === 'string') {
              formData.append(key, item);
            } else if (item instanceof File) {
              formData.append(key, item, item.name);
            } else {
              formData.append(key, JSON.stringify(item));
            }
          });
        } else {
          formData.append(key, value as string);
        }
      }
    });

    await axiosApi.put(`/news/${updateNewsParams.id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteNews = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('news/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/news/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
