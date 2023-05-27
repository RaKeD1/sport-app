import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from '../../hooks/redux';
import { SelectUsers, fetchUsers } from '../../redux/slices/userSlice';
import { motion } from 'framer-motion';

import styles from './players.module.scss';
import { useSelector } from 'react-redux';

export interface PlayersInf {
  email: string;
  id_account: string;
  login: string;
  name: string;
  surname: string;
  patronimyc: string;
  phone: string;
  player: string;
  team: string;
}

export const columnUser = {
  email: 'Почта',
  id_account: 'ID_ACC',
  login: 'Логин',
  name: 'Имя',
  surname: 'Фамилия',
  patronimyc: 'Отчество',
  phone: 'Телефон',
  player: 'ФИО',
  team: 'Группа',
};
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const Players = () => {
  const dispatch = useAppDispatch();

  const users = useSelector(SelectUsers);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const players = users.map((obj) => {
    const user = {
      ...obj,
      player: obj.surname + ' ' + obj.name + ' ' + obj.patronimyc,
    };
    return user;
  });
  const [value, setValue] = useState('');
  const filtredPlayers = players.filter((user) => {
    return user.player.toLowerCase().includes(value.toLowerCase());
  });
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(false);
  }, []);
  return (
    <>
      <div className={styles.main}>
        <form className={styles.form}>
          <label>Введите ФИО игрока:</label>
          <input
            className={styles.input}
            type='text'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
        <motion.ul
          className={styles.container}
          variants={container}
          initial='hidden'
          animate='visible'>
          {filtredPlayers.map((player) => (
            <motion.li key={player.id_user} className={styles.item} variants={item}>
              <div className={styles.item__title}>{player.player}</div>
              <div className={styles.item__box}>
                {Object.entries(player)
                  .filter(
                    (arr) =>
                      arr[0] === 'email' ||
                      arr[0] === 'login' ||
                      arr[0] === 'name' ||
                      arr[0] === 'surname' ||
                      arr[0] === 'patronimyc' ||
                      arr[0] === 'phone',
                  )
                  .map((arr) => {
                    const num = arr[1].toString();
                    return (
                      <div className={styles.item__text}>
                        <p className={styles.item__text_title}>{columnUser[arr[0]]}:</p>
                        <p className={styles.item__text_text}>{num}</p>
                      </div>
                    );
                  })}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </>
  );
};

export default Players;
