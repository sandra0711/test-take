import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthResponse, UserState } from '../../models';
import { login, register, logout } from '../../services/auth-service';

const initialState: UserState = {
  user: {
    email: '',
    id: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
};

const API_URL = 'http://localhost:5000';

export const fetchRegister = createAsyncThunk(
  'user/register',
  async ({ email, password }: any) => {
    try {
      const response = await register({ email, password });
      localStorage.setItem('token', response.data.accessToken);
      return response.data.userDto;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  });

export const fetchLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: any) => {
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.accessToken);
      return response.data.userDto;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  });

export const fetchLogout = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      localStorage.removeItem('token');
      await logout();

    } catch (e: any) {
      throw new Error('это ошибка из функции logout');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    console.log('zzzzzzz');

    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);

      return response.data.userDto;
    } catch (e: any) {
      throw new Error('Пользователь не авторизован');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isAuth = true;
      state.error = '';
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isLoading = false;
      const message = /(?<=<[p][r][e]>)([\s\S]*?)(?=<\/[p][r][e]>)/g;
      state.error = action.error?.message?.match(message);
      console.log(state.error);

    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.error = '';
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      const message = /(?<=<[p][r][e]>)([\s\S]*?)(?=<\/[p][r][e]>)/g;
      state.error = action.error?.message?.match(message)
      state.isLoading = false;
    });

    builder.addCase(fetchLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.isAuth = false;
      state.user = {
        email: '',
        id: '',
      };
      state.isLoading = false;
    });
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });
  },

});

export default userSlice.reducer;
