import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactsState } from '../../models';
import { add, edit, remove, getAllContacts } from '../../services/contacts-service';
import { IContact } from '../../models';

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
};

export const fetchDelete = createAsyncThunk(
  'contact/delete',
  async (id: string) => {
    try {
      await remove(id);
      return id;
    } catch (e: any) {
      throw new Error('это ошибка из функции удаления контакта');
    }
  }
);

export const fetchAdd = createAsyncThunk(
  'contact/add',
  async ({ name, email, about }: any) => {
    try {
      const response = await add({ name, email, about });
      return response.data.contact;
    } catch (e: any) {
      throw new Error('это ошибка из функции добавления контакта');
    }
  }
);

export const fetchEdit = createAsyncThunk(
  'contact/edit',
  async ({ _id, name, email, about }: IContact) => {
    try {
      const response = await edit(_id, name, email, about);
      return response.data.contact;
    } catch (e: any) {
      throw new Error('это ошибка из функции добавления контакта');
    }
  }
);

export const fetchGetAllContacts = createAsyncThunk(
  'contact/allContacts',
  async () => {
    try {
      const response = await getAllContacts();
      return response.data;
    } catch (e: any) {
      throw new Error('это ошибка из функции получения всех контактов');
    }
  });

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAdd.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdd.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(fetchAdd.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });

    builder.addCase(fetchEdit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEdit.fulfilled, (state, action) => {
      console.log(state);

      state.contacts.map(el => {
        if (el._id === action.payload._id) {
          el.name = action.payload.name;
          el.email = action.payload.email;
          el.about = action.payload.about;
        };
        return el;
      })
      state.isLoading = false;
    });
    builder.addCase(fetchEdit.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });

    builder.addCase(fetchDelete.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDelete.fulfilled, (state, action) => {
      const index = state.contacts.findIndex(el => el._id === action.payload);
      state.contacts.splice(index, 1);
      state.isLoading = false;
    });
    builder.addCase(fetchDelete.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });

    builder.addCase(fetchGetAllContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchGetAllContacts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error?.message);
    });

  },

});

export default contactsSlice.reducer;
