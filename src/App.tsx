import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Registr from './pages/Registr';

function App() {
  return (
    <div className='wrapper'>
      {/* <Header /> */}
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Registr />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/registration' element={<Registr />}></Route>
            <Route path='/profile' element={<Registr />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
