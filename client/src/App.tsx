import { FC, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import Contacts from './components/Contacts';
import { checkAuth, fetchLogout } from './store/slicers/userSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Header from './components/Header';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(state => state.user);
  console.log('это стейт из эпп', userStore);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    };
  }, [dispatch]);

  if (!userStore.isAuth) return (
    <>
      < Header title="Cтраница авторизации" />
      <h5>kkk{userStore.isAuth}</h5>
        <div>
          <AuthPage />
        </div>
      </>
  );

  return (
      <>
        <Header title="Страница контактов" />
      <div>
        <Contacts />
      </div>
      <div>
        <button className="btn blue" onClick={() => dispatch(fetchLogout())}>Выйти</button>
      </div>
      </>
  )
};

export default App;
