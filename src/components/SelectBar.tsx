import { FC, useEffect, useState } from 'react';
import Select from 'react-select';

type Option = {
  value: string;
  label: string;
};

interface SelectBarProps {
  data: string;
  setSelectedCondition: (value: string) => void;
}

const SelectBar: FC<SelectBarProps> = ({ data, setSelectedCondition }) => {
  const [options, setOptions] = useState(
    data.split('; ').map((option) => ({ value: option, label: option })),
  );

  useEffect(() => {
    setOptions(data.split('; ').map((option) => ({ value: option, label: option })));
    console.log(options);
  }, [data]);

  const handleChange = (selectedOption: string) => {
    setSelectedCondition(selectedOption);
  };

  return (
    <>
      <Select
        className='basic-single'
        classNamePrefix='select'
        placeholder='Выберите условие'
        noOptionsMessage={() => 'Нет условий'}
        getOptionLabel={(e: Option) => e.label}
        getOptionValue={(e: Option) => e.value}
        name='condition'
        options={options}
        onChange={(e) => handleChange(e.value)}
      />
    </>
  );
};

export default SelectBar;
