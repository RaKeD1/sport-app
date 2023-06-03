import React, { FC, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import $api from '../http';
import UserService from '../services/UserService';
import { ISelectUser } from '../models/ISelectUser';
import { useSelector } from 'react-redux';
import { SelectAccountID } from '../redux/slices/profileSlice';

type Props = {
  setCollabs: (value) => void;
  isMulti: boolean;
  isClearable: boolean;
};

type Player = {
  player: string;
  player_id: number;
};

const UserSearchBar: FC<Props> = ({ setCollabs, isMulti, isClearable }) => {
  const myId = useSelector(SelectAccountID);
  //get animated components wrapper
  const animatedComponents = makeAnimated();

  const fetchUsers = async () => {
    try {
      const fetch = await $api.get<ISelectUser[]>('/select-users');
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
    fetchUsers().then((data) => {
      const users = data
        .filter((player) => player.id_account !== myId)
        .map((obj) => {
          const player = {
            ...obj,
            player: obj.surname + ' ' + obj.name + ' ' + obj.patronimyc,
          };
          return player;
        });
      const res = users.filter((data) => data.player.includes(inputValue));
      console.log(res);
      callback(res);
    });
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        placeholder='Выберите участника'
        noOptionsMessage={() => 'Игрок не найден'}
        defaultOptions
        isClearable={isClearable}
        isMulti={isMulti}
        components={animatedComponents}
        getOptionLabel={(e: Player) => e.player}
        getOptionValue={(e: Player) => e.player}
        loadOptions={loadOptions}
        onChange={(value) => setCollabs(value)}
      />
    </>
  );
};

export default UserSearchBar;
