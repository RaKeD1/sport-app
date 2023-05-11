import { FC, useState } from 'react';
import { ITrain } from '../../models/ITrain';
import styles from './AccordionItem.module.scss';

const AccordionItem: FC<ITrain> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={styles.accordion__item}>
      <div className={styles.accordion__title} onClick={() => setIsActive(!isActive)}>
        <div>{props.fio}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className={styles.accordion__content}>
          <div className={styles.accordion__content_list}>
            <div>{props.inning_stat}</div>
            <div className={styles.accordion__content_rez}>{props.inning_stat}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>{props.blocks_stat}</div>
            <div className={styles.accordion__content_rez}>{props.blocks_stat}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>{props.attacks_stat}</div>
            <div className={styles.accordion__content_rez}>{props.attacks_stat}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>{props.catch_stat}</div>
            <div className={styles.accordion__content_rez}>{props.catch_stat}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>{props.defence_stat}</div>
            <div className={styles.accordion__content_rez}>{props.defence_stat}</div>
          </div>
          <div className={styles.accordion__content_list}>
            <div>{props.support_stat}</div>
            <div className={styles.accordion__content_rez}>{props.support_stat}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
