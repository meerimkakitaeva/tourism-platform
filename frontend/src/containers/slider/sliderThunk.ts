import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMainSlider, IMainSliderMutation, ValidationError } from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchSliders = createAsyncThunk<IMainSlider[], void | string>(
  'sliders/fetchAll',
  async () => {
    const response = await axiosApi.get<IMainSlider[]>('/mainSlider');
    return response.data;
  },
);
export const fetchOneSlider = createAsyncThunk<IMainSlider, string>(
  'sliders/fetchOne',
  async (id) => {
    const response = await axiosApi.get<IMainSlider>(`/mainSlider/${id}`);
    return response.data;
  },
);
export const postSliders = createAsyncThunk<
  void,
  IMainSliderMutation,
  { rejectValue: ValidationError }
>('sliders/create', async (mainSliderMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(
      mainSliderMutation,
    ) as (keyof IMainSliderMutation)[];

    keys.forEach((key) => {
      const value = mainSliderMutation[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post<IMainSliderMutation>('/mainSlider', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

interface updateMainSlidersParams {
  id: string;
  mainSliderMutation: IMainSliderMutation;
}

export const editSliders = createAsyncThunk<
  void,
  updateMainSlidersParams,
  { rejectValue: ValidationError }
>('sliders/edit', async (updateMainSlidersParams, { rejectWithValue }) => {
  try {
    const mainSliderMutation = updateMainSlidersParams.mainSliderMutation;
    const formData = new FormData();
    const keys = Object.keys(
      mainSliderMutation,
    ) as (keyof IMainSliderMutation)[];

    keys.forEach((key) => {
      const value = mainSliderMutation[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.put<IMainSliderMutation>(
      `/mainSlider/${updateMainSlidersParams.id}`,
      formData,
    );
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteSliders = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('sliders/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/mainSlider/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
