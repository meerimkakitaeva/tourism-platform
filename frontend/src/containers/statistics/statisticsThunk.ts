import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStatisticsAdmin, StatisticsInfo } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchStatsAdmin = createAsyncThunk<
  IStatisticsAdmin,
  void | string
>('stats/fetchAll', async () => {
  const response = await axiosApi.get<IStatisticsAdmin>('/statistics');
  return response.data;
});

export const fetchStatisticsInfo = createAsyncThunk<
  StatisticsInfo,
  void | string
>('stats/fetchStatsInfo', async () => {
  const response = await axiosApi.get<StatisticsInfo>('/statisticsInfo');
  return response.data;
});
