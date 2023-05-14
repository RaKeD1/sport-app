import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import logo from '../assets/img/ball.svg';
import { FaUserAlt } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';

import { useAppDispatch } from '../hooks/redux';
import { logoutAccount } from '../redux/slices/profileSlice';

const Header: React.FC = () => {
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
    </div>
  );
};

export default Header;
