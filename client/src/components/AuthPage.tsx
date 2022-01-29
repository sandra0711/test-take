import { FC, useState } from 'react';
import validator from 'validator'
import { fetchRegister, fetchLogin } from '../store/slicers/userSlice';
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
    <div className="row">
      <form className="col s12">
        <div className="row">
        {emailError ? <><small style={{ color: "red" }}>{emailError}</small><br /></> : null}
        {passwordError ? <><small style={{ color: "red" }}>{passwordError}</small><br /></> : null}
          <div className="input-field col s4 offset-s2">
            <input
              type='email'
              value={email}
              onChange={e => validateEmail(e)}
              id='email'
              className="validate"
            />
            <label htmlFor="email">email</label>
          </div>
          <div className="input-field col s4">
            <input
              type='password'
              value={password}
              onChange={e => validatePassword(e)}
              id='password'
            />
            <label htmlFor="password">password</label>
          </div>
        </div>
        <div className="row">
          <div className="col s2 offset-s4">
            <button className="btn blue" disabled={!(isValidateEmail && isValidatePassword)} onClick={() => handlerSignup(email, password)}>Зарегистрироваться</button>
          </div>
          <div className="col s2">
            <button className="btn blue" disabled={!(isValidateEmail && isValidatePassword)} onClick={() => handlerLogin(email, password)}>Войти</button>
          </div>
        </div>
      </form>
      {errorAuth ? <small style={{ color: "red" }}>{errorAuth}</small> : null}
    </div>
  );
}

export default AuthPage;
