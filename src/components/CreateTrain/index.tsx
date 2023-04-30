import { FC } from 'react';
import styles from './CreateTrain.module.scss';
import Header from '../Header';

const CreateTrain: FC = () => {
  return (
    <div className={styles.train}>
      <h2 className={styles.train__title}>Создание тренировки</h2>
      <div className={styles.flex}>
        <label htmlFor="">Название команды:</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default CreateTrain;
