import { Route, Routes, useNavigate } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Registr from './pages/Registr';
import Profile from './pages/Profile';
import React from 'react';
import { RootState, useAppDispatch } from './redux/store';
import { checkAuth } from './redux/slices/profileSlice';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  console.log('isAuth', isAuth);

  React.useEffect(() => {
    if (isAuth) navigate('/');
    else navigate('/login');
  }, [isAuth]);

  return (
    <div className='wrapper'>
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/registration' element={<Registr />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
