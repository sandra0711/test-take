require('dotenv').config();
const { validationResult } = require('express-validator');
const contactsService = require('../service/contactsService');
const MyError = require('../exceptions/api-error');
const Contacts = require('../model/ContactsModel');

class ContactsController {
  async add(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(MyError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { name, email, about } = req.body;
      const contact = await contactsService.add(name, email, about);
      return res.json(contact);
    } catch (e) {
      next(e);
    }
  };

  async edit(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 10000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  async remove(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
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
