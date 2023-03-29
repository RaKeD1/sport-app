import React from 'react';

type AuthInputsProps = {
  placeholder: string;
  type: string;
  onChangeInput: (value: string) => void;
};

export const AuthInputs: React.FC<AuthInputsProps> = ({ placeholder, type, onChangeInput }) => {
  const [value, setValue] = React.useState<string>('');

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeInput(event.target.value);
  };

  return (
    <div className='auth__for-input'>
      <input
        value={value}
        onChange={onChangeInputValue}
        className='auth__input input'
        placeholder={placeholder}
        type={type}></input>
    </div>
  );
};

export default AuthInputs;
