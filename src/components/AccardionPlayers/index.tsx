import { FC, useState } from 'react';
import styles from './AccardionPlayers.module.scss';
import { IUser } from '../../models/IUser';
import { Link } from 'react-router-dom';

const AccordionPlayers: FC<IUser> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={styles.accordion__item} onClick={() => setIsActive(!isActive)}>
      <div className={styles.accordion__title}>
        <div className={styles.fio}>{props.surname}</div>
        <div className={styles.fio}>{props.name}</div>
        <div className={styles.fio}>{props.patronimyc}</div>
        <div className={styles.activate}>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className={styles.accordion__content}>
          <div className={styles.accordion__content_list}>
            <div>Фамилия:</div>
            <div className={styles.accordion__content_rez}>{props.surname}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>Имя:</div>
            <div className={styles.accordion__content_rez}>{props.name}</div>
          </div>
          {props.patronimyc && (
            <div className={styles.accordion__content_list}>
              <div>Отчество:</div>
              <div className={styles.accordion__content_rez}>{props.patronimyc}</div>
            </div>
          )}
          <div className={styles.accordion__content_list}>
            <div>Телефон:</div>
            <div className={styles.accordion__content_rez}>{props.phone}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>Почта:</div>
            <div className={styles.accordion__content_rez}>{props.email}</div>
          </div>
          <Link to='/' className={styles.button}>
            Изменить
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccordionPlayers;
