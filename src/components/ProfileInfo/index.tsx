import { FC, useState } from 'react';
import styles from './ProfileInfo.module.scss';
import { SERVER_URL } from '../../http';
import { columnUser } from '../../pages/Players';
import { AnimatePresence, motion } from 'framer-motion';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import { useSelector } from 'react-redux';
import { SelectUser, setImg } from '../../redux/slices/profileSlice';
import { useAppDispatch } from '../../hooks/redux';

interface ProfileInfoProps {
  onClickEditUser?: (value: number) => void;
  data: IUser;
  avatarSmall: boolean;
  onClickEdit: (value: boolean) => void;
  onClickEditPhoto: (value: boolean) => void;
}

const ProfileInfo: FC<ProfileInfoProps> = (props) => {
  const [showPhotoMenu, setShowPhotoMenu] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>(null);
  const dispatch = useAppDispatch();

  const onClickDeletePhoto = async () => {
    await UserService.deleteUserPhoto(props.data.id_user)
      .then((res) => {
        setDeleteError(null);
        dispatch(setImg(res.data));
      })
      .catch((err) => {
        setDeleteError(err.response.data.message ? err.response.data.message : 'Произошла ошибка');
      });
  };

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  const small = props.avatarSmall
    ? `${styles.root__header__img_small}`
    : `${styles.root__header__img}`;
  console.log('avatar', props.avatarSmall);
  return (
    <section
      style={{
        width: props.avatarSmall ? '100%' : '300px',
        boxShadow: props.avatarSmall === true && '0 0 30px rgba(0, 0, 0, 0.2)',
      }}
      className={styles.root}>
      <div
        className={styles.root__header}
        style={{ flexDirection: props.avatarSmall ? 'row' : 'column' }}>
        <div
          className={small}
          onMouseEnter={() => setShowPhotoMenu(true)}
          onMouseLeave={() => setShowPhotoMenu(false)}>
          <img src={SERVER_URL + props.data.img} />
          <AnimatePresence>
            {showPhotoMenu && (
              <motion.ul
                variants={variants}
                initial='hidden'
                animate='show'
                exit='hidden'
                className={styles.root__header__img__editMenu}>
                <li
                  className={styles.root__header__img__editMenu__item}
                  onClick={() => props.onClickEditPhoto(true)}>
                  Изменить
                </li>
                <li
                  className={styles.root__header__img__editMenu__item}
                  onClick={() => onClickDeletePhoto()}>
                  Удалить
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <p
          style={{ margin: props.avatarSmall ? '0 auto' : '15px' }}
          className={styles.root__header__fio}>
          {props.data.surname + ' ' + props.data.name + ' ' + props.data.patronimyc}
        </p>
      </div>
      <div className={styles.root__info}>
        {Object.entries(props.data)
          .filter(
            (arr) =>
              arr[0] === 'login' || arr[0] === 'email' || arr[0] === 'team' || arr[0] === 'phone',
          )
          .map((item) => {
            const style = { opacity: item[1] ? '1' : '0.3' };

            return (
              <div className={styles.root__info__item}>
                <p className={styles.root__info__title}>{columnUser[item[0]]}</p>
                <p style={style} className={styles.root__info__text}>
                  {String(item[1] ? item[1] : 'Нет данных')}
                </p>
              </div>
            );
          })}
        <button className={styles.root__editBtn} onClick={() => props.onClickEdit(true)}>
          Редактировать
        </button>
      </div>
    </section>
  );
};

export default ProfileInfo;
