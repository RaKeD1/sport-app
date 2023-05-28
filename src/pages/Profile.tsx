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
import ProfileInfo from '../components/ProfileInfo';
import Modal from '../components/Modal';

export const Profile: FC = () => {
  const { id_user, id_account, name, surname, patronimyc, email, phone } =
    useAppSelector(SelectUser);
  const user = useAppSelector(SelectUser);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <ProfileInfo data={user} onClickEdit={setShowModal} />
      <Modal isActive={showModal} setIsActive={setShowModal}>
        <UpdateUser setIsActive={setShowModal} />
      </Modal>
    </>
  );
};
export default Profile;
