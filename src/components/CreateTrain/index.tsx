import { FC, useEffect, useRef, useState } from 'react';
import styles from './CreateTrain.module.scss';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
  SelectCreateTrain,
  setPlayers,
  setSelectedTeam,
} from '../../redux/slices/createTrainSlice';
import { SelectAccountID, Status } from '../../redux/slices/profileSlice';
import {
  SelectTrainPlayers,
  SelectTrainStatus,
  SelectTrainTeam,
  clearTrain,
  postNewTrain,
  setLoading,
  setTeam,
} from '../../redux/slices/trainSlice';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import UserSearchBar from '../UserSearchBar';
import { ISelectUser } from '../../models/ISelectUser';
import TrainService from '../../services/TrainService';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CreateTrain: FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [teamIsValid, setTeamIsValid] = useState<boolean>(false);
  const [teamValue, setTeamValue] = useState<string>('');
  const { selectPlayers, team } = useSelector(SelectCreateTrain);
  const players = useSelector(SelectTrainPlayers);
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
    if (!teamIsValid || collabs.length === 0) setIsValid(false);
    else setIsValid(true);
  }, [collabs, teamIsValid]);

  const onChangeTeamInput = async (value: string) => {
    setTeamValue(value);
    dispatch(setSelectedTeam(value));
    if (value) {
      const valid = await TrainService.checkTeam(value);
      console.log('valid', valid.data);
      if (valid.data) setTeamIsValid(true);
      else setTeamIsValid(false);
    } else setTeamIsValid(false);
  };

  const createTrain = (account_id: number, team: string, selectPlayers: number[]) => {
    console.log('Button clicked', account_id, team, selectPlayers);
    dispatch(postNewTrain({ account_id, team, selectPlayers }));
    dispatch(setTeam(team));
    navigate('/statistics');
  };

  return (
    <div className={styles.train}>
      <h2 className={styles.train__title}>Создание тренировки</h2>
      <div className={styles.train__elem}>
        <label>Название команды:</label>
        <div className={styles.train__team}>
          <input
            className={classNames({ [styles.train__team_notValid]: !teamIsValid && teamValue })}
            value={teamValue}
            onChange={(event) => onChangeTeamInput(event.target.value)}
            type='text'
          />
          {!teamIsValid && teamValue && <span>У этой группы сегодня уже есть тренировка</span>}
          {!teamIsValid && teamValue && (
            <FaTimesCircle
              className={classNames(styles.train__checkIcon, styles.train__checkIcon_false)}
            />
          )}
          {teamIsValid && teamValue && (
            <FaCheckCircle
              className={classNames(styles.train__checkIcon, styles.train__checkIcon_true)}
            />
          )}
        </div>
      </div>
      <div className={styles.train__elem}>
        <label htmlFor=''>Игроки:</label>
        <UserSearchBar setCollabs={setCollabs} />
      </div>
      <button
        className={classNames(styles.train__create, { [styles.train__create_notValid]: !isValid })}
        disabled={!isValid}
        onClick={() => createTrain(account_id, team, selectPlayers)}>
        Создать
      </button>
    </div>
  );
};

export default CreateTrain;
