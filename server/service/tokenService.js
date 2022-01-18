require('dotenv').config();
const jwt = require('jsonwebtoken');
const Token = require('../model/TokenModel')

class TokenService {
  generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '20m' });
    return { accessToken, refreshToken }
  };

  saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await Token.create({
      user: userId,
      refreshToken,
    });
    return token;
  };

  removeToken = async (refreshToken) => {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

};

module.exports = new TokenService();
