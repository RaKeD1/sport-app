import { useState, FC, useEffect } from 'react';
import styles from './UserTrainings.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import UserService from '../../services/UserService';
import { useAppSelector } from '../../hooks/redux';
import { SelectAccountID } from '../../redux/slices/profileSlice';
import { ITrain } from '../../models/ITrain';
import Pagination from '../Pagination';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { FaStar } from 'react-icons/fa';
import classNames from 'classnames';
import Modal from '../Modal';

type UserTrain = ITrain & {
  day_team: string;
  date: string;
};

export interface UserTrains {
  count: number;
  rows: UserTrain[];
}

export const limitVariants = [4, 8, 12, 16];

export const UserTrainings: FC = () => {
  const id = useAppSelector(SelectAccountID);
  const [trains, setTrains] = useState<UserTrains>({ count: 0, rows: [] });
  const [error, setError] = useState<string>(null);
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTrain, setSelectedTrain] = useState<UserTrain>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    if (id) {
      setIsLoading(true);
      await UserService.fetchUserTrains(id, page, limit)
        .then((res) => {
          setIsLoading(false);
          setError(null);
          setTrains(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError(
            err.response.data.message
              ? err.response.data.message
              : 'Не удалось получить тренировки',
          );
        });
    }
  };

  useEffect(() => {
    fetchTrains();
  }, [page, limit]);

  const handlePageClick = (selected: number) => {
    setPage(selected);
  };

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>Мои тренировки</h2>
      <div className={styles.root__content}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className={styles.error}>
            <span>😕</span>
            {error}
          </div>
        ) : trains.rows.length === 0 ? (
          <div className={styles.root__content__empty}>У вас пока не было тренировок</div>
        ) : (
          <>
            <AnimatePresence>
              <motion.ul
                className={styles.container}
                variants={container}
                initial='hidden'
                animate='visible'>
                {trains.rows.map((train) => {
                  return (
                    <motion.li
                      key={train.id_train}
                      className={styles.item}
                      variants={item}
                      onClick={() => {
                        setShowModal(true);
                        setSelectedTrain(train);
                      }}>
                      <div className={styles.item__content}>
                        <div className={styles.item__team}>{train.day_team}</div>
                        <div className={styles.item__separator}></div>
                        <div className={styles.item__date}>
                          {train.date.split('T')[0].split('-').reverse().join('.')}
                        </div>
                        <div className={styles.item__rating}>
                          {' '}
                          <FaStar /> 5.0
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
            {limit !== trains.count && limit < trains.count && (
              <>
                <Pagination
                  page={page}
                  pageCount={Math.ceil(trains.count / limit)}
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
      </div>
      <Modal isActive={showModal} setIsActive={setShowModal}>
        {selectedTrain && (
          <div key={selectedTrain.id_train} className={styles.train}>
            <div className={styles.train__header}>
              <div className={styles.train__team}>{selectedTrain.day_team}</div>
              <div className={styles.train__separator}></div>
              <div className={styles.train__date}>
                {selectedTrain.date.split('T')[0].split('-').reverse().join('.')}
              </div>
              <div className={styles.train__rating}>
                {' '}
                <FaStar /> 5.0
              </div>
            </div>
            <div className={styles.train__content}>
              <p>Lorem Ipsum</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default UserTrainings;
