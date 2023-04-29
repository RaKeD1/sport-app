import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  console.log('isAuth', isAuth);
  const status = useSelector((state: RootState) => state.profile.status);
  console.log('status', status);
  let location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      dispatch(checkAuth());
    }
  }, []);

  React.useEffect(() => {
    console.log(window.location.pathname);
    if (
      isAuth &&
      (window.location.pathname === '/login' || window.location.pathname === '/registration')
    ) {
      console.log('NAVIGATE /');
      navigate('/');
    } else if (
      !isAuth &&
      isAuth != null &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/registration'
    ) {
      console.log('NAVIGATE /login');
      navigate('/login');
    } else if (isAuth === null) {
      console.log('isAuth === null NAVIGATE /login');
      navigate('/login');
    }
  }, [isAuth]);

  if (status === Status.LOADING) return <Loading />;

  if (!isAuth) {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/registration" element={<Registr />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Profile />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
