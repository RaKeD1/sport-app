import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { updateUser } from '../../redux/slices/profileSlice';
import styles from './UpdateDataUser.module.scss';
import MaskedInput from 'react-text-mask';
import { phoneNumberMask } from '../RegistrForm';

const UpdateUser = (props) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: props.user.name,
    surname: props.user.surname,
    patronimyc: props.user.patronimyc,
    email: props.user.email,
    phone: props.user.phone,
    team: props.user.team,
  });
  const [errorsState, setErrorsState] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    patronimyc: '',
    team: '',
  });
  const [disable, setDisable] = useState(true);
  // Заносим данные при первой загрузке
  useEffect(() => {
    setFormData({
      name: props.user.name,
      surname: props.user.surname,
      patronimyc: props.user.patronimyc,
      email: props.user.email,
      phone: props.user.phone,
      team: props.user.team,
    });

    setDisable(true);
  }, [props.user, phoneNumberMask]);
  //обновляем стейт с disable для кнопки если все данные
  //введены без ошибок и изменилось хотя бы одно поле
  useEffect(() => {
    const areAllErrorsEmpty = Object.values(errorsState).every((error) => error === '');
    if (
      (formData.name !== props.user.name ||
        formData.surname !== props.user.surname ||
        formData.phone !== props.user.phone ||
        formData.email !== props.user.email ||
        formData.patronimyc !== props.user.patronimyc ||
        formData.team !== props.user.team) &&
      areAllErrorsEmpty
    ) {
      setDisable(false);
    } else setDisable(true);
  }, [formData, errorsState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const validationFunctions = {
      name: (value) => {
        if (/\d/.test(value)) {
          return 'Имя не должно содержать цифры';
        } else {
          return '';
        }
      },
      surname: (value) => {
        if (/\d/.test(value)) {
          return 'Фамилия не должна содержать цифры';
        } else {
          return '';
        }
      },
      patronimyc: (value) => {
        if (/\d/.test(value)) {
          return 'Отчество не должно содержать цифры';
        } else {
          return '';
        }
      },
      phone: (value) => {
        return '';
      },

      email: (value) => {
        return '';
      },
      team: (value) => {
        return '';
      },
      // Add more fields and validation functions
    };

    setErrorsState((prevErrors) => ({
      ...prevErrors,
      [name]: validationFunctions[name](value),
    }));
  };

  const handleUpdateUser = () => {
    const changedPhone = formData.phone
      .replace(/\)/g, '')
      .replace(/\(/g, '')
      .replace(/-/g, '')
      .replace(/ /g, '');
    console.log(changedPhone);
    if (window.confirm('Обновить данные?')) {
      const updatedUserData = {
        name: formData.name,
        surname: formData.surname,
        patronimyc: formData.patronimyc,
        email: formData.email,
        phone: changedPhone,
        login: props.user.login,
        team: formData.team,
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
                name='name'
                value={formData.name}
                onChange={handleChange}
                autoComplete='off'
                pattern='[^\d]{0,36}'
                required
              />
              {errorsState.name && <div className={styles.error}>{errorsState.name}</div>}
            </label>
          </div>
          <div>
            <label>
              Фамилия:
              <input
                type='text'
                name='surname'
                value={formData.surname}
                onChange={handleChange}
                pattern='[^\d]{0,36}'
                required
              />
              {errorsState.surname && <div className={styles.error}>{errorsState.surname}</div>}
            </label>
          </div>
          <div>
            <label>
              Отчество (если имеется):
              <input
                type='text'
                name='patronimyc'
                value={formData.patronimyc}
                onChange={handleChange}
                autoComplete='off'
              />
              {errorsState.patronimyc && (
                <div className={styles.error}>{errorsState.patronimyc}</div>
              )}
            </label>
          </div>
        </div>
        <div className={(styles.update__rigthBlock, styles.block)}>
          <div>
            <label>
              Почта:
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                autoComplete='off'
                maxLength={100}
                required
              />
              {errorsState.email && <div className={styles.error}>{errorsState.email}</div>}
            </label>
          </div>
          <div>
            <label className={styles.label}>
              Телефон:
              <MaskedInput
                required
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                autoComplete='off'
                mask={phoneNumberMask}
              />
              {errorsState.phone && <div className={styles.error}>{errorsState.phone}</div>}
            </label>
          </div>
          <div>
            <label>
              Группа:
              <input
                type='text'
                name='team'
                value={formData.team}
                onChange={handleChange}
                autoComplete='off'
                maxLength={50}
              />
              {errorsState.team && <div className={styles.error}>{errorsState.team}</div>}
            </label>
          </div>
        </div>
      </div>
      <button
        type='submit'
        style={{ opacity: disable ? '0.5' : '1' }}
        onClick={handleUpdateUser}
        disabled={disable}>
        Обновить
      </button>
    </div>
  );
};

export default UpdateUser;

// import { FC, useState, useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { setUpdateUserStatus, updateUser } from '../../redux/slices/profileSlice';
// import { useSelector } from 'react-redux';
// import styles from './UpdateDataUser.module.scss';
// import MaskedInput from 'react-text-mask';
// import { phoneNumberMask } from '../RegistrForm';

// const UpdateUser = (props) => {
//   console.log('props', props);
//   const dispatch = useAppDispatch();
//   const updateUserStatus = useSelector(setUpdateUserStatus);
//   const [nameState, setNameState] = useState<string>('');
//   const [surnameState, setSurnameState] = useState<string>('');
//   const [patronimycState, setPatronimycState] = useState<string>('');
//   const [emailState, setEmailState] = useState<string>('');
//   const [phoneState, setPhoneState] = useState<string>('');
//   const [disable, setDisable] = useState<boolean>(true);

//   const [errors, setErrors] = useState({
//     name: 'Проверьте правильно введенных данных',
//     surname: '',
//     error:false,
//     // Add more fields if needed
//   });

//   useEffect(() => {
//     setNameState(props.user.name);
//     setSurnameState(props.user.surname);
//     setPatronimycState(props.user.patronimyc);
//     setEmailState(props.user.email);
//     setPhoneState(props.user.phone);
//     setDisable(true);
//   }, [props.user]);

//   useEffect(() => {
//     console.log('произошло изменение ', disable);
//     if (
//       (nameState !== props.user.name ||
//         surnameState !== props.user.surname ||
//         patronimycState !== props.user.patronimyc ||
//         emailState !== props.user.email ||
//         phoneState !== props.user.phone) &&
//       errors.error
//     ) {
//       setDisable(false);
//     }
//   }, [nameState]);

//   const handleUpdateUser = () => {
//     if (window.confirm('Обновить данные?')) {
//       const updatedUserData = {
//         name: nameState,
//         surname: surnameState,
//         patronimyc: patronimycState,
//         email: emailState,
//         phone: phoneState,
//         login: props.user.login,
//       };
//       props.setIsActive(false);
//       dispatch(updateUser({ id_user: props.user.id_user, userData: updatedUserData }));
//       if (props.isUpdate) {
//         props.isUpdate(true);
//       }
//     }
//   };

//   return (
//     <div className={styles.update}>
//       <h2>Обновление данных пользователя</h2>
//       <div className={styles.update__blocks}>
//         <div className={(styles.update__leftBlock, styles.block)}>
//           <div>
//             <label>
//               Имя:
//               <input
//                 type='text'
//                 value={nameState}
//                 onChange={handleNameChange}
//                 autoComplete='off'
//                 pattern='[^\d]{0,36}'
//                 required
//               />
//               {nameError && <div>{nameError}</div>}
//             </label>
//           </div>
//           <div>
//             <label>
//               Фамилия:
//               <input
//                 type='text'
//                 value={surnameState}
//                 onChange={(e) => setSurnameState(e.target.value)}
//                 pattern='[^\d]{0,36}'
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Отчество (если имеется):
//               <input
//                 type='text'
//                 value={patronimycState}
//                 onChange={(e) => setPatronimycState(e.target.value)}
//                 autoComplete='off'
//               />
//             </label>
//           </div>
//         </div>
//         <div className={(styles.update__rigthBlock, styles.block)}>
//           <div>
//             <label>
//               Почта:
//               <input
//                 type='email'
//                 value={emailState}
//                 onChange={(e) => setEmailState(e.target.value)}
//                 autoComplete='off'
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label className={styles.label}>
//               Телефон:
//               <MaskedInput
//                 required
//                 type='tel'
//                 name='phone'
//                 value={phoneState}
//                 onChange={(e) => setPhoneState(e.target.value)}
//                 autoComplete='off'
//                 mask={phoneNumberMask}
//               />
//             </label>
//           </div>
//         </div>
//       </div>
//       <button
//         type='submit'
//         style={{ opacity: disable ? '0.5' : '1' }}
//         onClick={handleUpdateUser}
//         disabled={disable}>
//         Обновить
//       </button>
//     </div>
//   );
// };

// export default UpdateUser;
