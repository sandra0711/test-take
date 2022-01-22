import { AxiosResponse } from 'axios';
import $api from '../http';
import { IContact, ContactResponse } from '../models';

const add = ({ name, email, about }: any): Promise<AxiosResponse<ContactResponse>> => {
  return $api.post<ContactResponse>('/contacts/add', { name, email, about })
};

const edit = async (contactId: string, name: string, email: string, about: string): Promise<AxiosResponse<ContactResponse>> => {
  return $api.post<ContactResponse>('/contacts/edit', { contactId, name, email, about })
};

const remove = (id: string): Promise<AxiosResponse<string>> => {
  return $api.post<string>('/contacts/delete', { id })
};

const getAllContacts = (): Promise<AxiosResponse> => {
  return $api.get<IContact[]>('/contacts/allContacts');
};

export { add, edit, remove, getAllContacts };
