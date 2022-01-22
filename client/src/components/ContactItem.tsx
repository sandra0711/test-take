import { FC, useState } from 'react';
import { IContact } from '../models';
import { Grid, Card, CardContent, Typography, CardActions, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
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
    <Grid item xs={4} md={2} style={{ marginTop: "10px" }}>
      <Card style={{ marginRight: "20px", height: "100%" }}>
        <CardContent>
        <Typography variant="h5" component="h2">
          {contact.name}
        </Typography>
          <Typography variant="body2">
          {contact.email}
        </Typography>
          <Typography variant="body1">
          {contact.about}
        </Typography>
      </CardContent>
      <CardActions>
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
              <Button onClick={() => handleEdit(contact._id)} color="primary">Сохранить изменения</Button>
              <Button onClick={handleClose} color="primary">Выйти без сохранения</Button>
            </DialogActions>
          </Dialog>
      </CardActions>
    </Card>
    </Grid >
  );
}

export default ContactItem;
