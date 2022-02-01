require('dotenv').config();

const bcrypt = require('bcrypt');
const User = require('../model/UserModel');
const tokenService = require('./tokenService');

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error('Пользователь с таким email уже зарегистрирован');
    };
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({
      email,
      password: hashPassword,
    });
    const userDto = {
      userId: user._id,
      userEmail: user.email,
    }
    const tokens = tokenService.generateToken(userDto);
    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return {
      ...tokens,
      userDto,
    }
  };

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Пользователь с таким email не зарегистрирован');
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw new Error('Неверный пароль');
    const userId = user._id;
    const tokens = tokenService.generateToken({ userId, email: user.email });
    await tokenService.saveToken(userId, tokens.refreshToken);
    const userDto = {
      userId: user._id,
      userEmail: user.email,
    };
    console.log(userDto);
    return { ...tokens, userDto }
  };

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  };

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error('Пользователь не авторизован');
    };
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new Error('Пользователь не авторизован');
    };
    const user = await User.findById(userData.userId);
    const userDto = {
      userId: user._id,
      userEmail: user.email,
    }
    const tokens = tokenService.generateToken(userDto);
    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return {
      ...tokens,
      userDto,
    }
  };
};

module.exports = new UserService();
