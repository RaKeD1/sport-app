import React from 'react';
import logo from '../assets/img/ball.svg';
export const Login = () => {
  return (
    <div className="container">
      <div className="auth">
        <img className="auth__logo" width="44" src={logo} alt="Valleyball logo"></img>
        <h2 className="auth__title">Авторизация</h2>
        <div className="auth__inputs">
          <input
            className="auth__input auth__input_login input"
            placeholder="Логин или телефон"></input>
          <input className="auth__input auth__input_password input" placeholder="Пароль"></input>
        </div>
        <p className="auth__text">
          Нет аккаунта? <a className="auth__link">Зарегистрироваться</a>
        </p>
        <button className="auth__button">Войти</button>
      </div>
    </div>
  );
};
export default Login;
