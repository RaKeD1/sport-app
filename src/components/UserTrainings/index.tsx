import { useState, FC, useEffect } from 'react';
import styles from './UserTrainings.module.scss';
import { motion } from 'framer-motion';
import UserService from '../../services/UserService';
import { useAppSelector } from '../../hooks/redux';
import { SelectAccountID } from '../../redux/slices/profileSlice';
import { ITrain } from '../../models/ITrain';
import Pagination from '../Pagination';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export type UserTrain = ITrain & {
  day_team: string;
  date: string;
};

export const UserTrainings: FC = () => {
  const id = useAppSelector(SelectAccountID);
  const [trains, setTrains] = useState<UserTrain[]>(null);
  const [error, setError] = useState<string>(null);

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

  const fetchTrains = async () => {
    await UserService.fetchUserTrains(id)
      .then((res) => {
        setError(null);
        setTrains(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(
          err.response.data.message ? err.response.data.message : 'Не удалось получить тренировки',
        );
      });
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handlePageClick = () => {};

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>Мои тренировки</h2>
      <div className={styles.root__content}>
        {!trains ? (
          <LoadingSpinner />
        ) : error ? (
          <div className={styles.error}>
            <span>😕</span>
            {error}
          </div>
        ) : trains.length === 0 ? (
          <div className={styles.root__content__empty}>У вас пока не было тренировок</div>
        ) : (
          <>
            <motion.ul
              className={styles.container}
              variants={container}
              initial='hidden'
              animate='visible'>
              {trains.map((train) => {
                return (
                  <motion.li key={train.id_train} className={styles.item} variants={item}>
                    <div className={styles.item__content}>
                      <div className={styles.item__team}>{train.day_team}</div>
                      <div className={styles.item__separator}></div>
                      <div className={styles.item__date}>
                        {train.date.split('T')[0].split('-').reverse().join('.')}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
            <Pagination page={1} pageCount={3} handlePageClick={handlePageClick} />
          </>
        )}
      </div>
    </section>
  );
};

export default UserTrainings;
