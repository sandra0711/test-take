import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ContactsState } from '../../models';
import { add, edit, remove, getAllContacts } from '../../services/contacts-service';

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
};

const API_URL = 'http://localhost:5000';

export const fetchAdd = createAsyncThunk(
  'contact/add',
  async ({ email, password }: any) => {
    try {
      const response = await add({ email, password });

      return response.data.user;
    } catch (e: any) {
      throw new Error('это ошибка из функции регистрации');
    }
  });

export const fetchGetAllContacts = createAsyncThunk(
  'contact/allContacts',
  async () => {
    try {
      const response = await getAllContacts();
      return response.data;
    } catch (e: any) {
      throw new Error('это ошибка из функции регистрации');
    }
  });


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetAllContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      console.log(state.contacts);
      state.isLoading = false;
    });
    builder.addCase(fetchGetAllContacts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });

  },

});

export default contactsSlice.reducer;
