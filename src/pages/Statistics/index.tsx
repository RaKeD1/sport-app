import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../scss/statistics.scss';
import { Column, SortByFn, useSortBy, useTable } from 'react-table';
import Calendar from 'react-calendar';
import styles from './statistics.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  SelectTrain,
  SelectTrainError,
  SelectTrainPlayers,
  SelectTrainStatus,
  getTeamTrain,
  setDate,
  setTeam,
} from '../../redux/slices/trainSlice';
import { useAppDispatch } from '../../redux/store';
import AccordionItem from '../../components/AccordionItem';
import ActionModal, { Option } from '../../components/ActionModal';
import TeamSearchBar from '../../components/TeamSearchBar';
import { SelectAccountID, Status } from '../../redux/slices/profileSlice';
import Modal from '../../components/Modal';
import MyCalendar from '../../components/Calendar';

interface Cols {
  fio: string;
  inning_stat: string;
  blocks_stat: string;
  attacks_stat: string;
  catch_stat: string;
  defence_stat: string;
  support_stat: string;
  id_train: number;
}

export const Statistics: React.FC = () => {
  const playersStats = useSelector(SelectTrainPlayers);
  const account_id = useSelector(SelectAccountID);
  const status = useSelector(SelectTrainStatus);
  const error = useSelector(SelectTrainError);
  const { team, date } = useSelector(SelectTrain);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isChangeTrain, setIsChangeTrain] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<number>(null);
  const [activeDate, setActiveDate] = useState(null);
  const [activeTeam, setActiveTeam] = useState<Option>(null);
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  const columnNames = {
    fio: 'ФИО',
    inning_stat: 'Подача',
    blocks_stat: 'Блок',
    attacks_stat: 'Атака',
    catch_stat: 'Прием',
    defence_stat: 'Защита',
    support_stat: 'Передача',
    id_train: 'ID',
  };

  const dispatch = useAppDispatch();

  const isEven = (idx: number) => idx % 2 === 0;
  const isOdd = (idx: number) => idx % 2 === 1;
  const breakpoint = 860;

  useEffect(() => {
    dispatch(
      getTeamTrain({
        account_id,
        team: 'Бомбы',
        date: '2023-05-10',
      }),
    );

    dispatch(setTeam('Бомбы'));
    dispatch(setDate('2023-05-10'));

    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    console.log('Выбрана команда:', activeTeam);
  }, [activeTeam]);

  const onChangeDate = (value) => {
    setActiveDate(value);
    const formattedDate = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    console.log('Date', activeDate);
    console.log('Formatted Date', formattedDate);
    dispatch(setDate(formattedDate));
  };

  const onClickAddAction = (id_train: number) => {
    setActivePlayer(id_train);
    setIsActive(true);
  };

  const onDateChange = (value: string) => {
    setActiveDate(value);
  };

  const updateTrain = () => {
    dispatch(
      getTeamTrain({
        account_id,
        team: team,
        date: '2023-05-10',
      }),
    );
  };

  const playersStatsData = useMemo(() => [...playersStats], [playersStats]);

  const playersStatsColumns = useMemo<Column<Cols>[]>(
    () =>
      playersStats[0]
        ? Object.keys(playersStats[0]).map((key) => {
            return {
              Header: columnNames[key],
              accessor: key as keyof Cols,
            };
          })
        : [],
    [playersStats],
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns: Column<Cols>[]) => [
      ...columns,
      {
        id: 'Select',
        Header: '',
        Cell: ({ row, value }) => (
          <button
            className='select--button'
            onClick={() => onClickAddAction(+JSON.stringify(row.values.id_train))}>
            Добавить
          </button>
        ),
      },
    ]);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Cols>(
    {
      columns: playersStatsColumns,
      data: playersStatsData,
      initialState: {
        hiddenColumns: ['id_train'],
      },
    },
    tableHooks,
  );

  useEffect(() => {}, []);

  const toggleState = () => {
    setToggle(!toggle);
  };

  if (width < breakpoint) {
    return (
      <>
        <div className={styles.train}>
          <div className={styles.accordion}>
            {playersStats.map((obj) => (
              <AccordionItem key={obj.id_train} {...obj} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.train}>
        <div className={styles.train__date}>
          <p>Дата:</p>
          <span>{date.split('-').reverse().join('.')}</span>
        </div>
        <div className={styles.train__group}>
          <p>Группа:</p>
          <span>{team}</span>
        </div>
        <button className={styles.train__btnChange} onClick={() => setIsChangeTrain(true)}>
          Сменить тренировку
        </button>
        {status === Status.ERROR ? (
          <div className={styles.train__error}>
            <span>😕</span>
            {error}
          </div>
        ) : (
          <table className='table' {...getTableProps()}>
            <thead className='backgroud_table2'>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={index} {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, idx) => {
                prepareRow(row);

                return (
                  <tr
                    key={idx}
                    {...row.getRowProps()}
                    className={
                      isEven(idx) ? 'backgroud_table' : isOdd(idx) ? 'backgroud_table2' : ''
                    }>
                    {row.cells.map((cell, index) => (
                      <td key={index} {...row.getRowProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <ActionModal
        isActive={isActive}
        setIsActive={setIsActive}
        id_train={activePlayer}
        updateTrain={updateTrain}
      />
      <Modal isActive={isChangeTrain} setIsActive={setIsChangeTrain}>
        <div className={styles.changeModal}>
          <div className={styles.changeModal__group}>
            <p>Группа:</p>
            <TeamSearchBar setTeam={setActiveTeam} />
          </div>
          <div className={styles.changeModal__date}>
            {/* <p>Дата:</p> */}
            <MyCalendar onChange={onChangeDate} value={activeDate} />
          </div>
          <button className={styles.changeModal__btnAccept} onClick={() => setIsChangeTrain(true)}>
            Сменить тренировку
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Statistics;
