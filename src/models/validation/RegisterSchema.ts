import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email('Некорректный email')
    .max(100, 'Максимальная длина 100 символов')
    //не сабмитим, если поле не заполнено
    .required('Обязательное поле'),
  fio: Yup.string().required('Обязательное поле'),
  phone: Yup.string().required('Обязательное поле'),
  group: Yup.string(),
  login: Yup.string().required('Обязательное поле'),
  password: Yup.string()
    .min(3, 'Пароль должен быть длинее 3 символов')
    .required('Обязательное поле'),
  passwordCheck: Yup.string()
    .required('Обязательное поле')
    .test('password-match', 'Пароли должны совпадать', function (value) {
      return this.parent.password === value;
    }),
});
export default RegisterSchema;
