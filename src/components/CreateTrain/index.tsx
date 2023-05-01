import { FC, useState } from 'react';
import styles from './CreateTrain.module.scss';
import Header from '../Header';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
  SelectCreateTrain,
  addPlayer,
  removePlayer,
  setTeam,
} from '../../redux/slices/createTrainSlice';
import { SelectAccountID } from '../../redux/slices/profileSlice';
import { postNewTrain } from '../../redux/slices/trainSlice';

const CreateTrain: FC = () => {
  const [playerInput, setPlayerInput] = useState<string>('');
  const { players, team } = useSelector(SelectCreateTrain);
  const account_id = useSelector(SelectAccountID);
  const dispatch = useAppDispatch();

  const updPlayerInput = (value) => {
    setPlayerInput(value);
  };

  const onClickAdd = () => {
    dispatch(addPlayer(playerInput));
    setPlayerInput('');
  };

  const onClickRemovePlayer = (player: string) => {
    dispatch(removePlayer(player));
  };
  const createTrain = (account_id: number, players: string[], team: string) => {
    dispatch(postNewTrain(account_id, players, team));
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
        <input
          value={playerInput}
          onChange={(event) => updPlayerInput(event.target.value)}
          type='text'
        />
        <button onClick={() => onClickAdd()} className={styles.button__add}>
          Добавить
        </button>
      </div>
      <div className={styles.plrContainer}>
        {players.map((item: string) => (
          <div className={styles.train__player}>
            {item}
            <span onClick={() => onClickRemovePlayer(item)}>x</span>
          </div>
        ))}
      </div>
      <button onClick={() => createTrain(account_id, team, players)}>Создать</button>
    </div>
  );
};

export default CreateTrain;
