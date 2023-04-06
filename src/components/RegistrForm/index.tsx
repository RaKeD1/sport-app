import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, withFormik, FormikProps, FormikErrors } from 'formik';
import logo from '../../assets/img/ball.svg';
import RegisterSchema from '../../models/validation/RegisterSchema';
import styles from './RegistrForm.module.scss';

interface FormValues {
  fio: string;
  phone: string;
  email: string;
  group: string;
  login: string;
  password: string;
  passwordCheck: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className={styles.auth}>
      <img className={styles.auth__logo} width='44' src={logo} alt='Volleyball logo'></img>
      <h2 className={styles.auth__title}>Регистрация</h2>
      <div className={styles.auth__inputs}>
        <div
          className={classnames(
            styles.auth__forinput,
            {
              [styles.input_true]: touched.fio && !errors.fio,
            },
            { [styles.input_false]: touched.fio && errors.fio },
          )}>
          <Field name='fio' type='text' placeholder='ФИО' />
          {errors.fio && touched.fio && <div>{errors.fio}</div>}
        </div>
        <div
          className={classnames(
            styles.auth__forinput,
            {
              [styles.input_true]: touched.phone && !errors.phone,
            },
            { [styles.input_false]: touched.phone && errors.phone },
          )}>
          <Field name='phone' type='tel' placeholder='Телефон' />
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
          {errors.email && touched.email && <div>{errors.email}</div>}
        </div>
        <div
          className={classnames(
            styles.auth__forinput,
            {
              [styles.input_true]: touched.group && !errors.group,
            },
            { [styles.input_false]: touched.group && errors.group },
          )}>
          <Field name='group' type='text' placeholder='Группа' />
          {errors.group && touched.group && <div>{errors.group}</div>}
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
          {errors.passwordCheck && touched.passwordCheck && <div>{errors.passwordCheck}</div>}
        </div>
      </div>
      <p className={styles.auth__text}>
        Уже есть аккаунт?&nbsp;
        <Link to='/login' className='auth__link'>
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
}

export const RegistrForm = withFormik<RegistrProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      fio: '',
      phone: '',
      email: '',
      group: '',
      login: props.initialLogin || '',
      password: '',
      passwordCheck: '',
    };
  },

  validationSchema: RegisterSchema,

  handleSubmit: (values) => {
    alert(JSON.stringify(values));
  },
})(InnerForm);

export default RegistrForm;
