require('dotenv').config();

const Contacts = require('../model/ContactsModel');

class ContactsService {
  async add(name, email, about) {
    const candidate = await Contacts.findOne({ email });
    if (candidate) {
      throw new Error('Контакт с таким email уже зарегистрирован');
    };
    const contact = await Contacts.create({
      name,
      email,
      about,
    });

    return {
      contact,
    }
  };

  async edit(contactId, name, email, about) {
    const contact = await Contacts.findById(contactId);
    contact.name = name;
    contact.email = email;
    contact.about = about;
    await contact.save();
    return contact
  };

  async delete(contactId) {
    const removeContact = await Contacts.deleteOne({ _id: contactId });
    return removeContact;
  };

};

module.exports = new ContactsService();
