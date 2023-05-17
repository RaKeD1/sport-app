import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from '../../hooks/redux';
import { fetchUsers } from '../../redux/slices/userSlice';

import styles from './players.module.scss';
import AccordionPlayers from '../../components/AccardionPlayers';
import { FaSearch } from 'react-icons/fa';

export const Players: FC = () => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.usersReducer);
  React.useEffect(() => {
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

  // const inputClickHandler = () => {
  //   setIsOpen(true);
  // };
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    // Получение данных
    setIsLoad(false);
  }, []);
  return (
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
      {filtredPlayers.map((obj) => (
        <AccordionPlayers key={obj.id_user} {...obj} />
      ))}
    </div>
  );
};

export default Players;
