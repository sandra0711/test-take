import { Button, Container } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchGetAllContacts } from '../store/slicers/contactsSlice';
import ContactItem from './ContactItem';

const Contacts: FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, isLoading } = useAppSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchGetAllContacts());
  }, [dispatch]);

  return (
    <Container style={{ display: "flex", marginTop: "20px" }}>
      {contacts && contacts.map(contact => {
        return (
          <ContactItem contact={contact} key={Math.random()} />
        )
      })}
      <Button>Добавить контакт</Button>
    </Container >

  );
}

export default Contacts;
