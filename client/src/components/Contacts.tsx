import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAdd, fetchGetAllContacts } from '../store/slicers/contactsSlice';
import ContactItem from './ContactItem';

const Contacts: FC = () => {
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector(state => state.contacts);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');

  const handleAdd = (name: string, email: string, about: string) => {
    dispatch(fetchAdd({ name, email, about }));
    handleClose();
    setName('');
    setEmail('');
    setAbout('')
  };

  // modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
// end modal

  useEffect(() => {
    dispatch(fetchGetAllContacts());
  }, [dispatch]);

  return (
    <div className='row'>
      {contacts && contacts.map(contact => {
        return (
          <ContactItem contact={contact} key={Math.random()} />
        )
      })}
      <button className="btn blue" onClick={handleClickOpen}>Добавить контакт</button>
      {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Новый контакт</DialogTitle>
        <DialogContent>
          <TextField value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: "20px" }} autoFocus label="name"></TextField>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="email"></TextField>
          <TextField value={about} onChange={(e) => setAbout(e.target.value)} style={{ marginTop: "10px" }} label="about" fullWidth></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAdd(name, email, about)} color="primary">Сохранить</Button>
          <Button onClick={handleClose} color="primary">Выйти без сохранения</Button>
        </DialogActions>
      </Dialog> */}
    </div >
  );
}

export default Contacts;
