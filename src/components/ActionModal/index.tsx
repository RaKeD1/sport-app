import { FC, useEffect, useState } from 'react';
import styles from './ActionModal.module.scss';
import classNames from 'classnames';
import { useAppDispatch } from '../../redux/store';
import { SelectActionTypes, getActionsTypes } from '../../redux/slices/actionTypesSlice';
import { useSelector } from 'react-redux';
import { ActionType } from '../../models/IActionType';
import { BsInfoCircle } from 'react-icons/bs';
import SelectBar from '../SelectBar';

interface ActionModalProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  id_train: number;
}

const ActionModal: FC<ActionModalProps> = ({ isActive, setIsActive, id_train }) => {
  const dispatch = useAppDispatch();
  const { actionTypes } = useSelector(SelectActionTypes);
  const [currentAction, setCurrentAction] = useState<ActionType>({
    id_action_type: null,
    name_type: '',
    result: '',
    win_condition: '',
    loss_condition: '',
    description: '',
  });
  const [activeResult, setActiveResult] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [selectedCondition, setSelectedCondition] = useState<string>('');

  useEffect(() => {
    dispatch(getActionsTypes());
    console.log(actionTypes);
  }, []);

  useEffect(() => {
    console.log(activeResult);
    setSelectedCondition('');
  }, [activeResult]);

  useEffect(() => {
    console.log(selectedCondition);
  }, [selectedCondition]);

  useEffect(() => {
    if (isActive) {
      setCurrentAction(actionTypes[0]);
    }
  }, [isActive]);

  const onClickAdd = () => {
    setIsActive(false);
  };

  return (
    <div className={classNames(styles.action, { [styles.active]: isActive })}>
      <div className={classNames(styles.action__content, { [styles.active]: isActive })}>
        <div className={styles.action_current}>
          <h2 className={styles.action__title}>
            <span>
              <BsInfoCircle onClick={() => setShowInfo(!showInfo)} />
              {showInfo && (
                <div className={styles.action__info}>
                  <p>{currentAction.description}</p>
                </div>
              )}
            </span>
            {currentAction.name_type}
          </h2>
          <div className={styles.action__result}>
            {currentAction.result.split('; ').map((item, index) => (
              <div
                onClick={() => setActiveResult(index)}
                className={classNames(styles.action__resultItem, {
                  [styles.action__active]: index === activeResult,
                })}>
                {item}
              </div>
            ))}
          </div>
          {activeResult === 0 && (
            <div className={styles.action__condition}>
              <SelectBar
                data={currentAction.win_condition}
                setSelectedCondition={setSelectedCondition}
              />
            </div>
          )}
          {activeResult === 1 && (
            <div className={styles.action__condition}>
              <SelectBar
                data={currentAction.loss_condition}
                setSelectedCondition={setSelectedCondition}
              />
            </div>
          )}
          <button onClick={() => onClickAdd()}>Добавить</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ActionModal;
