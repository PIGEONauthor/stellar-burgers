import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from '@api';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => {
    const response = await updateUserApi(data);
    return response;
  }
);

type TUserState = {
  success: boolean;
  user: TUser;
  error: string | null;
};

const initialState: TUserState = {
  success: false,
  user: {
    email: '',
    name: ''
    // pass: Funtic1991
  },
  error: ''
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message!;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message!;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      });
  }
});

export const userReducer = UserSlice.reducer;
export const { logOut } = UserSlice.actions;
