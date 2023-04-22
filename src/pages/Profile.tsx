import { FC } from 'react';
import logo from '../assets/img/ball.svg';
import '../scss/profile.scss';
import { useSelector } from 'react-redux';
import { SelectUser, logoutAccount } from '../redux/slices/profileSlice';
import { useAppDispatch } from '../redux/store';
import Header from '../components/Header';

export const Profile: FC = () => {
  const { name, surname, patronimyc, email, phone, team, login } = useSelector(SelectUser);
  console.log({ name, surname, patronimyc, email, phone, team, login });
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="track">
        <div className="box1">
          {surname}
          <br />
          {name}
          <br />
          {patronimyc}
        </div>
        <div className="box2">{team}</div>
        <div className="box3">{email}</div>
        <div className="box4">{phone}</div>
        <div className="box5">{login}</div>
      </div>
      <button onClick={() => dispatch(logoutAccount())}>Выйти</button>
      {/* <div className="main">
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
      </div> */}
    </>
  );
};
export default Profile;
