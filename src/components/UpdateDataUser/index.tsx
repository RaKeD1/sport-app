import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUpdateUserStatus, updateUser } from '../../redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import styles from './UpdateDataUser.module.scss';

const UpdateUser = (props) => {
  const dispatch = useAppDispatch();
  const updateUserStatus = useSelector(setUpdateUserStatus);
  const [nameState, setNameState] = useState<string>('');
  const [surnameState, setSurnameState] = useState<string>('');
  const [patronimycState, setPatronimycState] = useState<string>('');
  const [emailState, setEmailState] = useState<string>('');
  const [phoneState, setPhoneState] = useState<string>('');

  useEffect(() => {
    setNameState(props.user.name);
    setSurnameState(props.user.surname);
    setPatronimycState(props.user.patronimyc);
    setEmailState(props.user.email);
    setPhoneState(props.user.phone);
  }, [props.user]);
  useEffect(() => {}, [props.user, emailState]);

  const handleUpdateUser = () => {
    if (window.confirm('Обновить данные?')) {
      const updatedUserData = {
        name: nameState,
        surname: surnameState,
        patronimyc: patronimycState,
        email: emailState,
        phone: phoneState,
        login: props.user.login,
      };
      props.setIsActive(false);
      dispatch(updateUser({ id_user: props.user.id_user, userData: updatedUserData }));
      if (props.isUpdate) {
        props.isUpdate(true);
      }
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
