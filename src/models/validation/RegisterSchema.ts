import * as Yup from 'yup';
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email('Некорректный email')
    .max(100, 'Максимальная длина 100 символов')

    //не сабмитим, если поле не заполнено
    .required('Обязательное поле'),
  name: Yup.string().required('Обязательное поле'),
  surname: Yup.string().required('Обязательное поле'),
  patronimyc: Yup.string(),
  phone: Yup.string()
    .matches(phoneRegExp, 'Телефон должен содержать 10 цифр')
    .required('Обязательное поле'),
  team: Yup.string(),
  login: Yup.string().required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Пароль должен быть длинее 3 символов')
    .required('Обязательное поле'),
  passwordCheck: Yup.string()
    .required('Обязательное поле')
    .test('password-match', 'Пароли должны совпадать', function (value: string) {
      return this.parent.password === value;
    }),
});
export default RegisterSchema;
