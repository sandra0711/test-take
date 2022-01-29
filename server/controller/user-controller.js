require('dotenv').config();
const userService = require('../service/userService');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 10000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e.message);
    }
  };

  async login(req, res, next) {
    console.log('вхожу');
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 10000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e.message);
    }
  };

  async logout(req, res, next) {
    console.log('выхожу');
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e.message);
    }
  };

  async activate(req, res, next) {
    try {
      const link = req.params.link;
      userService.activate(link);
      res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e.message);
    }
  };

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 10000000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e.message);
    }
  };
};

module.exports = new UserController();
