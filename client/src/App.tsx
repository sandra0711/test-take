import React, { FC, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import Contacts from './components/Contacts';
import { checkAuth, fetchLogout } from './store/slicers/userSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Header from './components/Header';
import { Button } from '@material-ui/core';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth);
    };
  }, [dispatch]);

  if (!userState.isAuth) {
    return (
      <>
        <Header title="Cтраница авторизации" />
        <div>
          <AuthPage />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header title="Страница контактов" />
        <Contacts />
        <Button style={{ margin: "20px" }} variant="contained" color="primary" onClick={() => dispatch(fetchLogout())}>Выйти</Button>
      </>
    );
  };
};

export default App;
