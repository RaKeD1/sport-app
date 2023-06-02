import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { SelectUsers, fetchUsers } from '../../redux/slices/userSlice';
import { motion } from 'framer-motion';

import styles from './players.module.scss';
import { useSelector } from 'react-redux';
import ProfileInfo from '../../components/ProfileInfo';
import Modal from '../../components/Modal';
import UpdateUser from '../../components/UpdateDataUser';
import pageMotion from '../../components/pageMotion';
import { ISelectUser } from '../../models/ISelectUser';
import UserSearchBar from '../../components/UserSearchBar';
import classNames from 'classnames';
import RolesSelectBar from '../../components/RolesSelectBar';
import { Option } from '../../components/ActionModal';
import RoleService from '../../services/RoleService';

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
  hidden: {},
  visible: {
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

const roleNames = {
  USER: 'Пользователь',
  EDITOR: 'Редактор',
  ADMIN: 'Администратор',
};

export const Players = () => {
  const avatarSmall = true;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changePhotoModal, setChangePhotoModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isLoad, setIsLoad] = useState(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<PlayersInf | string>('');
  const [giveRolesModal, setGiveRolesModal] = useState<boolean>(false);
  const [collabs, setCollabs] = useState<ISelectUser[]>([]);
  const [selectPlayers, setSelectPlayers] = useState<number[]>([]);
  const [selectedRole, setSelectedRole] = useState<Option>(null);
  const [roles, setRoles] = useState<Option[]>();
  const [rolesError, setRolesError] = useState<string>(null);
  const [removeRolesModal, setRemoveRolesModal] = useState<boolean>(false);

  useEffect(() => {
    console.log('collabs', collabs);
    const players: number[] = collabs.map((obj) => obj.id_account);
    setSelectPlayers(players);
  }, [collabs]);

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

  const fetchRoles = async () => {
    try {
      const roles = await RoleService.fetchRoles();
      return roles.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    setIsLoad(false);
    fetchRoles()
      .then((res) => {
        const options = res.map((role) => {
          const option = { label: roleNames[role], value: role };
          return option;
        });
        setRoles(options);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
    setIsUpdate(false);
  }, [isUpdate]);

  const handleEditUser = (user: PlayersInf) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const giveRole = () => {
    if (selectPlayers.length !== 0 && selectedRole) {
      RoleService.giveRoles(selectedRole.value, selectPlayers)
        .then(() => {
          setGiveRolesModal(false);
          setRolesError(null);
        })
        .catch((err) =>
          setRolesError(
            err.response.data.message ? err.response.data.message : 'Не удалось выдать роль',
          ),
        );
    }
  };

  useEffect(() => {}, [selectedUser]);
  return (
    <motion.div variants={pageMotion} initial='hidden' animate='show' exit='exit'>
      <div className={styles.main}>
        <div className={styles.form}>
          <label>Введите ФИО игрока:</label>
          <div className={styles.form__box}>
            <input
              className={styles.input}
              type='text'
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <button onClick={() => setGiveRolesModal(true)} className={styles.form__roleBtn}>
              Выдать роль
            </button>
            <button
              onClick={() => setRemoveRolesModal(true)}
              className={classNames(styles.form__roleBtn, styles.form__roleBtn_remove)}>
              Забрать роль
            </button>
          </div>
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
                  inRow={false}
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
        <Modal isActive={giveRolesModal} setIsActive={setGiveRolesModal}>
          <div className={styles.addModal}>
            <h2 className={styles.addModal__title}>Выдача роли</h2>
            {rolesError && <div>{rolesError}</div>}
            <UserSearchBar setCollabs={setCollabs} isMulti={true} isClearable={false} />
            <div className={styles.addModal__separator}></div>
            <RolesSelectBar
              setSelected={setSelectedRole}
              disabled={selectPlayers.length === 0}
              isMulti={false}
              isClearable={false}
              placeholder={'Выберите роль'}
              emptyMessage={'Роли не найдены'}
              options={roles}
            />
            <button
              className={classNames(styles.addModal__button, {
                [styles.addModal__button_disabled]: selectPlayers.length === 0 || !selectedRole,
              })}
              onClick={(e) => {
                e.preventDefault();
                giveRole();
              }}>
              Добавить
            </button>
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Players;
