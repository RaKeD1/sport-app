import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from '../../hooks/redux';
import { SelectUsers, fetchUsers } from '../../redux/slices/userSlice';
import { motion } from 'framer-motion';

import styles from './players.module.scss';
import { useSelector } from 'react-redux';
import ProfileInfo from '../../components/ProfileInfo';
import Modal from '../../components/Modal';
import UpdateUser from '../../components/UpdateDataUser';
import UploadPhoto from '../../components/UploadPhoto';

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
  img: string;
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
  const avatarSmall = true;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changePhotoModal, setChangePhotoModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const users = useSelector(SelectUsers);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  console.log('users', users);
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
  const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const style = { backgroundColor: `${randomColor}` };
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
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];
            const style = { backgroundColor: randomColor };
            return (
              <motion.li key={player.id_user} variants={item}>
                <ProfileInfo
                  data={player}
                  avatarSmall={avatarSmall}
                  onClickEdit={setShowModal}
                  onClickEditPhoto={setChangePhotoModal}
                />
              </motion.li>
            );
          })}
        </motion.ul>
        <Modal isActive={showModal} setIsActive={setShowModal}>
          <UpdateUser setIsActive={setShowModal} />
        </Modal>
      </div>
    </>
  );
};

export default Players;
