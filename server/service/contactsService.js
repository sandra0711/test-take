require('dotenv').config();

const bcrypt = require('bcrypt');
const MyError = require('../exceptions/api-error');
const Contacts = require('../model/ContactsModel');

class ContactsService {
  async add(name, email, about) {
    const candidate = await Contacts.findOne({ email });
    if (candidate) {
      throw MyError.BadRequest('Контакт с таким email уже зарегистрирован');
    };
    const contact = await User.create({
      name,
      email,
      about,
    });

    return {
      contact,
    }
  };

  async edit(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw MyError.BadRequest('Пользователь с таким email не зарегистрирован');
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw MyError.BadRequest('Неверный пароль');
    const userId = user._id;
    const tokens = tokenService.generateToken({ userId, email: user.email });
    await tokenService.saveToken(userId, tokens.refreshToken);
    return { ...tokens, user }
  };

  async remove(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  };

};

module.exports = new ContactsService();
