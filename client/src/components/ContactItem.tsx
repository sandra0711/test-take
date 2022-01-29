import { FC, useState } from 'react';
import { IContact } from '../models';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { useAppDispatch } from '../hooks/redux';
import { fetchEdit, fetchDelete } from '../store/slicers/contactsSlice';


interface ContactProps {
  contact: IContact; // try not to use any.  
};

const ContactItem: FC<ContactProps> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [about, setAbout] = useState(contact.about);
  // modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // end modal

  const handleEdit = (_id: string) => {
    dispatch(fetchEdit({ _id, name, email, about }));
    handleClose();
  };

  return (
    <div className="col s6 m4">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <h5>
            {contact.name}
          </h5>
          <p>
            {contact.email}
          </p>
          <p>
            {contact.about}
          </p>
        </div>
        <div className="card-action">

          {/* так вставляем иконки */}
          {/* <i class="material-icons prefix">mode_edit</i> */}

          <IconButton aria-label="delete" onClick={() => dispatch(fetchDelete(contact._id))}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Изменение контакта</DialogTitle>
            <DialogContent>
              <TextField value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: "20px" }} autoFocus label="name"></TextField>
              <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="email"></TextField>
              <TextField value={about} onChange={(e) => setAbout(e.target.value)} style={{ marginTop: "10px" }} label="about" fullWidth></TextField>
            </DialogContent>
            <DialogActions>
              <button className="btn" onClick={() => handleEdit(contact._id)} color="blue">Сохранить изменения</button>
              <button className="btn" onClick={handleClose} color="blue">Выйти без сохранения</button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
