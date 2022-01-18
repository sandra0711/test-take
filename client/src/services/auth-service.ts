import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../models/';

const register = ({ email, password }: any): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/user/register', { email, password })
};

const login = async ({ email, password }: any): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/user/login', { email, password })
};

const logout = (): Promise<void> => {
  return $api.post('/user/logout')
};

export { login, register, logout };
