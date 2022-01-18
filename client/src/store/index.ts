import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slicers/userSlice';
import contactsReducer from './slicers/contactsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
