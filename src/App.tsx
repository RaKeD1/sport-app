import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import Login from './pages/Login';
import Registr from './pages/Registr';
import Profile from './pages/Profile';
import TrainingEdit from './pages/TrainingEdit';
import React from 'react';
import { RootState, useAppDispatch } from './redux/store';
import { SelectUserRole, checkAuth } from './redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import { Status } from './redux/slices/profileSlice';
import CreateTrain from './components/CreateTrain';
import Players from './pages/Players';
import NotFound from './pages/NotFound/NotFound';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Statistics from './pages/Statistics';
import Footer from './components/Footer';

function App() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.profile.status);
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  if (status === Status.LOADING) return <LoadingSpinner />;

  return (
    <>
      <div className='page'>
        {isAuth && <Header />}
        <div className='container'>
          <div className='content'>
            <Routes>
              <Route
                path='/login'
                element={
                  <RequireNotAuth redirectTo='/'>
                    <Login />
                  </RequireNotAuth>
                }></Route>
              <Route
                path='/registration'
                element={
                  <RequireNotAuth redirectTo='/'>
                    <Registr />
                  </RequireNotAuth>
                }></Route>
              <Route
                path='/'
                element={
                  <RequireAuth redirectTo='/login'>
                    <Profile />
                  </RequireAuth>
                }></Route>
              <Route
                path='/profile'
                element={
                  <RequireAuth redirectTo='/login'>
                    <Profile />
                  </RequireAuth>
                }></Route>
              <Route
                path='/createtraining'
                element={
                  <RequireAuth redirectTo='/login'>
                    <RequireEditor redirectTo='/profile'>
                      <CreateTrain />
                    </RequireEditor>
                  </RequireAuth>
                }></Route>
              <Route
                path='/training'
                element={
                  <RequireAuth redirectTo='/login'>
                    <RequireEditor redirectTo='/profile'>
                      <TrainingEdit />
                    </RequireEditor>
                  </RequireAuth>
                }></Route>
              <Route
                path='/statistics'
                element={
                  <RequireAuth redirectTo='/login'>
                    <RequireEditor redirectTo='/profile'>
                      <Statistics />
                    </RequireEditor>
                  </RequireAuth>
                }></Route>
              <Route
                path='/players'
                element={
                  <RequireAuth redirectTo='/login'>
                    <RequireAdmin redirectTo='/profile'>
                      <Players />
                    </RequireAdmin>
                  </RequireAuth>
                }></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      {isAuth && <Footer />}
    </>
  );
}

function RequireAuth({ children, redirectTo }) {
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  console.log('isAuth', isAuth);
  return isAuth ? children : <Navigate to={redirectTo} />;
}

function RequireNotAuth({ children, redirectTo }) {
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  console.log('isAuth', isAuth);
  return !isAuth ? children : <Navigate to={redirectTo} />;
}

function RequireEditor({ children, redirectTo }) {
  const role = useSelector(SelectUserRole);
  console.log('role', role);
  if (role !== 'EDITOR' && role !== 'ADMIN') alert('Нет прав доступа!');
  return role === 'EDITOR' || role === 'ADMIN' ? children : <Navigate to={redirectTo} />;
}

function RequireAdmin({ children, redirectTo }) {
  const role = useSelector(SelectUserRole);
  console.log('role', role);
  if (role !== 'ADMIN') alert('Нет прав доступа!');
  return role === 'ADMIN' ? children : <Navigate to={redirectTo} />;
}

export default App;
