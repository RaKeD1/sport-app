import React from 'react';
import styles from './ProfileInfo.module.scss';
import { SERVER_URL } from '../../http';
import { columnUser } from '../../pages/Players';

const ProfileInfo = ({ data, onClickEdit }) => {
  console.log(data);
  return (
    <section className={styles.root}>
      <div className={styles.root__header}>
        <div className={styles.root__header__img}>
          <img src={SERVER_URL + data.img} />
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
