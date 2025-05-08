import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  IEditProfile,
  RegisterMessage,
  RegisterMutation,
  RegisterResponse,
  signInMutation,
  User,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '@/store/store';

export const getUsers = createAsyncThunk<User[], string>(
  'users/getUser',
  async (username: string) => {
    try {
      const { data } = await axiosApi.get(`/users?username=${username}`);
      return data;
    } catch (e) {
      throw e;
    }
  },
);

export const signUp = createAsyncThunk<
  RegisterMessage,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  'users/register',
  async (registerMutation: RegisterMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

      keys.forEach((key) => {
        const value = registerMutation[key];

        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const { data } = await axiosApi.post<RegisterMessage>('/users', formData);

      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const signIn = createAsyncThunk<
  RegisterResponse,
  signInMutation,
  { rejectValue: { error: string } }
>(
  'users/signIn',
  async (signUpMutation: signInMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        '/users/sessions',
        signUpMutation,
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users/logout',
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('users/sessions', {
      headers: { Authorization: token },
    });
  },
);

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users/google', {
      credential,
    });
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const editProfile = createAsyncThunk<
  RegisterResponse,
  IEditProfile,
  { rejectValue: ValidationError }
>('users/editProfile', async (userData: IEditProfile, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(userData) as (keyof IEditProfile)[];

    keys.forEach((key) => {
      const value = userData[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.put<RegisterResponse>(
      `/users/${userData.id}`,
      formData,
    );

    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const editUserRole = createAsyncThunk<
  User,
  { id: string; role: string }
>('users/editUserRole', async (userData: { id: string; role: string }) => {
  try {
    const { data } = await axiosApi.patch(`/users/${userData.id}`, userData);
    return data;
  } catch (e) {
    throw e;
  }
});

export const changeUserRole = createAsyncThunk<
  RegisterResponse,
  { userId: string; newRole: string },
  { rejectValue: GlobalError }
>('users/changeUserRole', async ({ userId, newRole }, { rejectWithValue }) => {
  try {
    const response = await axiosApi.put(`/users/${userId}/change-role`, {
      role: newRole,
    });
    return response.data as RegisterResponse;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
