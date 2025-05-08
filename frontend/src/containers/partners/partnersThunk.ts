import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  INews,
  IPartnerAccept,
  IPartnerMutation,
  IPartnerOrder,
  IPartnerOrderMutation,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchPartnerOrders = createAsyncThunk<IPartnerOrder[]>(
  'partners/fetchAllRequests',
  async () => {
    const response = await axiosApi.get<IPartnerOrder[]>('/partnerOrders');
    return response.data;
  },
);

export const createPartnerOrder = createAsyncThunk<
  IPartnerOrder,
  IPartnerOrderMutation
>('partners/createPartnerOrder', async (orderData: IPartnerOrderMutation) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(orderData) as (keyof IPartnerOrderMutation)[];

    for (const key of keys) {
      const value = orderData[key];

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

    const request = await axiosApi.post<IPartnerOrder>(
      '/partnerOrders',
      formData,
    );
    return request.data;
  } catch (e) {
    throw e;
  }
});

export const deletePartnerOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('partners/deleteOrder', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/partnerOrders/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const changeStatusPartnerOrder = createAsyncThunk<void, string>(
  'partners/changeStatus',
  async (orderId: string) => {
    await axiosApi.patch(`/partnerOrders/${orderId}/toggle-status`);
  },
);

export const createPartner = createAsyncThunk<
  void,
  IPartnerMutation,
  { rejectValue: ValidationError }
>('partners/create', async (partnerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(partnerMutation) as (keyof IPartnerMutation)[];
    keys.forEach((key) => {
      const value = partnerMutation[key];

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
    await axiosApi.post('/partners', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const acceptPartner = createAsyncThunk<
  IPartnerAccept,
  IPartnerAccept,
  {
    rejectValue: ValidationError;
  }
>('partners/acceptPartner', async (rating, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<IPartnerAccept>('/partners', rating);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchOnePartner = createAsyncThunk<INews, string>(
  'partners/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/partners/${id}`);
    return response.data;
  },
);

interface updatePartners {
  id: string;
  partnerMutation: IPartnerMutation;
}

export const editPartner = createAsyncThunk<
  void,
  updatePartners,
  { rejectValue: ValidationError }
>('partners/createPartners', async (updatePartners, { rejectWithValue }) => {
  try {
    const partnerMutation = updatePartners.partnerMutation;
    const formData = new FormData();
    const keys = Object.keys(partnerMutation) as (keyof IPartnerMutation)[];

    keys.forEach((key) => {
      const value = partnerMutation[key];

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

    await axiosApi.put(`/partners/${updatePartners.id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deletePartner = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('partners/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/partners/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
