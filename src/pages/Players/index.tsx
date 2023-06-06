import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import {
  SelectInfoUsers,
  SelectUsers,
  fetchUsers,
  giveRoleUsers,
  removeRoleUsers,
} from '../../redux/slices/userSlice';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './players.module.scss';
import { useSelector } from 'react-redux';
import ProfileInfo from '../../components/ProfileInfo';
import Modal from '../../components/Modal';
import UpdateUser from '../../components/UpdateDataUser';
import pageMotion from '../../components/pageMotion';
import { ISelectUser } from '../../models/ISelectUser';
import UserSearchBar from '../../components/UserSearchBar';
import classNames from 'classnames';
import SelectBar from '../../components/SelectBar';
import { Option } from '../../components/SelectBar';
import RoleService from '../../services/RoleService';
import { SelectUserID } from '../../redux/slices/profileSlice';
import UserService from '../../services/UserService';
import { IUser } from '../../models/IUser';
import Pagination from '../../components/Pagination';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

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

export interface UsersFetch {
  count: number;
  users: IUser[];
}

export const Players = () => {
  const avatarSmall = true;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [changePhotoModal, setChangePhotoModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isLoad, setIsLoad] = useState(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<PlayersInf | string>('');
  // Модальные окна ролей
  const [giveRolesModal, setGiveRolesModal] = useState<boolean>(false);
  const [collabs, setCollabs] = useState<ISelectUser[]>([]);
  const [selectPlayers, setSelectPlayers] = useState<number[]>([]);
  const [selectedRole, setSelectedRole] = useState<Option>(null);
  const [roles, setRoles] = useState<Option[]>();
  const [rolesError, setRolesError] = useState<string>(null);
  const [removeRolesModal, setRemoveRolesModal] = useState<boolean>(false);
  // Стейты для пагинации
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const limitVariants = [8, 12, 16];

  useEffect(() => {
    console.log('collabs', collabs);
    const players: number[] = collabs.map((obj) => obj.id_account);
    setSelectPlayers(players);
  }, [collabs]);

  const dispatch = useAppDispatch();

  const users = useSelector(SelectInfoUsers);
  const players = users.users.map((obj) => {
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
    dispatch(fetchUsers({ page, limit }));
  }, [page, limit]);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {}, [selectedUser]);

  const handleEditUser = (user: PlayersInf) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const giveRole = () => {
    if (selectPlayers.length !== 0 && selectedRole) {
      dispatch(
        giveRoleUsers({
          role: selectedRole.value,
          users: selectPlayers,
        }),
      );
      setGiveRolesModal(false);
    }
  };

  const removeRole = () => {
    if (selectPlayers.length !== 0) {
      dispatch(
        removeRoleUsers({
          users: selectPlayers,
        }),
      );
      setRemoveRolesModal(false);
    }
  };

  const errVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
    },
  };

  const handlePageClick = (selected: number) => {
    setPage(selected);
  };
  console.log('length', users.users.length);

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
            <div className={styles.form__roleButtons}>
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
        </div>
        {users.status === 'loading' ? (
          <LoadingSpinner />
        ) : users.error !== null ? (
          <div className={styles.error}>
            <span>😕</span>
            {users.error}
          </div>
        ) : users.users.length === 0 ? (
          <div className={styles.root__content__empty}>Нет пользователей</div>
        ) : (
          <>
            <motion.ul
              className={styles.container}
              variants={container}
              initial='hidden'
              animate='visible'>
              {filtredPlayers
                // .filter((player) => player.id_user !== MyID)
                .map((player) => {
                  return (
                    <motion.li
                      key={player.id_user}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      variants={item}>
                      <ProfileInfo
                        deleteBtn={true}
                        data={player}
                        inRow={false}
                        avatarSmall={avatarSmall}
                        roleBtn={true}
                        onClickEdit={() => handleEditUser(player)} // Передаем данные пользователя в обработчик
                        onClickEditPhoto={setChangePhotoModal}
                      />
                    </motion.li>
                  );
                })}
            </motion.ul>
            {limit !== users.count && limit < users.count && (
              <>
                <Pagination
                  page={page}
                  pageCount={Math.ceil(users.count / limit)}
                  handlePageClick={handlePageClick}
                />
                <div className={styles.showNum}>
                  <p>Показывать на странице:</p>
                  {limitVariants.map((item, i) => (
                    <span
                      key={i}
                      className={classNames(styles.showNum__item, {
                        [styles.showNum__item_active]: item === limit,
                      })}
                      onClick={() => {
                        setPage(1);
                        setLimit(item);
                      }}>
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <Modal isActive={showModal} setIsActive={setShowModal}>
          <UpdateUser isUpdate={setIsUpdate} user={selectedUser} setIsActive={setShowModal} />
        </Modal>
        <Modal isActive={giveRolesModal} setIsActive={setGiveRolesModal}>
          <div className={styles.addModal}>
            <h2 className={styles.addModal__title}>Выдача роли</h2>
            {rolesError && <div>{rolesError}</div>}
            <UserSearchBar setCollabs={setCollabs} isMulti={true} isClearable={false} />
            <div className={styles.addModal__separator}></div>
            <SelectBar
              setSelected={setSelectedRole}
              value={selectedRole}
              disabled={selectPlayers.length === 0}
              isMulti={false}
              isClearable={false}
              placeholder={'Выберите роль'}
              emptyMessage={'Роли не найдены'}
              options={roles}
            />
            <AnimatePresence>
              {selectedRole && selectedRole.value === 'ADMIN' && (
                <motion.div
                  variants={errVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  className={styles.warning}>
                  Внимание! Администратор может удалять пользователей и тренировки. Выдавайте роль
                  администратора только доверенным лицам.
                </motion.div>
              )}
            </AnimatePresence>
            <button
              className={classNames(styles.addModal__button, {
                [styles.addModal__button_disabled]: selectPlayers.length === 0 || !selectedRole,
              })}
              onClick={(e) => {
                e.preventDefault();
                giveRole();
              }}>
              Подтвердить
            </button>
          </div>
        </Modal>
        <Modal isActive={removeRolesModal} setIsActive={setRemoveRolesModal}>
          <div className={styles.addModal}>
            <h2 className={styles.addModal__title}>Забрать роль</h2>
            {rolesError && <div>{rolesError}</div>}
            <UserSearchBar setCollabs={setCollabs} isMulti={true} isClearable={false} />
            <button
              className={classNames(styles.addModal__button, {
                [styles.addModal__button_disabled]: selectPlayers.length === 0,
              })}
              onClick={(e) => {
                e.preventDefault();
                removeRole();
              }}>
              Подтвердить
            </button>
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Players;
