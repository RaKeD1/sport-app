import { FC } from 'react';
import logo from '../assets/img/ball.svg';
import '../scss/profile.scss';
import profile from '../assets/img/Profile.svg';
import { Link } from 'react-router-dom';

export const Profile: FC = () => {
  return (
    <>
      <div className="header">
        <div className="header__logo">
          <img src={logo} alt="logo" width="44px" />
          <div className="header__title">
            Volley
            <br /> Ball
          </div>
        </div>
        <button className="header__button">
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
      <div className="main">
        <div className=" main__places">
          <div className="main__places_left">
            <div className="main__fio main__place">
              <div className="main__fio_surname">Орлов</div>
              <div className="main__fio_name">Данила</div>
              <div className="main__fio_patronymic">Дмитриевич</div>
            </div>
            <div className="main__group main__place">
              <div className="main__group_title">Группа</div>
              <div className="main__group_i">П-23</div>
            </div>
          </div>
          <div className="main__places_right">
            <div className="main__places_right_1">
              <div className="main__email main__place">
                <div className="main__email_title">Почта</div>
                <Link to="/" className="main__email_link">
                  orlovdanorlov@gmail.com
                </Link>
              </div>
            </div>
            <div className="main__places_right_2">
              <div className="main__phone main__place">
                <div className="main__phone_title">Телефон</div>
                <div className="main__phone_i">+7(903)-518-3996</div>
              </div>
              <div className="main__login main__place">
                <div className="main__login_title">Логин</div>
                <div className="main__login_i">RaKeD</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__buttons ">
          <div className="main__info  ">
            <button className="main__item">Редактировать данные профиля</button>
          </div>
          <div className="main__info ">
            <button className="main__item">Добавить тренировку</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
