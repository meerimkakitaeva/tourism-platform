import { INews, ValidationError } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  deleteNews,
  editNews,
  fetchAdminNews,
  fetchNews,
  fetchOneNews,
  postNews,
  publishNews,
} from '@/containers/news/newsThunk';

interface NewsState {
  news: INews[];
  fetchAllLoading: boolean;
  oneNews: INews | null;
  fetchOneLoading: boolean;
  publishLoading: boolean | string;
  postNewsLoading: boolean;
  postNewsError: ValidationError | null;
  editLoading: boolean;
  deleteLoading: boolean | string;
  fetchAdminNewsLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  fetchAllLoading: false,
  oneNews: null,
  fetchOneLoading: false,
  publishLoading: false,
  postNewsLoading: false,
  postNewsError: null,
  editLoading: false,
  deleteLoading: false,
  fetchAdminNewsLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.news };
      },
    );
    builder.addCase(fetchNews.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, { payload: news }) => {
      state.news = news;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchAdminNews.pending, (state) => {
      state.fetchAdminNewsLoading = true;
    });
    builder.addCase(fetchAdminNews.fulfilled, (state, { payload: news }) => {
      state.news = news;
      state.fetchAdminNewsLoading = false;
    });
    builder.addCase(fetchAdminNews.rejected, (state) => {
      state.fetchAdminNewsLoading = false;
    });
    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.oneNews = action.payload;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(publishNews.pending, (state, action) => {
      state.publishLoading = action.meta.arg;
    });
    builder.addCase(publishNews.fulfilled, (state) => {
      state.publishLoading = false;
    });
    builder.addCase(publishNews.rejected, (state) => {
      state.publishLoading = false;
    });
    builder.addCase(postNews.pending, (state) => {
      state.postNewsLoading = true;
      state.postNewsError = null;
    });
    builder.addCase(postNews.fulfilled, (state) => {
      state.postNewsLoading = false;
    });
    builder.addCase(postNews.rejected, (state, { payload: error }) => {
      state.postNewsLoading = false;
      state.postNewsError = error || null;
    });
    builder.addCase(editNews.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editNews.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editNews.rejected, (state) => {
      state.editLoading = false;
    });
    builder.addCase(deleteNews.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteNews.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteNews.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const selectAllNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.oneNews;
export const selectDeleteNewsLoading = (state: RootState) =>
  state.news.deleteLoading;
export const selectNewsPublishLoading = (state: RootState) =>
  state.news.publishLoading;
