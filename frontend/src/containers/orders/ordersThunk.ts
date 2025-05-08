import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder2, ValidationError } from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchOrders = createAsyncThunk<IOrder2[], void | string>(
  'orders/fetchAll',
  async () => {
    const response = await axiosApi.get<IOrder2[]>('/orders');
    return response.data;
  },
);

export const changeOrderStatus = createAsyncThunk<
  void,
  { id: string; status: string },
  { rejectValue: ValidationError }
>('', async (data: { id: string; status: string }, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`orders/changeStatus?orderId=${data.id}`, {
      status: data.status,
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const sendOrderEmailToTheUser = createAsyncThunk<string, string>(
  'orders/sendEmail',
  async (orderId) => {
    const { data } = await axiosApi.post(`orders/sendEmail/${orderId}`);
    return data;
  },
);

export const deleteOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('orders/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/orders/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchOrdersUser = createAsyncThunk(
  'orders/fetchGuideByUser',
  async (id: string) => {
    const response = await axiosApi.get<IOrder2[]>(`/orders?userID=${id}`);
    return response.data;
  },
);
