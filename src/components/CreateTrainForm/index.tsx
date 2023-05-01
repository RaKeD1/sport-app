import React from 'react';
import classnames from 'classnames';
import { Formik, Form, Field, withFormik, FormikProps, FormikErrors } from 'formik';
import styles from '../RegistrForm/RegistrForm.module.scss';
import LoginSchema from '../../models/validation/LoginSchema';
import { loginAccount } from '../../redux/slices/profileSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
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

interface FormValues {
  team: string;
  players: string[];
}

let setSubmittingHigher;

const InnerForm: React.FC = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const [playerInput, setPlayerInput] = React.useState<string>('');
  const { players, team } = useSelector(SelectCreateTrain);
  const account_id = useSelector(SelectAccountID);
  const dispatch = useAppDispatch();

  const updPlayerInput = (value: string) => {
    setPlayerInput(value);
  };

  const onClickAdd = () => {
    dispatch(addPlayer(playerInput));
    setPlayerInput('');
  };

  const onClickRemovePlayer = (player: string) => {
    dispatch(removePlayer(player));
  };

  const createTrain = (account_id: number, team: string, players: string[]) => {
    dispatch(postNewTrain({ account_id, team, players }));
  };

  return (
    <Form className={styles.train}>
      <h2 className={styles.train__title}>Создание тренировки</h2>
      <div className={styles.train__elem}>
        <label htmlFor=''>Название команды:</label>
        <Field
          value={team}
          onChange={(event) => dispatch(setTeam(event.target.value))}
          type='text'
        />
        {errors.team && touched.team && <div>{errors.team}</div>}
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
      <button
        type='submit'
        disabled={isSubmitting}
        onClick={() => createTrain(account_id, team, players)}>
        Создать
      </button>
    </Form>
  );
};

interface TrainProps {
  initialTeam?: string;
  postNewTrain: (values: FormValues) => void;
}

export const CreateTrainForm = withFormik<TrainProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      team: props.initialTeam || '',
      players: [],
    };
  },

  validationSchema: LoginSchema,

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(JSON.stringify(values));
    props.postNewTrain(values);
    setSubmittingHigher = setSubmitting;
  },
  displayName: 'CreateTrainForm',
})(InnerForm);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      postNewTrain,
    },
    dispatch,
  );

const Redux = connect(null, mapDispatchToProps)(CreateTrainForm);

export default Redux;
