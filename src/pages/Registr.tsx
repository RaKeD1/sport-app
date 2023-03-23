import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/ball.svg';

export const Registr = () => {
  return (
    <div className="auth">
      <img className="auth__logo" width="44" src={logo} alt="Valleyball logo"></img>
      <h2 className="auth__title">Регистрация</h2>
      <div className="auth__inputs">
        <div className="auth__for-input input-true">
          <input className="auth__input auth__input_login input" placeholder="ФИО"></input>
        </div>
        <div className="auth__for-input input-true">
          <input
            className="auth__input auth__input_password input"
            placeholder="Телефон"
            type="tel"></input>
        </div>
        <div className="auth__for-input input-true">
          <input className="auth__input auth__input_password input" placeholder="Группа"></input>
        </div>
        <div className="auth__for-input input-true">
          <input
            className="auth__input auth__input_login input"
            placeholder="Логин"
            type="login"></input>
        </div>
        <div className="auth__for-input input-true">
          <input
            className="auth__input auth__input_password input"
            placeholder="Пароль"
            type="password"></input>
        </div>
        <div className="auth__for-input input-false">
          <input
            className="auth__input auth__input_login input"
            placeholder="Повторите пароль"
            type="password"></input>
        </div>
      </div>
      <p className="auth__text">
        Уже есть аккаунт?&nbsp;
        <Link to="/login" className="auth__link">
          Войти
        </Link>
      </p>
      <button className="auth__button">Зарегистрироваться</button>
    </div>
  );
};
export default Registr;
