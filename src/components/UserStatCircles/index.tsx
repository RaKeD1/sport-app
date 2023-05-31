import React, { useEffect, useState, FC, useRef } from 'react';
import styles from './UserStatCircles.module.scss';
import UserService from '../../services/UserService';
import { ITrain } from '../../models/ITrain';
import { columnNames } from '../../pages/TrainingEdit';
import ProgressCircle from '../ProgressCircle';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

interface UserStatCirclesProps {
  user: number;
}

const UserStatCircles: FC<UserStatCirclesProps> = ({ user }) => {
  const [error, setError] = useState<string>(null);
  const [stat, setStat] = useState<ITrain>(null);

  const fetchStat = async (user: number) => {
    try {
      const response = await UserService.fetchUserStat(user);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  useEffect(() => {
    fetchStat(user)
      .then((data) => {
        setStat(data);
        setError(null);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>Статистика тренировок</h2>

      <div className={styles.root__content}>
        {!stat ? (
          <LoadingSpinner />
        ) : error ? (
          <div className={styles.error}>
            <span>😕</span>
            {error}
          </div>
        ) : (
          Object.entries(stat).map((arr) => (
            <div key={arr[0]} className={styles.root__content__tile}>
              <p className={styles.root__content__tile__text}>{columnNames[arr[0]]}</p>
              <ProgressCircle progress={arr[1] * 100} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default UserStatCircles;
