import * as React from 'react';
import { motion } from 'framer-motion';
import { columnNames } from '../../pages/TrainingEdit';
import styles from './Placeholder.module.scss';
import { columnUser } from '../../pages/Players';

export const ContentPlaceholder = ({ data }) => (
  <motion.div
    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
    transition={{ duration: 0.5 }}
    className={styles.content__placeholder}>
    {Object.entries(data)
      .filter((arr) => arr[0] !== 'id_account' && arr[0] !== 'player' && arr[0] !== 'id_user')
      .map((arr, index) => {
        const num = arr[1].toString();

        return (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            key={index}
            className={styles.accordion__content_list}>
            <div className={styles.accordion__content_list_text}>{columnUser[arr[0]] + ':'}</div>
            <div className={styles.accordion__content_rez}>{num}</div>
          </motion.div>
        );
      })}
  </motion.div>
);
