import { FC, useEffect, useRef, useState } from 'react';
import '../scss/profile.scss';
import {
  FetchUserParams,
  SelectUser,
  fetchUser,
  logoutAccount,
} from '../redux/slices/profileSlice';
import { useAppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import UpdateUser from '../components/UpdateDataUser';

export const Profile: FC = () => {
  const { id_user, id_account, name, surname, patronimyc, email, phone } =
    useAppSelector(SelectUser);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isMounted.current || !name || !surname || !phone || !email) {
      if (id_user) {
        dispatch(fetchUser({ id_user } as FetchUserParams));
      }
    }
    isMounted.current = true;
  }, [id_user, id_account, name, surname, patronimyc, email, phone]);

  useEffect(() => {
    // Получение данных

    setIsLoading(false);
  }, []);

  return (
    <>
      <div className='track'>
        <div className='box_phone box'>
          <div className='box__title'>Телефон</div>
          <div className='box__phone '>{phone}</div>
        </div>
        <div className='box_email box'>
          <div className='box__title'>Почта</div>
          <div className='box__email'>{email}</div>
        </div>
        <div className='box_fio box'>
          <div className='box__title'>ФИО</div>
          <div className='box__fio'>
            {surname + ' '}
            {name + ' '}
            {patronimyc}
          </div>
        </div>
        <div className='box_change'>
          <UpdateUser />
        </div>
      </div>
      <div className='buttons__user'>
        <button onClick={() => dispatch(logoutAccount())}>Выйти</button>
        {/* <Link to='/updateuser'> Изменить данные</Link> */}
      </div>
    </>
  );
};
export default Profile;
