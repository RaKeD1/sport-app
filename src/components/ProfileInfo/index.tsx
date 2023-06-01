import { FC, useEffect, useState } from 'react';
import styles from './ProfileInfo.module.scss';
import { SERVER_URL } from '../../http';
import { columnUser } from '../../pages/Players';
import { AnimatePresence, motion } from 'framer-motion';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import { setImg } from '../../redux/slices/profileSlice';
import { useAppDispatch } from '../../hooks/redux';
import classNames from 'classnames';

interface ProfileInfoProps {
  onClickEditUser?: (value: number) => void;
  data: IUser;
  avatarSmall: boolean;
  onClickEdit: (value: boolean) => void;
  onClickEditPhoto: (value: boolean) => void;
}
const ProfileInfo = ({ data, inRow, avatarSmall, onClickEdit, onClickEditPhoto }) => {
  const handleEditUser = () => {
    onClickEdit(true); // Передаем сигнал о необходимости открытия компонента редактирования
    onClickEdit(data); // Передаем данные пользователя в родительский компонент
  };
  const [showPhotoMenu, setShowPhotoMenu] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>(null);
  const dispatch = useAppDispatch();

  const [matches, setMatches] = useState(window.matchMedia('(max-width: 760px)').matches);

  useEffect(() => {
    window
      .matchMedia('(max-width: 760px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const [mobileMatches, setMobileMatches] = useState(
    window.matchMedia('(max-width: 530px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(max-width: 530px)')
      .addEventListener('change', (e) => setMobileMatches(e.matches));
  }, []);

  const onClickDeletePhoto = async () => {
    await UserService.deleteUserPhoto(data.id_user)
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
  const small = avatarSmall ? `${styles.root__header__img_small}` : `${styles.root__header__img}`;
  console.log('avatar', avatarSmall);
  return (
    <section
      style={{
        width:
          avatarSmall || (matches && !mobileMatches && inRow) || (mobileMatches && inRow)
            ? '100%'
            : '300px',
        boxShadow: avatarSmall === true && '0 0 30px rgba(0, 0, 0, 0.2)',
      }}
      className={classNames(styles.root, { [styles.row]: matches && !mobileMatches && inRow })}>
      <div
        className={classNames(styles.root__header, {
          [styles.row__header]: matches && !mobileMatches && inRow,
        })}
        style={{ flexDirection: avatarSmall ? 'row' : 'column' }}>
        <div
          className={small}
          onMouseEnter={() => setShowPhotoMenu(true)}
          onMouseLeave={() => setShowPhotoMenu(false)}>
          <img src={SERVER_URL + data.img} />
          <AnimatePresence>
            {showPhotoMenu && !avatarSmall && (
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
        <p
          style={{ margin: avatarSmall ? '0 auto' : '15px 0 0 0' }}
          className={styles.root__header__fio}>
          {data.surname + ' ' + data.name + ' ' + data.patronimyc}
        </p>
      </div>
      <div
        className={classNames(styles.root__info, {
          [styles.row__info]: matches && !mobileMatches && inRow,
        })}>
        {Object.entries(data)
          .filter(
            (arr) =>
              arr[0] === 'login' || arr[0] === 'email' || arr[0] === 'team' || arr[0] === 'phone',
          )
          .map((item) => {
            const style = { opacity: item[1] ? '1' : '0.3' };

            return (
              <div key={item[0]} className={styles.root__info__item}>
                <p className={styles.root__info__title}>{columnUser[item[0]]}</p>
                <p style={style} className={styles.root__info__text}>
                  {String(item[1] ? item[1] : 'Нет данных')}
                </p>
              </div>
            );
          })}
        <button className={styles.root__editBtn} onClick={handleEditUser}>
          Редактировать
        </button>
      </div>
    </section>
  );
};

export default ProfileInfo;
