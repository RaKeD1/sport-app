import React, { FC, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import TrainService from '../services/TrainService';
import { Option } from './ActionModal';

type Props = {
  setTeam: (value) => void;
};

type Team = {
  day_team: string;
};

const TeamSearchBar: FC<Props> = ({ setTeam }) => {
  //get animated components wrapper
  const animatedComponents = makeAnimated();

  const fetchTeams = async () => {
    try {
      const fetch = await TrainService.getTeams();
      console.log('fetch', fetch.data);
      return fetch.data;
    } catch (error) {
      console.log(error.response?.data?.message);
      return [];
    }
  };

  // fetch filteres search results for dropdown
  const loadOptions = (inputValue: string, callback) => {
    console.log('in load options');
    fetchTeams().then((data) => {
      const filtered = data.filter((item) => item.includes(inputValue));
      console.log(filtered);
      const res = filtered.map((team) => {
        const obj = { value: team, label: team };
        return obj;
      });
      console.log('res', res);
      callback(res);
    });
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        placeholder='Выберите команду'
        noOptionsMessage={() => 'Команда не найдена'}
        defaultOptions
        isClearable={true}
        components={animatedComponents}
        getOptionLabel={(e: Option) => e.label}
        getOptionValue={(e: Option) => e.value}
        loadOptions={loadOptions}
        onChange={(selected: Option) => setTeam(selected)}
      />
    </>
  );
};

export default TeamSearchBar;
