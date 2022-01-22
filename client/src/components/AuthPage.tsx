import React, { FC, useState } from 'react';
import { fetchRegister, fetchLogin } from '../store/slicers/userSlice';
import { Button, TextField } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const errorAuth = useAppSelector(state => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlerSignup = (email: string, password: string) => {
    dispatch(fetchRegister({ email, password }));
  };
  const handlerLogin = (email: string, password: string) => {
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <div id="auth" style={{ marginTop: "20px" }}>
      <form autoComplete="off">
        <TextField
          type='email'
          value={email}
          variant="outlined"
          onChange={e => setEmail(e.target.value)}
          placeholder='email' />
        <TextField
          style={{ marginLeft: "20px" }}
          type='password'
          value={password}
          variant="outlined"
          onChange={e => setPassword(e.target.value)}
          placeholder='password' />
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={() => handlerSignup(email, password)}>Зарегистрироваться</Button>
          <Button variant="contained" color="primary" style={{ marginLeft: "50px" }} onClick={() => handlerLogin(email, password)}>Войти</Button>
        </div>
      </form>
      {errorAuth ? <small style={{ color: "red" }}>{errorAuth}</small> : null}
    </div>
  );
}

export default AuthPage;
