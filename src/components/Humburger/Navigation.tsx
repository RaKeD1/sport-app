import * as React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { FaUserAlt } from 'react-icons/fa';
import styles from './humburger.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { logoutAccount } from '../../redux/slices/profileSlice';
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    zIndex: 100,
    overflow: 'visible',
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    zIndex: -990,
    overflow: 'hidden',
  },
};
const variants2 = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -200 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const pages = [
  {
    data: 3, // так же является порядковым номеров в бургере
    path: '/createtraining',
    label: 'Создать тренировку',
  },
  { data: 4, path: '/training', label: 'Редактировать тренировку' },
  { data: 2, path: '/statistics', label: 'Посмотреть статистику' },
  { data: 1, path: '/players', label: 'Игроки' },
  { data: 0, path: '/', label: 'Профиль', fa: <FaUserAlt className='profileIcon' /> },
];

export const Navigation = () => {
  const dispatch = useAppDispatch();
  return (
    <motion.ul className={styles.ul} variants={variants}>
      {pages.map((page) => (
        <MenuItem page={page} key={page.path} />
      ))}
      <div className='buttons__user'>
        <motion.button
          onClick={() => dispatch(logoutAccount())}
          variants={variants2}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}>
          Выйти
        </motion.button>
      </div>
    </motion.ul>
  );
};
