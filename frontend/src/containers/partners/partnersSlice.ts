import { IPartner, IPartnerOrder, ValidationError } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  acceptPartner,
  changeStatusPartnerOrder,
  createPartner,
  createPartnerOrder,
  deletePartner,
  deletePartnerOrder,
  editPartner,
  fetchOnePartner,
  fetchPartnerOrders,
} from '@/containers/partners/partnersThunk';

interface NewsState {
  partnerOrders: IPartnerOrder[];
  fetchAllLoading: boolean;
  oneOrder: IPartnerOrder | null;
  fetchOneLoading: boolean;
  postOrderLoading: boolean;
  postOrderError: ValidationError | null;
  deleteLoading: boolean | string;
  changeStatusLoading: boolean;
  postPartnerLoading: boolean;
  postPartnerError: ValidationError | null;
  editLoading: boolean;
  deletePartnerLoading: boolean | string;
  onePartner: IPartner | null;
  fetchOnePartnerLoading: boolean;
}

const initialState: NewsState = {
  partnerOrders: [],
  fetchAllLoading: false,
  oneOrder: null,
  fetchOneLoading: false,
  postOrderLoading: false,
  postOrderError: null,
  deleteLoading: false,
  changeStatusLoading: false,
  postPartnerLoading: false,
  postPartnerError: null,
  editLoading: false,
  deletePartnerLoading: false,
  onePartner: null,
  fetchOnePartnerLoading: false,
};

export const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.partners };
      },
    );
    builder.addCase(fetchPartnerOrders.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchPartnerOrders.fulfilled,
      (state, { payload: partnerOrders }) => {
        state.partnerOrders = partnerOrders;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchPartnerOrders.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(createPartnerOrder.pending, (state) => {
      state.postOrderLoading = true;
    });
    builder.addCase(createPartnerOrder.fulfilled, (state) => {
      state.postOrderLoading = false;
    });
    builder.addCase(createPartnerOrder.rejected, (state) => {
      state.postOrderLoading = false;
    });

    builder.addCase(deletePartnerOrder.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deletePartnerOrder.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePartnerOrder.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(changeStatusPartnerOrder.pending, (state) => {
      state.changeStatusLoading = true;
    });
    builder.addCase(changeStatusPartnerOrder.fulfilled, (state) => {
      state.changeStatusLoading = false;
    });
    builder.addCase(changeStatusPartnerOrder.rejected, (state) => {
      state.changeStatusLoading = false;
    });

    builder.addCase(createPartner.pending, (state) => {
      state.postPartnerLoading = true;
      state.postPartnerError = null;
    });
    builder.addCase(createPartner.fulfilled, (state) => {
      state.postPartnerLoading = false;
    });
    builder.addCase(createPartner.rejected, (state, { payload: error }) => {
      state.postPartnerLoading = false;
      state.postPartnerError = error || null;
    });

    builder.addCase(acceptPartner.pending, (state) => {
      state.postPartnerLoading = true;
      state.postPartnerError = null;
    });
    builder.addCase(acceptPartner.fulfilled, (state) => {
      state.postPartnerLoading = false;
    });
    builder.addCase(acceptPartner.rejected, (state, { payload: error }) => {
      state.postPartnerLoading = false;
      state.postPartnerError = error || null;
    });
    builder.addCase(fetchOnePartner.pending, (state) => {
      state.fetchOnePartnerLoading = true;
    });
    builder.addCase(fetchOnePartner.fulfilled, (state, action) => {
      state.fetchOnePartnerLoading = false;
      state.onePartner = action.payload;
    });
    builder.addCase(fetchOnePartner.rejected, (state) => {
      state.fetchOnePartnerLoading = false;
    });
    builder.addCase(editPartner.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editPartner.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editPartner.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(deletePartner.pending, (state, action) => {
      state.deletePartnerLoading = action.meta.arg;
    });
    builder.addCase(deletePartner.fulfilled, (state) => {
      state.deletePartnerLoading = false;
    });
    builder.addCase(deletePartner.rejected, (state) => {
      state.deletePartnerLoading = false;
    });
  },
});

export const selectAllPartnerOrders = (state: RootState) =>
  state.partners.partnerOrders;
export const selectDeletePartnerOrderLoading = (state: RootState) =>
  state.partners.deleteLoading;
export const selectPostOrderLoading = (state: RootState) =>
  state.partners.postOrderLoading;
export const selectChangeStatusLoading = (state: RootState) =>
  state.partners.changeStatusLoading;
export const selectCreatePartnerLoading = (state: RootState) =>
  state.partners.postPartnerLoading;

export const selectOnePartner = (state: RootState) => state.partners.onePartner;
