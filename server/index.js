require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

const userRouter = require('./routes/userRoute');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', userRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => console.log('Подключились к базе данных'));
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
};

start();
