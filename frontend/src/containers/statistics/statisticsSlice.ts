import { IStatisticsAdmin, StatisticsInfo } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  fetchStatisticsInfo,
  fetchStatsAdmin,
} from '@/containers/statistics/statisticsThunk';

interface adminStatsState {
  statsAdmin: IStatisticsAdmin | null;
  statsInfo: StatisticsInfo | null;
  statsAdminFetchLoading: boolean;
  statsInfoLoading: boolean;
}

const initialState: adminStatsState = {
  statsAdmin: null,
  statsInfo: null,
  statsAdminFetchLoading: false,
  statsInfoLoading: false,
};

export const statsAdminSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.news };
      },
    );
    builder.addCase(fetchStatsAdmin.pending, (state) => {
      state.statsAdminFetchLoading = true;
    });
    builder.addCase(fetchStatsAdmin.fulfilled, (state, { payload }) => {
      state.statsAdmin = payload;
      state.statsAdminFetchLoading = false;
    });
    builder.addCase(fetchStatsAdmin.rejected, (state) => {
      state.statsAdminFetchLoading = false;
    });

    builder.addCase(fetchStatisticsInfo.pending, (state) => {
      state.statsAdminFetchLoading = true;
    });
    builder.addCase(fetchStatisticsInfo.fulfilled, (state, { payload }) => {
      state.statsInfo = payload;
      state.statsAdminFetchLoading = false;
    });
    builder.addCase(fetchStatisticsInfo.rejected, (state) => {
      state.statsAdminFetchLoading = false;
    });
  },
});

export const selectAdminStats = (state: RootState) =>
  state.statsAdmin.statsAdmin;
export const selectStatsFetchLoading = (state: RootState) =>
  state.statsAdmin.statsAdminFetchLoading;

export const selectStatsInfo = (state: RootState) => state.statsAdmin.statsInfo;
