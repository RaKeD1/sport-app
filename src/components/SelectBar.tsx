import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { Option } from './ActionModal';

interface SelectBarProps {
  data: string[];
  selectedCondition: Option;
  setSelectedCondition: (selected: Option) => void;
}

const SelectBar: FC<SelectBarProps> = ({ data, selectedCondition, setSelectedCondition }) => {
  const [options, setOptions] = useState(data.map((option) => ({ value: option, label: option })));
  const [selected, setSelected] = useState<Option>(null);

  useEffect(() => {
    setOptions(data.map((option) => ({ value: option, label: option })));
    console.log(options);
  }, [data]);

  const handleChange = (selectedOption: Option) => {
    setSelected(selectedOption);
    setSelectedCondition(selectedOption);
  };

  return (
    <>
      <Select
        className='basic-single'
        classNamePrefix='select'
        key={`my_unique_select_key__${selectedCondition}`}
        value={selectedCondition}
        placeholder='Выберите условие'
        noOptionsMessage={() => 'Нет условий'}
        getOptionLabel={(e: Option) => e.label}
        getOptionValue={(e: Option) => e.value}
        name='condition'
        options={options}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default SelectBar;
