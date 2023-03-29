import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/ball.svg';
import AuthInputs from '../components/AuthInputs';

export const Registr = () => {
  return (
    <div className='auth'>
      <img className='auth__logo' width='44' src={logo} alt='Valleyball logo'></img>
      <h2 className='auth__title'>Регистрация</h2>
      <div className='auth__inputs'>
        <AuthInputs placeholder='ФИО' type='text' />
        <AuthInputs placeholder='Телефон' type='tel' />
        <AuthInputs placeholder='Группа' type='text' />
        <AuthInputs placeholder='Логин' type='text' />
        <AuthInputs placeholder='Пароль' type='password' />
        <AuthInputs placeholder='Повторите пароль' type='password' />
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
