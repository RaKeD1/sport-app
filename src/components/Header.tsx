import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
//import logo from '../assets/img/ball.svg';
import logo from '../assets/img/Logo_VolleyBall.png';
import { FaUserAlt } from 'react-icons/fa';
import Hamburger from './Hamburger';
import { motion } from 'framer-motion';
import { delay } from '@reduxjs/toolkit/dist/utils';

const Header: FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrolled = scrollPosition > 100;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header
      className={`header `}
      style={{ backgroundColor: isScrolled ? 'transparent' : '#fff' }}
    >
      <motion.nav className='container'>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isScrolled ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to='/profile' className='header__logo'>
            <img src={logo} alt='logo' width='44px' />
            <div className='header__title'>
              Volley
              <br /> Ball
            </div>
          </Link>
        </motion.div>
      </motion.nav>
      <motion.div
        initial={{
          position: 'fixed',
          top: '0px',
          width: '100%',
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          position: 'fixed',
          y: isScrolled ? 0 : -10,
        }}
        transition={{ duration: 0.3 }}
        className={isScrolled ? ' header__scrolled ' : ''}
      >
        <div className='container'>
          <Link to='/profile' className='header__logo'>
            <motion.img
              animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 0 }}
              transition={{ duration: 0, delay: 0 }}
              src={logo}
              alt='logo'
              width='44px'
            />
            <div className='header__title'>
              Volley
              <br /> Ball
            </div>
          </Link>
        </div>
      </motion.div>
      <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
    </header>
  );
};

export default Header;
