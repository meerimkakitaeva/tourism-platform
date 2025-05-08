import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IEditGuide,
  ICreateGuideMutation,
  IGuide,
  IGuideFull,
  IGuideRequest,
  ISendGuideRequestMutation,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';
export const fetchGuides = createAsyncThunk('guides/fetchAll', async () => {
  const response = await axiosApi.get<IGuideFull[]>('/guides');
  return response.data;
});

export const fetchGuide = createAsyncThunk(
  'guides/fetchGuide',
  async (id: string) => {
    const response = await axiosApi.get<IGuideFull>(`/guides/${id}`);
    return response.data;
  },
);

export const fetchAdminGuides = createAsyncThunk(
  'guides/fetchAdminGuides',
  async () => {
    const response = await axiosApi.get<IGuideFull[]>('/guides/all');
    return response.data;
  },
);

export const fetchGuideNameByFilter = createAsyncThunk<IGuideFull[], string>(
  'guides/fetchByFilter',
  async (name) => {
    const response = await axiosApi.get<IGuideFull[]>(
      `/guides/filterByName?name=${name}`,
    );
    return response.data;
  },
);

export const becomeGuide = createAsyncThunk<
  IGuideRequest,
  ISendGuideRequestMutation
>('guides/sendRequest', async (guideData: ISendGuideRequestMutation) => {
  try {
    const request = await axiosApi.post('guideOrders', guideData);
    return request.data;
  } catch (e) {
    throw e;
  }
});

export const createGuide = createAsyncThunk<IGuide, ICreateGuideMutation>(
  'guides/createGuide',
  async (guideData: ICreateGuideMutation) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(guideData) as (keyof ICreateGuideMutation)[];

      for (const key of keys) {
        const value = guideData[key];

        if (value !== undefined && value !== null) {
          if (key === 'image' && value instanceof File) {
            formData.append(key, value, value.name);
          } else if (Array.isArray(value)) {
            value.forEach((val) => formData.append(key, val));
          } else {
            formData.append(key, value.toString());
          }
        }
      }

      const request = await axiosApi.post<IGuide>('/guides', formData);
      return request.data;
    } catch (e) {
      throw e;
    }
  },
);

export const fetchGuideOrders = createAsyncThunk<
  IGuideRequest[],
  void | string
>('guides/fetchAllOrders', async () => {
  const response = await axiosApi.get<IGuideRequest[]>('/guideOrders');
  return response.data;
});

export const fetchOneGuideOrder = createAsyncThunk<IGuideRequest, string>(
  'guides/fetchOneOrder',
  async (id) => {
    const response = await axiosApi.get(`/guideOrders/${id}`);
    return response.data;
  },
);

export const deleteGuideOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('guides/deleteOrder', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/guideOrders/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteGuide = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('guides/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/guides/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchGuideUser = createAsyncThunk(
  'guides/fetchGuideByUser',
  async (id: string) => {
    const response = await axiosApi.get<IGuide>(`/guides?userID=${id}`);
    return response.data;
  },
);

export const editGuide = createAsyncThunk<
  IEditGuide,
  IEditGuide,
  { rejectValue: ValidationError }
>('guides/editGuide', async (guide: IEditGuide, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(guide) as (keyof IEditGuide)[];

    for (const key of keys) {
      const value = guide[key];

      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    const response = await axiosApi.put(`/guides/${guide.id}`, formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
