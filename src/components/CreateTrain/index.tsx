import { FC } from 'react';
import styles from './CreateTrain.module.scss';
import Header from '../Header';

const CreateTrain: FC = () => {
  return (
    <div className={styles.train}>
      <h2 className={styles.train__title}>Создание тренировки</h2>
      <form action="">
        <div className={styles.train__elem}>
          <label htmlFor="">Название команды:</label>
          <input type="text" />
        </div>
        <div className={styles.train__elem}>
          <label htmlFor="">Название команды:</label>
          <input type="text" />
          <button className={styles.button__add}>Добавить</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrain;
