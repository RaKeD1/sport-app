import { FC } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isActive, setIsActive, children }) => {
  return (
    <div className={classNames(styles.action, { [styles.active]: isActive })}>
      <div className={classNames(styles.action__content, { [styles.active]: isActive })}>
        <FaTimes className={styles.action__close} onClick={() => setIsActive(false)} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
