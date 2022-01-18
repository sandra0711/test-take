import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse, IContact } from '../models';

const add = ({ email, password }: any): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/user/register', { email, password })
};

const edit = async ({ email, password }: any): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/user/login', { email, password })
};

const remove = (): Promise<void> => {
  return $api.post('/user/logout')
};

const getAllContacts = (): Promise<AxiosResponse> => {
  return $api.get<IContact[]>('/contacts/allContacts');
};

export { add, edit, remove, getAllContacts };
