import React from 'react';

type AuthInputsProps = {
  placeholder: string;
  type: string;
};

export const AuthInputs: React.FC<AuthInputsProps> = ({ placeholder, type }) => {
  return (
    <div className='auth__for-input'>
      <input className='auth__input input' placeholder={placeholder} type={type}></input>
    </div>
  );
};

export default AuthInputs;
