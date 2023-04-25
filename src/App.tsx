import { Route, Routes, useNavigate } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Registr from './pages/Registr';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import React from 'react';
import { RootState, useAppDispatch } from './redux/store';
import { checkAuth } from './redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import { Status } from './redux/slices/profileSlice';
import Loading from './components/Loading';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  const status = useSelector((state: RootState) => state.profile.status);
  console.log('status', status);

  React.useEffect(() => {
    if (isAuth) navigate('/');
    else navigate('/login');
  }, [isAuth]);

  if (status === Status.LOADING) return <Loading />;

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Profile />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registration" element={<Registr />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
