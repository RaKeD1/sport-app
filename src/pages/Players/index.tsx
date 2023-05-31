import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { SelectUsers, fetchUsers } from '../../redux/slices/userSlice';
import { motion } from 'framer-motion';

import styles from './players.module.scss';
import { useSelector } from 'react-redux';
import ProfileInfo from '../../components/ProfileInfo';
import Modal from '../../components/Modal';
import UpdateUser from '../../components/UpdateDataUser';

export interface PlayersInf {
  email: string;
  id_account: number;
  id_user: number;
  login: string;
  name: string;
  surname: string;
  patronimyc: string;
  phone: string;
  player: string;
  team: string;
  img: string;
}

export const columnUser = {
  email: 'Почта',
  id_account: 'ID_ACC',
  id_user: 'ID_U',
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
  const avatarSmall = true;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changePhotoModal, setChangePhotoModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isLoad, setIsLoad] = useState(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<PlayersInf | string>('');

  const dispatch = useAppDispatch();

  const users = useSelector(SelectUsers);

  const players = users.map((obj) => {
    const user = {
      ...obj,
      player: obj.surname + ' ' + obj.name + ' ' + obj.patronimyc,
    };
    return user;
  });

  const filtredPlayers = players.filter((user) => {
    return user.player.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchUsers());
    setIsLoad(false);
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
    setIsUpdate(false);
  }, [isUpdate]);

  const handleEditUser = (user: PlayersInf) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  useEffect(() => {}, [selectedUser]);
  return (
    <>
      <div className={styles.main}>
        <div className={styles.form}>
          <label>Введите ФИО игрока:</label>
          <input
            className={styles.input}
            type='text'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <motion.ul
          className={styles.container}
          variants={container}
          initial='hidden'
          animate='visible'>
          {filtredPlayers.map((player) => {
            return (
              <motion.li
                key={player.id_user}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                variants={item}>
                <ProfileInfo
                  data={player}
                  avatarSmall={avatarSmall}
                  onClickEdit={() => handleEditUser(player)} // Передаем данные пользователя в обработчик
                  onClickEditPhoto={setChangePhotoModal}
                />
              </motion.li>
            );
          })}
        </motion.ul>
        <Modal isActive={showModal} setIsActive={setShowModal}>
          <UpdateUser isUpdate={setIsUpdate} user={selectedUser} setIsActive={setShowModal} />
        </Modal>
      </div>
    </>
  );
};

export default Players;
