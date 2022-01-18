import React, { FC } from 'react';
import { IContact } from '../models';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

interface ContactProps {
  contact: IContact; // try not to use any.  
};

const ContactItem: FC<ContactProps> = ({ contact }) => {
  return (
    <Card style={{ marginRight: "20px" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {contact.name}
        </Typography>
        <Typography variant="body2" component="p">
          {contact.email}
        </Typography>
        <Typography variant="body2" component="p">
          {contact.about}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ContactItem;
