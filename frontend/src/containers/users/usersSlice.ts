import { createSlice } from '@reduxjs/toolkit';
import {
  changeUserRole,
  editProfile,
  editUserRole,
  getUsers,
  googleLogin,
  logout,
  signIn,
  signUp,
} from './usersThunk';
import { RootState } from '@/store/store';
import { IAlert, RegisterMessage, User, ValidationError } from '@/type';
import { apiUrl } from '@/constants';
import { nanoid } from 'nanoid';

interface UsersState {
  user: User | null;
  users: User[];
  registerMessage: RegisterMessage | null;
  usersLoading: boolean;
  registerLoading: boolean;
  signUpError: ValidationError | null;
  signInLoading: boolean;
  signInError: { error: string } | null;
  logoutLoading: boolean;
  editLoading: boolean;
  alerts: IAlert[];
  editorModal: boolean;
  changeRoleLoading: boolean;
  patchLoading: boolean;
  lang: string;
}

const initialState: UsersState = {
  user: null,
  users: [],
  registerMessage: null,
  usersLoading: false,
  registerLoading: false,
  signUpError: null,
  signInLoading: false,
  signInError: null,
  logoutLoading: false,
  editLoading: false,
  alerts: [],
  editorModal: false,
  changeRoleLoading: false,
  patchLoading: false,
  lang: 'en',
};

const getFilteredUrl = (url: string) =>
  url.includes('http')
    ? url
    : `${apiUrl}/${url.includes('fixtures') ? '' : 'images/'}${url}`;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
        id: nanoid(),
        visible: true,
        className: '',
      });
    },
    disableAlert: (state, action) => {
      const alertIndex = state.alerts.findIndex(
        (alert) => alert.id === action.payload,
      );
      state.alerts[alertIndex].className = 'disabled';
    },
    resetSignInError: (state) => {
      state.signInError = null;
    },
    setEditorModal: (state) => {
      state.editorModal = !state.editorModal;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    clearError: (state) => {
      state.signInError = null;
      state.signUpError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.registerLoading = true;
      state.signUpError = null;
      state.registerMessage = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload: message }) => {
      state.registerLoading = false;
      state.registerMessage = message;
    });
    builder.addCase(signUp.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.signUpError = error || null;
    });

    builder.addCase(signIn.pending, (state) => {
      state.signInLoading = true;
      state.signInError = null;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: userResponse }) => {
      state.signInLoading = false;
      const userData = userResponse.user;

      state.user = {
        ...userData,
        avatar: userData.avatar && getFilteredUrl(userData.avatar),
      };
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
      state.signInError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.signInLoading = true;
    });

    builder.addCase(
      googleLogin.fulfilled,
      (state, { payload: userResponse }) => {
        state.signInLoading = false;

        state.user = {
          ...userResponse,
          avatar: userResponse.avatar && getFilteredUrl(userResponse.avatar),
        };
      },
    );

    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
      state.signInError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });

    builder.addCase(editProfile.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(
      editProfile.fulfilled,
      (state, { payload: userResponse }) => {
        state.editLoading = false;
        const userData = userResponse.user;

        state.user = {
          ...userData,
          avatar: `${apiUrl}/${userData.avatar}`,
        };
      },
    );
    builder.addCase(editProfile.rejected, (state) => {
      state.editLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.usersLoading = false;
      state.users = payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.usersLoading = false;
    });

    builder.addCase(changeUserRole.pending, (state) => {
      state.changeRoleLoading = true;
    });

    builder.addCase(
      changeUserRole.fulfilled,
      (state, { payload: userResponse }) => {
        const userData = userResponse.user;
        state.changeRoleLoading = false;
      },
    );

    builder.addCase(changeUserRole.rejected, (state) => {
      state.changeRoleLoading = false;
      builder.addCase(editUserRole.pending, (state) => {
        state.patchLoading = true;
      });
      builder.addCase(editUserRole.fulfilled, (state, { payload }) => {
        state.patchLoading = false;
        if (state.user && state.user.username === payload.username) {
          state.user = payload;
        }
      });
      builder.addCase(editUserRole.rejected, (state) => {
        state.patchLoading = false;
      });
    });
  },
});

export const {
  addAlert,
  disableAlert,
  resetSignInError,
  setEditorModal,
  setLang,
  clearError,
} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectSignUpLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectSignUpError = (state: RootState) => state.users.signUpError;
export const selectSignInLoading = (state: RootState) =>
  state.users.signInLoading;
export const selectSignInError = (state: RootState) => state.users.signInError;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logoutLoading;
export const selectAlerts = (state: RootState) => state.users.alerts;
export const selectEditorModal = (state: RootState) => state.users.editorModal;
export const selectEditLoading = (state: RootState) => state.users.editLoading;
export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) =>
  state.users.usersLoading;
export const selectChangeRoleLoading = (state: RootState) =>
  state.users.changeRoleLoading;
export const selectPatchLoading = (state: RootState) =>
  state.users.patchLoading;
export const selectRegisterMessage = (state: RootState) =>
  state.users.registerMessage;
export const selectLanguage = (state: RootState) => state.users.lang;
