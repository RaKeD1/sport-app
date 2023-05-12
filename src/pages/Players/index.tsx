import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { fetchUsers } from '../../redux/slices/userSlice';
import styles from './players.module.scss';
import AccordionPlayers from '../../components/AccardionPlayers';

export const Players: FC = () => {
  const dispatch = useAppDispatch();

  const { users, isLoading, status } = useAppSelector((state) => state.usersReducer);
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const players = users.map((obj) => {
    const users = {
      ...obj,
      player: obj.surname + ' ' + obj.name + ' ' + obj.patronimyc,
    };
    return users;
  });
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState('');
  const filtredPlayers = players.filter((users) => {
    console.log(users.player.toLowerCase());
    return users.player.toLowerCase().includes(value.toLowerCase());
  });

  const itemClickHandler = (e) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };
  const inputClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <label>Введите ФИО игрока:</label>
        <input
          className={styles.input}
          type='text'
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onClick={inputClickHandler}
        />
        <ul className={styles.autocomplete}>
          {value && isOpen
            ? filtredPlayers.map((obj) => {
                return (
                  <li className={styles.autocomplete__item} onClick={itemClickHandler}>
                    {obj.player}
                  </li>
                );
              })
            : null}
        </ul>
      </form>
      {filtredPlayers.map((obj) => (
        <AccordionPlayers key={obj.id_user} {...obj} />
      ))}
    </div>
  );
};

export default Players;
