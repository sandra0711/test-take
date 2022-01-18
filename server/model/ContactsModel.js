const { Schema, model } = require('mongoose');

const ContactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  about: { type: String },
});

module.exports = model('Contacts', ContactsSchema);
