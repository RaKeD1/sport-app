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
    height: '100%',
    overflow: 'visible',
    display: 'block',
    pointerEvents: 'auto' as const,
  },
  closed: {
    transition: {
      delay: 0.2,
      staggerChildren: 0.07,
      staggerDirection: -99,
      delayChildren: 0.21,
    },
    height: '5%',
    zIndex: 100,
    display: 'none',
    overflow: 'hidden',

    // pointerEvents: 'none' as const,
    // display: 'none',
  },
};
const variants2 = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -500 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      delay: 0.01,
      y: { stiffness: 200, velocity: -1000 },
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
  { data: 0, path: '/', label: 'Профиль' },
];

export const Navigation = ({ setIsOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <motion.ul className={styles.ul} variants={variants}>
      {pages.map((page) => (
        <MenuItem setIsOpen={setIsOpen} page={page} key={page.path} />
      ))}
      <motion.button
        className={styles.button__exit}
        onClick={() => dispatch(logoutAccount())}
        variants={variants2}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        Выйти
      </motion.button>
    </motion.ul>
  );
};
