import React from 'react';
import logo from '../assets/img/ball.svg';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const routeStat = () => {
    const stat = `/statistics`;
    navigate(stat);
  };
  const routeTrain = () => {
    const train = `/createtraining`;
    navigate(train);
  };
  const routeProfile = () => {
    const prof = `/profile`;
    navigate(prof);
  };
  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" width="44px" />
        <div className="header__title">
          Volley
          <br /> Ball
        </div>
      </div>
      <button className="header__button" onClick={routeTrain}>
        Создать тренировку
      </button>
      <button className="header__button" onClick={routeStat}>
        Статистика
      </button>
      <button className="header__button" onClick={routeProfile}>
        Профиль
        <svg
          className="header__svg"
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.85879 11.2947C10.5785 11.2947 13.7176 11.8991 13.7176 14.2311C13.7176 16.564 10.5579 17.147 6.85879 17.147C3.13993 17.147 0 16.5425 0 14.2105C0 11.8777 3.15966 11.2947 6.85879 11.2947ZM6.85879 0C9.37862 0 11.3976 2.01822 11.3976 4.53628C11.3976 7.05434 9.37862 9.07341 6.85879 9.07341C4.33981 9.07341 2.32 7.05434 2.32 4.53628C2.32 2.01822 4.33981 0 6.85879 0Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default Header;
