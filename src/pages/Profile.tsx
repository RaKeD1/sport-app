import { FC } from 'react';
import logo from '../assets/img/ball.svg';
import '../scss/profile.scss';
import { useSelector } from 'react-redux';
import { SelectUser, logoutAccount } from '../redux/slices/profileSlice';
import { useAppDispatch } from '../redux/store';

export const Profile: FC = () => {
  const { name, surname, patronimyc, email, phone, team, login } = useSelector(SelectUser);
  console.log({ name, surname, patronimyc, email, phone, team, login });
  const dispatch = useAppDispatch();

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
      <div className="track">
        <div className="box1 box">
          <div className="box_fio ">
            {surname}
            <br />
            {name}
            <br />
            {patronimyc}
          </div>
          <div className="box__team">{team}</div>
        </div>
        <div className="box2 box">Пока не понятно, что тут будет</div>
        <div className="box3 box">
          <div className="box_title">Почта</div>
          <div className="box__email">{email}</div>
        </div>
        <div className="box4 box">
          <div className="box_title">Телефон</div>
          <div className="box__email">{phone}</div>
        </div>
        <div className="box5 box">
          <div className="box_title">Логин</div>
          <div className="box__login">{login}</div>
        </div>
      </div>
      <button onClick={() => dispatch(logoutAccount())}>Выйти</button>
    </>
  );
};
export default Profile;
