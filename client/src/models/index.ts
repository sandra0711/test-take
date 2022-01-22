interface IUser {
  id: string;
  email: string;
};

export interface IContact {
  _id: string;
  name: string;
  email: string;
  about: string;
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser
};

export interface UserState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
};

export interface ContactsState {
  contacts: IContact[];
  isLoading: boolean;
};

export interface ContactResponse {
  contact: IContact;
}
