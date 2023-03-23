import React from 'react';
import logo from '../assets/img/ball.svg';
import { Link } from 'react-router-dom';
export const Login = () => {
  return (
    <div className="auth">
      <img className="auth__logo" width="44" src={logo} alt="Valleyball logo"></img>
      <h2 className="auth__title">Авторизация</h2>
      <div className="auth__inputs">
        <div className="auth__for-input input-true">
          <input
            className="auth__input auth__input_login input"
            placeholder="Логин или телефон"></input>
        </div>
        <div className="auth__for-input input-false">
          <input className="auth__input auth__input_password input" placeholder="Пароль"></input>
        </div>
      </div>
      <p className="auth__text">
        Нет аккаунта?{' '}
        <Link to="/registration" className="auth__link">
          Зарегистрироваться
        </Link>
      </p>
      <button className="auth__button">Войти</button>
    </div>
  );
};
export default Login;
