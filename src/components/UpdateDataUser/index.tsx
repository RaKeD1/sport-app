import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SelectUser, setUpdateUserStatus, updateUser } from '../../redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import styles from './UpdateDataUser.module.scss';

const UpdateUser = ({ setIsActive }) => {
  const dispatch = useAppDispatch();
  const { phone, email, name, surname, login, patronimyc, id_user } = useAppSelector(SelectUser);
  const updateUserStatus = useSelector(setUpdateUserStatus);
  const [nameState, setNameState] = useState<string>(name);
  const [surnameState, setSurnameState] = useState<string>(surname);
  const [patronimycState, setPatronimycState] = useState<string>(patronimyc);
  const [emailState, setEmailState] = useState<string>(email);
  const [phoneState, setPhoneState] = useState<string>(phone);
  const handleUpdateUser = () => {
    if (window.confirm('Обновить данные?')) {
      const updatedUserData = {
        name: nameState,
        surname: surnameState,
        patronimyc: patronimycState,
        email: emailState,
        phone: phoneState,
        login: login,
      };
      dispatch(updateUser({ id_user: id_user, userData: updatedUserData }));
      setIsActive(false);
    }
  };

  return (
    <div className={styles.update}>
      <h2>Обновление данных пользователя</h2>
      <div className={styles.update__blocks}>
        <div className={(styles.update__leftBlock, styles.block)}>
          <div>
            <label>
              Имя:
              <input
                type='text'
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>
          <div>
            <label>
              Фамилия:
              <input
                type='text'
                value={surnameState}
                onChange={(e) => setSurnameState(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>
          <div>
            <label>
              Отчество (если имеется):
              <input
                type='text'
                value={patronimycState}
                onChange={(e) => setPatronimycState(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>
        </div>
        <div className={(styles.update__rigthBlock, styles.block)}>
          <div>
            <label>
              Почта:
              <input
                type='email'
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>
          <div>
            <label className={styles.label}>
              Телефон:
              <input
                type='phone'
                value={phoneState}
                onChange={(e) => setPhoneState(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>
        </div>
      </div>
      <button onClick={handleUpdateUser}>Обновить</button>
    </div>
  );
};

export default UpdateUser;
