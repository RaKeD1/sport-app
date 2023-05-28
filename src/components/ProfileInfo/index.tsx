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
  data: IUser;
  onClickEdit: (value: boolean) => void;
  onClickEditPhoto: (value: boolean) => void;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ data, onClickEdit, onClickEditPhoto }) => {
  console.log(data);
  const { id_user } = useSelector(SelectUser);
  const [showPhotoMenu, setShowPhotoMenu] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>(null);
  const dispatch = useAppDispatch();

  const onClickDeletePhoto = async () => {
    await UserService.deleteUserPhoto(id_user)
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

  return (
    <section className={styles.root}>
      <div className={styles.root__header}>
        <div
          className={styles.root__header__img}
          onMouseEnter={() => setShowPhotoMenu(true)}
          onMouseLeave={() => setShowPhotoMenu(false)}>
          <img src={SERVER_URL + data.img} />
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
                  onClick={() => onClickEditPhoto(true)}>
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
        <p className={styles.root__header__fio}>
          {data.surname + ' ' + data.name + ' ' + data.patronimyc}
        </p>
      </div>
      <div className={styles.root__info}>
        {Object.entries(data)
          .filter(
            (arr) =>
              arr[0] === 'login' || arr[0] === 'email' || arr[0] === 'team' || arr[0] === 'phone',
          )
          .map((item) => (
            <div className={styles.root__info__item}>
              <p className={styles.root__info__title}>{columnUser[item[0]]}</p>
              <p className={styles.root__info__text}>{String(item[1])}</p>
            </div>
          ))}
        <button className={styles.root__editBtn} onClick={() => onClickEdit(true)}>
          Редактировать
        </button>
      </div>
    </section>
  );
};

export default ProfileInfo;
