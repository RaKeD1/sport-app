import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../assets/img/ball.svg';
import { FaUserAlt } from 'react-icons/fa';
import Hamburger from './Humburger';

const Header: React.FC = () => {
  return (
    <div className='header'>
      <nav className='container'>
        <div className='header__logo'>
          <img src={logo} alt='logo' width='44px' />
          <div className='header__title'>
            Volley
            <br /> Ball
          </div>
        </div>
      </nav>
      <Hamburger />
    </div>
  );
};

export default Header;
