import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAboutUs,
  IAboutUsBlock,
  IEmployee,
  IEmployeeMutation,
  INewsMutation,
  IPartner,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchAboutUs = createAsyncThunk<IAboutUs>(
  'about/fetchAboutUs',
  async () => {
    const { data } = await axiosApi.get('/aboutUs');
    return data;
  },
);

interface IEditAboutUsBLockSubmit {
  sectionName: string;
  section: IAboutUsBlock;
}

export const editAboutUsBlock = createAsyncThunk<
  IAboutUs,
  IEditAboutUsBLockSubmit
>('about/editAboutUsBlock', async (block) => {
  console.log(block.section);
  const { data } = await axiosApi.put<IAboutUs>(
    `/aboutUs/${block.sectionName}${
      block.sectionName === 'posts' ? `?postId=${block.section._id}` : ''
    }`,
    block.section,
  );

  return data;
});

export const fetchEmployees = createAsyncThunk<IEmployee[], void | string>(
  'about/fetchAllEmployees',
  async () => {
    const response = await axiosApi.get<IEmployee[]>('/employees');
    return response.data;
  },
);

export const fetchPartners = createAsyncThunk<IPartner[], void | string>(
  'about/fetchAllPartners',
  async () => {
    const response = await axiosApi.get<IPartner[]>('/partners');
    return response.data;
  },
);

export const fetchOneEmployee = createAsyncThunk<IEmployee, string>(
  'about/fetchOneEmployees',
  async (id) => {
    const response = await axiosApi.get(`/employees/${id}`);
    return response.data;
  },
);

export const postEmployees = createAsyncThunk<
  void,
  IEmployeeMutation,
  { rejectValue: ValidationError }
>('about/createEmployees', async (employeeMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(employeeMutation) as (keyof IEmployeeMutation)[];

    keys.forEach((key) => {
      const value = employeeMutation[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post<INewsMutation>('/employees', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

interface updateEmployeesParams {
  id: string;
  employeeMutation: IEmployeeMutation;
}

export const editEmployees = createAsyncThunk<
  void,
  updateEmployeesParams,
  { rejectValue: ValidationError }
>('about/editEmployees', async (updateEmployeesParams, { rejectWithValue }) => {
  try {
    const employeeMutation = updateEmployeesParams.employeeMutation;
    const formData = new FormData();
    const keys = Object.keys(employeeMutation) as (keyof IEmployeeMutation)[];

    keys.forEach((key) => {
      const value = employeeMutation[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.put<INewsMutation>(
      `/employees/${updateEmployeesParams.id}`,
      formData,
    );
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteEmployees = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('about/deleteEmployees', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/employees/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
