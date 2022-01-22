const { Schema, model } = require('mongoose');

const ContactsSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  about: { type: String },
});

module.exports = model('Contacts', ContactsSchema);
