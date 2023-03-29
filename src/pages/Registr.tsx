import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/ball.svg';
import AuthInputs from '../components/AuthInputs';

type Inputs = {
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
}[];

export const Registr = () => {
  const [fio, setFio] = React.useState<string>('');
  const [tel, setTel] = React.useState<string>('');
  const [group, setGroup] = React.useState<string>('');
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordCheck, setPasswordCheck] = React.useState<string>('');

  const inputs: Inputs = [
    { placeholder: 'ФИО', type: 'text', onChange: (value) => setFio(value) },
    { placeholder: 'Телефон', type: 'tel', onChange: (value) => setTel(value) },
    { placeholder: 'Группа', type: 'text', onChange: (value) => setGroup(value) },
    { placeholder: 'Логин', type: 'text', onChange: (value) => setLogin(value) },
    { placeholder: 'Пароль', type: 'password', onChange: (value) => setPassword(value) },
    {
      placeholder: 'Повторите пароль',
      type: 'password',
      onChange: (value) => setPasswordCheck(value),
    },
  ];

  return (
    <div className='auth'>
      <img className='auth__logo' width='44' src={logo} alt='Valleyball logo'></img>
      <h2 className='auth__title'>Регистрация</h2>
      <div className='auth__inputs'>
        {inputs.map((obj, i) => (
          <AuthInputs
            key={i}
            placeholder={obj.placeholder}
            type={obj.type}
            onChangeInput={obj.onChange}
          />
        ))}
      </div>
      <p className='auth__text'>
        Уже есть аккаунт?&nbsp;
        <Link to='/login' className='auth__link'>
          Войти
        </Link>
      </p>
      <button className='auth__button'>Зарегистрироваться</button>
    </div>
  );
};
export default Registr;
