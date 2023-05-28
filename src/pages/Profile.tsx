import { FC, useEffect, useRef, useState } from 'react';
import '../scss/profile.scss';
import { SelectUser, logoutAccount } from '../redux/slices/profileSlice';
import { useAppDispatch } from '../redux/store';
import { useAppSelector } from '../hooks/redux';
import UpdateUser from '../components/UpdateDataUser';
import ProfileInfo from '../components/ProfileInfo';
import Modal from '../components/Modal';
import UserStatCircles from '../components/UserStatCircles';
import UploadPhoto from '../components/UploadPhoto';

export const Profile: FC = () => {
  const user = useAppSelector(SelectUser);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changePhotoModal, setChangePhotoModal] = useState<boolean>(false);

  return (
    <>
      <div className='tiles'>
        <ProfileInfo
          data={user}
          onClickEdit={setShowModal}
          onClickEditPhoto={setChangePhotoModal}
        />
        <UserStatCircles user={user.id_account} />
      </div>
      <div className='buttons__user'>
        <button onClick={() => dispatch(logoutAccount())}>Выйти</button>
      </div>
      <Modal isActive={showModal} setIsActive={setShowModal}>
        <UpdateUser setIsActive={setShowModal} />
      </Modal>
      <Modal isActive={changePhotoModal} setIsActive={setChangePhotoModal}>
        <UploadPhoto onSend={setChangePhotoModal} />
      </Modal>
    </>
  );
};
export default Profile;
