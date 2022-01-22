require('dotenv').config();
const contactsService = require('../service/contactsService');
const Contacts = require('../model/ContactsModel');

class ContactsController {
  async add(req, res, next) {
    try {
      const { name, email, about } = req.body;
      const contact = await contactsService.add(name, email, about);
      return res.json(contact);
    } catch (e) {
      next(e);
    }
  };

  async edit(req, res, next) {
    try {
      const { contactId, name, email, about } = req.body;
      const contact = await contactsService.edit(contactId, name, email, about);
      return res.json({ contact });
    } catch (e) {
      next(e);
    }
  };

  async delete(req, res, next) {
    try {
      const id = req.body.id;
      const deleteContact = await contactsService.delete(id);
      return res.json(deleteContact);
    } catch (e) {
      next(e);
    }
  };

  async getAllContacts(req, res, next) {
    try {
      const contacts = await Contacts.find();
      return res.json(contacts);
    } catch (e) {
      next(e);
    }
  };

};

module.exports = new ContactsController();
