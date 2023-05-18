import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  SelectUser,
  Status,
  setUpdateUserStatus,
  updateUser,
} from '../../redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import styles from './UpdateDataUser.module.scss';

const UpdateUser: FC = () => {
  const dispatch = useAppDispatch();
  const { phone, email, name, surname, patronimyc, id_user } = useAppSelector(SelectUser);
  const updateUserStatus = useSelector(setUpdateUserStatus);
  const [nameState, setNameState] = useState<string>(name);
  const [surnameState, setSurnameState] = useState<string>(surname);
  const [patronimycState, setPatronimycState] = useState<string>(patronimyc);
  const [emailState, setEmailState] = useState<string>(email);
  const [phoneState, setPhoneState] = useState<string>(phone);
  const handleUpdateUser = () => {
    const updatedUserData = {
      name,
      surname,
      patronimyc,
      email,
      phone,
    };
    dispatch(updateUser({ id_user: id_user, userData: updatedUserData }));
  };

  return (
    <div className={styles.update}>
      <h2>Обновление данных пользователя</h2>
      <div className={styles.update__blocks}>
        <div className={(styles.update__leftBlock, styles.block)}>
          <div>
            <label>
              Имя:
              <input type='text' value={name} onChange={(e) => setNameState(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Фамилия:
              <input
                type='text'
                value={surname}
                onChange={(e) => setSurnameState(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Отчество (если имеется):
              <input
                type='text'
                value={patronimyc}
                onChange={(e) => setPatronimycState(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className={(styles.update__rigthBlock, styles.block)}>
          <div>
            <label>
              Почта:
              <input type='email' value={email} onChange={(e) => setEmailState(e.target.value)} />
            </label>
          </div>
          <div>
            <label className={styles.label}>
              Телефон:
              <input type='phone' value={phone} onChange={(e) => setPhoneState(e.target.value)} />
            </label>
          </div>
        </div>
      </div>
      <button onClick={handleUpdateUser}>Обновить</button>
    </div>
  );
};

export default UpdateUser;
