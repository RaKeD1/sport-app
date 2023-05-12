import React from 'react';
import logo from '../assets/img/ball.svg';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { useAppDispatch } from '../hooks/redux';
import { logoutAccount } from '../redux/slices/profileSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const pages = [
    {
      path: '/createtraining',
      label: 'Создать тренировку',
    },
    {
      path: '/statistics',
      label: 'Статистика',
    },
    {
      path: '/players',
      label: 'Игроки',
    },
    {
      path: '/',
      label: 'Профиль',
      fa: <FaUserAlt className='profileIcon' />,
    },
  ];
  return (
    <div className='header'>
      <nav>
        <ul className='header__nav'>
          <div className='header__logo'>
            <img src={logo} alt='logo' width='44px' />
            <div className='header__title'>
              Volley
              <br /> Ball
            </div>
          </div>
          {pages.map((page) => (
            <li key={page.path}>
              <Link to={page.path} className={location.pathname === page.path ? 'activePage' : ''}>
                {page.label} {page.fa}
              </Link>
            </li>
          ))}
          <button onClick={() => dispatch(logoutAccount())}>
            <MdExitToApp className='profileIconExit' />
          </button>
        </ul>
      </nav>
      {/* <Link
        to='/createtraining'
        className={location.pathname === '/createtraining' ? 'activePage' : ''}>
        Создать тренировку
      </Link>
      <Link to='/statistics' className={location.pathname === '/statistics' ? 'activePage' : ''}>
        {' '}
        Статистика
      </Link>
      <Link to='/players' className={location.pathname === '/players' ? 'activePage' : ''}>
        Игроки
      </Link>
      <Link className={location.pathname === '/profile' ? 'activePage' : ''} to='/profile'>
        Профиль <FaUserAlt className='profileIcon' />
      </Link> */}
    </div>
  );
};

export default Header;
