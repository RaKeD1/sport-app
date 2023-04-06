import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, withFormik, FormikProps, FormikErrors } from 'formik';
import logo from '../assets/img/ball.svg';
import RegisterSchema from '../models/validation/RegisterSchema';

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
    <Form className="auth">
      <img className="auth__logo" width="44" src={logo} alt="Valleyball logo"></img>
      <h2 className="auth__title">Регистрация</h2>
      <div className="auth__inputs">
        <div className="auth__for-input input-true">
          <Field name="fio" type="text" placeholder="ФИО" />
          {errors.fio && touched.fio && <div>{errors.fio}</div>}
        </div>
        <div className="auth__for-input input-true">
          <Field name="phone" type="tel" placeholder="Телефон" />
          {errors.phone && touched.phone && <div>{errors.phone}</div>}
        </div>
        <div className="auth__for-input input-true">
          <Field name="email" type="email" placeholder="Email" />
          {errors.email && touched.email && <div>{errors.email}</div>}
        </div>
        <div className="auth__for-input input-true">
          <Field name="group" type="text" placeholder="Группа" />
          {errors.group && touched.group && <div>{errors.group}</div>}
        </div>
        <div className="auth__for-input input-true">
          <Field name="login" type="text" placeholder="Логин" />
          {errors.login && touched.login && <div>{errors.login}</div>}
        </div>
        <div className="auth__for-input input-true">
          <Field name="password" type="password" placeholder="Пароль" />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div className="auth__for-input input-true">
          <Field name="passwordCheck" type="password" placeholder="Повторите пароль" />
          {errors.passwordCheck && touched.passwordCheck && <div>{errors.passwordCheck}</div>}
        </div>
      </div>
      <p className="auth__text">
        Уже есть аккаунт?&nbsp;
        <Link to="/login" className="auth__link">
          Войти
        </Link>
      </p>
      <button type="submit" className="auth__button" disabled={isSubmitting}>
        Зарегистрироваться
      </button>
    </Form>
  );
};

interface MyFormProps {
  initialLogin?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
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

export const Registr: React.FC = () => {
  return <MyForm />;
};
export default Registr;
