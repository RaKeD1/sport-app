import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { SelectAccountID } from '../../redux/slices/profileSlice';
import { useLocation, useNavigate } from 'react-router';
import TrainService from '../../services/TrainService';
import { ITrain } from '../../models/ITrain';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';
import pageMotion from '../../components/pageMotion';
import styles from './UserTraining.module.scss';
import StatTile from '../../components/StatTile';
import UserService from '../../services/UserService';

export type UserTrain = {
  date: string;
  day_team: string;
  account_id: number;
  inning_stat: string;
  blocks_stat: string;
  attacks_stat: string;
  catch_stat: string;
  defence_stat: string;
  support_stat: string;
  id_train: number;
};

const UserTraining = () => {
  const [idTrain, setIdTrain] = useState<number>(null);
  const [idAccount, setIdAccount] = useState<number>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingStat, setIsLoadingStat] = useState<boolean>(true);
  const [statError, setStatError] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [train, setTrain] = useState<UserTrain>(null);
  const [stat, setStat] = useState(null);
  // Стейты первого рендера
  const isSearch = React.useRef(false);
  const isMounted = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchTrain = async () => {
    await TrainService.getOneTrain(idTrain, idAccount)
      .then((res) => {
        setTrain(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message
            ? err.response?.data?.message
            : 'Не удалось получить тренировку',
        );
      })
      .finally(() => setIsLoading(false));
  };

  const fetchStat = async () => {
    setIsLoadingStat(true);
    await UserService.fetchUserStat(idAccount, idTrain)
      .then((res) => {
        setIsLoadingStat(false);
        setStatError(null);
        setStat(res.data);
      })
      .catch((err) => {
        setIsLoadingStat(false);
        setStatError(
          err.response?.data?.message
            ? err.response?.data?.message
            : 'Не удалось получить статистику',
        );
      })
      .finally(() => setIsLoadingStat(false));
  };

  useEffect(() => {
    if (!location.search) navigate('/');
    if (!isMounted.current) {
      setIdTrain(+new URLSearchParams(location.search).get('id_train'));
      setIdAccount(+new URLSearchParams(location.search).get('account_id'));
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (idTrain && idAccount) {
      fetchTrain();
      fetchStat();
    }
  }, [idTrain, idAccount]);

  return (
    <motion.div variants={pageMotion} initial='hidden' animate='show' exit='exit'>
      <div className={styles.train}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div>
            <span>😕</span>
            {error ? error : 'Не удалось получить тренировку'}
          </div>
        ) : (
          <>
            <button onClick={() => navigate(-1)}>{'<'}&nbsp; Вернуться назад</button>
            <h1>Тренировка: {train.date.split('T')[0].split('-').reverse().join('.')}</h1>
            <h2>Команда: {train.day_team}</h2>
            <ul className={styles.train__stat}>
              {isLoadingStat ? (
                <LoadingSpinner />
              ) : error ? (
                <div>
                  <span>😕</span>
                  {error ? error : 'Не удалось получить статистику'}
                </div>
              ) : (
                Object.entries(stat).map((arr) => (
                  <>
                    <StatTile
                      name={arr[0]}
                      winCount={arr[1][arr[0] + '_winCount']}
                      lossCount={arr[1][arr[0] + '_lossCount']}
                      stat={arr[1][arr[0] + '_stat']}
                    />
                  </>
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UserTraining;
