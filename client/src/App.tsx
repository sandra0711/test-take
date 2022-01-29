import React, { FC, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import Contacts from './components/Contacts';
import { checkAuth, fetchLogout } from './store/slicers/userSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Header from './components/Header';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    };
  }, [dispatch]);

  if (!userState.isAuth) {
    console.log(userState.isAuth);
    return (
      <>
        <Header title="Cтраница авторизации" />
        <div>
          <AuthPage />
        </div>
      </>
    );
  } else {
    console.log(userState.isAuth);
    return (
      <>
        <Header title="Страница контактов" />
        <Contacts />
        <button className="btn blue" onClick={() => dispatch(fetchLogout())}>Выйти</button>
      </>
    );
  };
};

export default App;
