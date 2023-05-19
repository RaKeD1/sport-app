import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../scss/statistics.scss';
import qs from 'qs';
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
  TrainParams,
  setTrainParams,
} from '../../redux/slices/trainSlice';
import { useAppDispatch } from '../../redux/store';
import ActionModal, { Option } from '../../components/ActionModal';
import TeamSearchBar from '../../components/TeamSearchBar';
import { SelectAccountID, Status } from '../../redux/slices/profileSlice';
import Modal from '../../components/Modal';
import MyCalendar from '../../components/Calendar';
import classNames from 'classnames';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import Accordion from '../../components/AccordionTrain';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { SelectTrainActions, getTrainActions } from '../../redux/slices/actionsSlice';

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

export const columnNames = {
  fio: 'ФИО',
  inning_stat: 'Подача',
  blocks_stat: 'Блок',
  attacks_stat: 'Атака',
  catch_stat: 'Прием',
  defence_stat: 'Защита',
  support_stat: 'Передача',
  id_train: 'ID',
};

export const Statistics: React.FC = () => {
  const playersStats = useSelector(SelectTrainPlayers);
  const actions = useSelector(SelectTrainActions);
  const account_id = useSelector(SelectAccountID);
  const status = useSelector(SelectTrainStatus);
  const error = useSelector(SelectTrainError);
  const { team, date } = useSelector(SelectTrain);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isChangeTrain, setIsChangeTrain] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<number>(null);
  const [activeDate, setActiveDate] = useState(null);
  const [isValidModal, setIsValidModal] = useState(false);
  const [activeTeam, setActiveTeam] = useState<Option>(null);
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const isSearch = React.useRef(false);
  const isMounted = useRef(false);

  console.log('playersStats', playersStats);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEven = (idx: number) => idx % 2 === 0;
  const isOdd = (idx: number) => idx % 2 === 1;
  const breakpoint = 860;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as TrainParams;

      dispatch(
        setTrainParams({
          team: params.team,
          date: params.date,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        team: team,
        date: date,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [team, date]);

  // Если был первый рендер, то запрашиваем тренировку
  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log('useEffect [team, date], isSearch.current=', isSearch.current);

    if (isSearch.current && isMounted.current) {
      dispatch(
        getTeamTrain({
          account_id,
          team,
          date,
        }),
      );
      dispatch(
        getTrainActions({
          team,
          date,
        }),
      );
    }
    isSearch.current = false;
  }, [team, date]);

  useEffect(() => {
    if (isChangeTrain) {
      setActiveDate(null);
    }
  }, [isChangeTrain]);

  useEffect(() => {
    if (activeDate && activeTeam) {
      setIsValidModal(true);
    } else {
      setIsValidModal(false);
    }
  }, [activeDate, activeTeam]);

  useEffect(() => {
    dispatch(
      getTrainActions({
        team,
        date,
      }),
    );
  }, [playersStats]);

  const onChangeDate = (value) => {
    setActiveDate(value);
    console.log('Date', activeDate);
  };

  const onClickAddAction = (id_train: number) => {
    console.log('id_train in onClickAddAction', id_train);
    setActivePlayer(id_train);
    setIsActive(true);
  };

  const changeTrain = () => {
    setIsChangeTrain(false);
    console.log('team:', team);
    console.log('date:', date);
    const formattedDate = `${activeDate.getFullYear()}-${
      activeDate.getMonth() + 1
    }-${activeDate.getDate()}`;
    console.log('Formatted Date', formattedDate);
    dispatch(setTeam(activeTeam.value));
    dispatch(setDate(formattedDate));
    dispatch(
      getTeamTrain({
        account_id,
        team: activeTeam.value,
        date: formattedDate,
      }),
    );
    dispatch(
      getTrainActions({
        team: activeTeam.value,
        date: formattedDate,
      }),
    );
  };

  const updateTrain = () => {
    console.log('team:', team);
    console.log('date:', date);
    dispatch(
      getTeamTrain({
        account_id,
        team,
        date,
      }),
    );
    dispatch(
      getTrainActions({
        team: team,
        date: date,
      }),
    );
  };

  // const playersStatsData = useMemo(() => [...playersStats], [playersStats]);
  const playersStatsData = useMemo(
    () =>
      playersStats.map((obj) => {
        const newObj = { ...obj };
        for (var key in newObj) {
          if (newObj.hasOwnProperty(key)) {
            if (key !== 'fio' && key !== 'id_train') {
              const num = String(newObj[key]).replace('0.', '');
              newObj[key] = num + (num.length === 1 && num !== '0' ? '0%' : '%');
            }
          }
        }
        return newObj;
      }),
    [playersStats],
  );

  console.log(playersStatsData);

  const playersStatsColumns = useMemo<Column<Cols>[]>(
    () =>
      playersStats[0]
        ? Object.keys(playersStats[0]).map((key) => {
            return {
              Header: () => <div title='Сортировать'>{columnNames[key]}</div>,
              accessor: key as keyof Cols,
              disableSortBy: false,
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
    useSortBy,
  );

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
        <button
          className={classNames(styles.train__btnChange)}
          onClick={() => setIsChangeTrain(true)}>
          Сменить тренировку
        </button>
        {status === Status.ERROR || (playersStats.length === 0 && status !== Status.LOADING) ? (
          <div className={styles.train__error}>
            <span>😕</span>
            {error ? error : 'Произошла ошибка'}
          </div>
        ) : status === Status.LOADING ? (
          <>
            <LoadingSpinner />
          </>
        ) : width < breakpoint ? (
          <>
            <Accordion playersStats={playersStats} onClickAddAction={onClickAddAction} />
          </>
        ) : (
          <table className='table' {...getTableProps()} style={{ borderRadius: '5px !important' }}>
            <thead className='backgroud_table2'>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={index}
                      className={classNames(styles.table__header__column)}
                      {...column.getHeaderProps(column.getSortByToggleProps({ title: undefined }))}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <AiOutlineCaretDown title='По убыванию' className={styles.sortIcon} />
                          ) : (
                            <AiOutlineCaretUp title='По возрастанию' className={styles.sortIcon} />
                          )
                        ) : (
                          ''
                        )}
                      </span>
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
                      <td
                        key={index}
                        className={index === row.cells.length - 1 ? 'btn_cell' : ''}
                        {...row.getRowProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className={styles.actions}>
          <h3 className={styles.actions__title}>Последние действия</h3>
          <div className={styles.actions__list}>
            {actions
              .map((obj) => (
                <div className={styles.actions__item}>
                  <div className={styles.actions__item__time}>
                    {obj.time.split('').splice(0, 8).join('')}
                  </div>
                  <div className={styles.actions__item__header}>
                    <div className={styles.actions__item__player}>{obj.fio}</div>
                    <div className={styles.actions__item__actionName}>
                      <span>{obj.name_action}</span>
                    </div>
                  </div>
                  <div className={styles.actions__item__result}>
                    Результат:<span>{obj.result}</span>
                  </div>
                  {obj.condition && (
                    <div className={styles.actions__item__condition}>
                      Условие:<span>{obj.condition}</span>
                    </div>
                  )}
                </div>
              ))
              .reverse()}
          </div>
        </div>
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
          <button
            disabled={!isValidModal}
            className={classNames(styles.changeModal__btnAccept, {
              [styles.changeModal__btnAccept_notValid]: !isValidModal,
            })}
            onClick={() => changeTrain()}>
            Сменить тренировку
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Statistics;
