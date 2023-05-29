import { Route, Routes, useNavigate } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import Login from './pages/Login';
import Registr from './pages/Registr';
import Profile from './pages/Profile';
import TrainingEdit from './pages/TrainingEdit';
import React from 'react';
import { RootState, useAppDispatch } from './redux/store';
import { checkAuth } from './redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import { Status } from './redux/slices/profileSlice';
import CreateTrain from './components/CreateTrain';
import Players from './pages/Players';
import UpdateUser from './components/UpdateDataUser';
import NotFound from './pages/NotFound/NotFound';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Statistics from './pages/Statistics';
import Humburger from './components/Humburger';
import Hamburger from './components/Humburger';
import Footer from './components/Footer';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  console.log('isAuth', isAuth);
  const status = useSelector((state: RootState) => state.profile.status);
  console.log('status', status);

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

  if (status === Status.LOADING) return <LoadingSpinner />;

  if (!isAuth) {
    return (
      <div className='wrapper'>
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/registration' element={<Registr />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='container'>
        <Hamburger />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Profile />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/createtraining' element={<CreateTrain />}></Route>
            <Route path='/training' element={<TrainingEdit />}></Route>
            <Route path='/statistics' element={<Statistics />}></Route>
            <Route path='/players' element={<Players />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
      <Footer/>
    </>
  );
}
export default App;
