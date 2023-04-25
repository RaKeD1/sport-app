import { FC, useEffect, useMemo, useRef, useState } from 'react';
import logo from '../assets/img/ball.svg';
import '../scss/profile.scss';
import { useSelector } from 'react-redux';
import {
  FetchUserParams,
  SelectUser,
  fetchUser,
  logoutAccount,
} from '../redux/slices/profileSlice';
import { useAppDispatch } from '../redux/store';
import Header from '../components/Header';

export const Profile: FC = () => {
  const { id_user, id_account, name, surname, patronimyc, email, phone, team, login } =
    useSelector(SelectUser);
  console.log({ id_user, id_account, name, surname, patronimyc, email, phone, team, login });
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current || !name || !surname || !phone || !email) {
      if (id_user) {
        dispatch(fetchUser({ id_user } as FetchUserParams));
      }
    }
    isMounted.current = true;
  }, [id_user, id_account, name, surname, patronimyc, email, phone, team, login]);

  return (
    <>
      <Header />
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
