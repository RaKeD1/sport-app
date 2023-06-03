import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, withFormik, FormikProps, FormikErrors } from 'formik';
import logo from '../../assets/img/ball.svg';
import RegisterSchema from '../../models/validation/RegisterSchema';
import styles from './RegistrForm.module.scss';
import MaskedInput from 'react-text-mask';
import { registrAccount } from '../../redux/slices/profileSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const phoneNumberMask = [
  '+',
  '7',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

interface FormValues {
  name: string;
  surname: string;
  patronimyc: string;
  phone: string;
  email: string;
  team: string;
  login: string;
  password: string;
  passwordCheck: string;
}

let setSubmittingHigher;

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className={styles.auth}>
      <img className={styles.auth__logo} width='44' src={logo} alt='Volleyball logo'></img>
      <h2 className={styles.auth__title}>Регистрация</h2>
      <div className={styles.auth__inputs}>
        <div className={styles.auth__inputs_box1}>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.name && !errors.name,
              },
              { [styles.input_false]: touched.name && errors.name },
            )}>
            <Field name='name' type='text' placeholder='Имя' />
            {!errors.name && touched.name && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.name && touched.name && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.surname && !errors.surname,
              },
              { [styles.input_false]: touched.surname && errors.surname },
            )}>
            <Field name='surname' type='text' placeholder='Фамилия' />
            {!errors.surname && touched.surname && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.surname && touched.surname && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.surname && touched.surname && <div>{errors.surname}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.patronimyc && !errors.patronimyc,
              },
              { [styles.input_false]: touched.patronimyc && errors.patronimyc },
            )}>
            <Field name='patronimyc' type='text' placeholder='Отчество (если есть)' />
            {!errors.patronimyc && touched.patronimyc && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.patronimyc && touched.patronimyc && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.patronimyc && touched.patronimyc && <div>{errors.patronimyc}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.phone && !errors.phone,
              },
              { [styles.input_false]: touched.phone && errors.phone },
            )}>
            <Field
              name='phone'
              type='tel'
              render={({ field }) => (
                <MaskedInput {...field} placeholder='Телефон' mask={phoneNumberMask} />
              )}
            />
            {!errors.phone && touched.phone && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.phone && touched.phone && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.phone && touched.phone && <div>{errors.phone}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.email && !errors.email,
              },
              { [styles.input_false]: touched.email && errors.email },
            )}>
            <Field name='email' type='email' placeholder='Email' />
            {!errors.email && touched.email && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.email && touched.email && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.email && touched.email && <div>{errors.email}</div>}
          </div>
        </div>
        <div className={styles.auth__inputs_box2}>
          <div className={classnames(styles.auth__forinput)}>
            <Field name='team' type='text' placeholder='Группа' />
            {!errors.team && touched.team && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.team && touched.team && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.team && touched.team && <div>{errors.team}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.login && !errors.login,
              },
              { [styles.input_false]: touched.login && errors.login },
            )}>
            <Field name='login' type='text' placeholder='Логин' />
            {!errors.login && touched.login && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.login && touched.login && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.login && touched.login && <div>{errors.login}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.password && !errors.password,
              },
              { [styles.input_false]: touched.password && errors.password },
            )}>
            <Field name='password' type='password' placeholder='Пароль' />
            {!errors.password && touched.password && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.password && touched.password && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.password && touched.password && <div>{errors.password}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.passwordCheck && !errors.passwordCheck,
              },
              { [styles.input_false]: touched.passwordCheck && errors.passwordCheck },
            )}>
            <Field name='passwordCheck' type='password' placeholder='Повторите пароль' />
            {!errors.passwordCheck && touched.passwordCheck && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.passwordCheck && touched.passwordCheck && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.passwordCheck && touched.passwordCheck && <div>{errors.passwordCheck}</div>}
          </div>
        </div>
      </div>
      <p className={styles.auth__text}>
        Уже есть аккаунт?&nbsp;
        <Link to='/login' className={styles.auth__link}>
          Войти
        </Link>
      </p>
      <button type='submit' className={styles.auth__button} disabled={isSubmitting}>
        Зарегистрироваться
      </button>
    </Form>
  );
};

interface RegistrProps {
  initialLogin?: string;
  registrAccount: (values: FormValues) => void;
}

export const RegistrForm = withFormik<RegistrProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: '',
      surname: '',
      patronimyc: '',
      phone: '',
      email: '',
      team: '',
      login: props.initialLogin || '',
      password: '',
      passwordCheck: '',
    };
  },

  validationSchema: RegisterSchema,

  handleSubmit: (values, { props, setSubmitting }) => {
    const changedPhone = values.phone
      .replace(/\)/g, '')
      .replace(/\(/g, '')
      .replace(/-/g, '')
      .replace(/ /g, '');
    const user = { ...values };
    user.phone = changedPhone;
    props.registrAccount(user);
    setSubmittingHigher = setSubmitting;
  },
})(InnerForm);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      registrAccount,
    },
    dispatch,
  );

const Redux = connect(null, mapDispatchToProps)(RegistrForm);

export default Redux;
