import { FC, useState } from 'react';
import validator from 'validator'
import { fetchRegister, fetchLogin } from '../store/slicers/userSlice';
import { Button, TextField } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const errorAuth = useAppSelector(state => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);

  const validateEmail = (e: any) => {
    const email = e.target.value;
    if (validator.isEmail(email)) {
      setIsValidateEmail(true);
      setEmailError('');
      setEmail(e.target.value);
    } else {
      setIsValidateEmail(false);
      setEmailError('Введите правильный email!');
      setEmail(e.target.value);
    };
  };

  const validatePassword = (e: any) => {
    const password = e.target.value;
    if (validator.isLength(password, { min: 6 })) {
      setIsValidatePassword(true);
      setPasswordError('');
      setPassword(e.target.value);
    } else {
      setIsValidatePassword(false);
      setPasswordError('Пароль должен содержать не менее 6 символов!');
      setPassword(e.target.value);
    };
  };

  const handlerSignup = (email: string, password: string) => {
    dispatch(fetchRegister({ email, password }));
  };
  const handlerLogin = (email: string, password: string) => {
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <div id="auth" style={{ marginTop: "20px" }}>
      <form autoComplete="off">
        {emailError ? <><small style={{ color: "red" }}>{emailError}</small><br /></> : null}
        {passwordError ? <><small style={{ color: "red" }}>{passwordError}</small><br /></> : null}
        <TextField
          type='email'
          value={email}
          variant="outlined"
          onChange={e => validateEmail(e)}
          placeholder='email' />
        <TextField
          style={{ marginLeft: "20px" }}
          type='password'
          value={password}
          variant="outlined"
          onChange={e => validatePassword(e)}
          placeholder='password' />
        <div style={{ marginTop: "20px" }}>
          <Button disabled={!(isValidateEmail && isValidatePassword)} variant="contained" color="primary" onClick={() => handlerSignup(email, password)}>Зарегистрироваться</Button>
          <Button disabled={!(isValidateEmail && isValidatePassword)} variant="contained" color="primary" style={{ marginLeft: "50px" }} onClick={() => handlerLogin(email, password)}>Войти</Button>
        </div>
      </form>
      {errorAuth ? <small style={{ color: "red" }}>{errorAuth}</small> : null}
    </div>
  );
}

export default AuthPage;
