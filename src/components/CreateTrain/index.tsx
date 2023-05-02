import { FC, useEffect, useState } from 'react';
import styles from './CreateTrain.module.scss';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { SelectCreateTrain, setPlayers, setTeam } from '../../redux/slices/createTrainSlice';
import { SelectAccountID, Status } from '../../redux/slices/profileSlice';
import { SelectTrainStatus, postNewTrain } from '../../redux/slices/trainSlice';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import AsyncSearchBar from '../AsyncSearchBar';
import { ISelectUser } from '../../models/ISelectUser';

const CreateTrain: FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { players, team } = useSelector(SelectCreateTrain);
  const account_id = useSelector(SelectAccountID);
  const status = useSelector(SelectTrainStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collabs, setCollabs] = useState<ISelectUser[]>([]);

  useEffect(() => {
    console.log('collabs', collabs);
    const players: number[] = collabs.map((obj) => obj.id_account);
    dispatch(setPlayers(players));
  }, [collabs]);

  useEffect(() => {
    if (!team || collabs.length === 0) setIsValid(false);
    else setIsValid(true);
  }, [collabs, team]);

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate('/statistics');
    }
  }, [status]);

  const createTrain = (account_id: number, team: string, players: number[]) => {
    console.log('Button clicked', account_id, team, players);
    dispatch(postNewTrain({ account_id, team, players }));
  };

  return (
    <div className={styles.train}>
      <h2 className={styles.train__title}>Создание тренировки</h2>
      <div className={styles.train__elem}>
        <label htmlFor=''>Название команды:</label>
        <input
          value={team}
          onChange={(event) => dispatch(setTeam(event.target.value))}
          type='text'
        />
      </div>
      <div className={styles.train__elem}>
        <label htmlFor=''>Игроки:</label>
        <AsyncSearchBar setCollabs={setCollabs} />
      </div>
      <button
        className={classNames(styles.train__create, { [styles.train__create_notValid]: !isValid })}
        disabled={!isValid}
        onClick={() => createTrain(account_id, team, players)}>
        Создать
      </button>
    </div>
  );
};

export default CreateTrain;
