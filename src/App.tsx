import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
