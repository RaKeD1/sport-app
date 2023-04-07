import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, withFormik, FormikProps, FormikErrors } from 'formik';
import logo from '../../assets/img/ball.svg';
import styles from '../RegistrForm/RegistrForm.module.scss';
import LoginSchema from '../../models/validation/LoginSchema';
import { useAppDispatch } from '../../redux/store';
import { loginAccount } from '../../redux/slices/profileSlice';

interface FormValues {
  login: string;
  password: string;
}

const InnerForm: React.FC = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className={styles.auth}>
      <img className={styles.auth__logo} width='44' src={logo} alt='Volleyball logo'></img>
      <h2 className={styles.auth__title}>Авторизация</h2>
      <div className={styles.auth__inputs}>
        <div className={classnames(styles.auth__forinput)}>
          <Field name='login' type='text' placeholder='Логин' />
          {errors.login && touched.login && <div>{errors.login}</div>}
        </div>
        <div className={classnames(styles.auth__forinput)}>
          <Field name='password' type='password' placeholder='Пароль' />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
      </div>
      <p className={styles.auth__text}>
        Нет аккаунта?&nbsp;
        <Link to='/registration' className='auth__link'>
          Зарегистрироваться
        </Link>
      </p>
      <button type='submit' className={styles.auth__button} disabled={isSubmitting}>
        Войти
      </button>
    </Form>
  );
};

interface LoginProps {
  initialLogin?: string;
}

export const LoginForm = withFormik<LoginProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      login: props.initialLogin || '',
      password: '',
    };
  },

  validationSchema: LoginSchema,

  handleSubmit: (values) => {
    const dispatch = useAppDispatch();
    console.log(JSON.stringify(values));
    dispatch(loginAccount(values));
  },
})(InnerForm);

export default LoginForm;
