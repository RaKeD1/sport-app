import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../scss/statistics.scss';
import qs from 'qs';
import { Column, useSortBy, useTable } from 'react-table';
import styles from './statistics.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { Option } from '../../components/ActionModal';
import TeamSearchBar from '../../components/TeamSearchBar';
import { SelectAccountID, Status } from '../../redux/slices/profileSlice';
import Modal from '../../components/Modal';
import MyCalendar from '../../components/Calendar';
import classNames from 'classnames';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import Accordion from '../../components/AccordionTrain';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import DataSkeleton from '../../components/DataSkeleton';
import { Cols } from '../TrainingEdit';
import {
  SelectTeamStat,
  SelectTeamStatPlayers,
  StatParams,
  getTeamRangeStat,
  setDateEnd,
  setDateStart,
  setStatParams,
  setStatTeam,
} from '../../redux/slices/statSlice';
import ProgressCircle from '../../components/ProgressCircle';

export const columnNames = {
  fio: 'ФИО',
  inning_stat: 'Подача',
  blocks_stat: 'Блок',
  attacks_stat: 'Атака',
  catch_stat: 'Прием',
  defence_stat: 'Защита',
  support_stat: 'Передача',
};

export interface OptionDate {
  value: Date;
  label: Date;
}

export const Statistics: React.FC = () => {
  const playersRangeStat = useSelector(SelectTeamStatPlayers);
  const { status, error, team, date_start, date_end } = useSelector(SelectTeamStat);
  const account_id = useSelector(SelectAccountID);
  const [isChangeTrain, setIsChangeTrain] = useState<boolean>(false);
  const [activeDateRange, setActiveDateRange] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState('');
  const [activeEndDate, setActiveEndDate] = useState(null);
  const [isValidModal, setIsValidModal] = useState(false);
  const [activeTeam, setActiveTeam] = useState<Option>(null);
  const [playersStats, setPlayersStats] = useState(playersRangeStat);
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const isSearch = React.useRef(false);
  const isMounted = useRef(false);

  console.log('playersRangeStat in statistics', playersRangeStat);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isEven = (idx: number) => idx % 2 === 0;
  const isOdd = (idx: number) => idx % 2 === 1;

  const [matches, setMatches] = useState(window.matchMedia('(min-width: 860px)').matches);

  useEffect(() => {
    window
      .matchMedia('(min-width: 860px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  useEffect(() => {
    console.log('useEffect [] /statistics');
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as StatParams;

      dispatch(
        setStatParams({
          team: params.team,
          date_start: params.date_start,
          date_end: params.date_end,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    console.log('useEffect [team, date_start, date_end] /statistics');
    if (isMounted.current && team) {
      const queryString = qs.stringify({
        team: team,
        date_start: date_start,
        date_end: date_end,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [team, date_start, date_end]);

  // Если был первый рендер, то запрашиваем тренировку
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('useEffect [team, date_start, date_end], isSearch.current=', isSearch.current);

    if (isSearch.current && isMounted.current) {
      dispatch(
        getTeamRangeStat({
          account_id,
          team,
          date_start,
          date_end,
        }),
      );
    }
    isSearch.current = false;
  }, [team, date_start, date_end]);

  useEffect(() => {
    console.log('useEffect [isChangeTrain] /statistics');
    if (isChangeTrain) {
      setActiveStartDate(null);
      setActiveEndDate(null);
    }
  }, [isChangeTrain]);

  useEffect(() => {
    console.log('useEffect [activeStartDate, activeTeam] /statistics');
    if (activeStartDate && activeTeam) {
      setIsValidModal(true);
    } else {
      setIsValidModal(false);
    }
  }, [activeStartDate, activeTeam]);

  useEffect(() => {
    console.log('useEffect [playersRangeStat] /statistics');
    console.log('playersRangeStat in statistics useEffect', playersRangeStat);
    setPlayersStats(playersRangeStat);
  }, [playersRangeStat]);

  const dateConvertToIso = (date) => {
    console.log('in dateCionvert');
    let z = date.getTimezoneOffset() * 60 * 1000;
    let tLocal: any = date - z;
    tLocal = new Date(tLocal);
    let iso = tLocal.toISOString();
    iso = iso.split('.')[0];
    iso = iso.replace('T', ' ').split(' ')[0];
    return iso;
  };

  const onChangeDate = async (value) => {
    console.log('onChangeDate /statistics');
    console.log('value', value);
    setActiveDateRange(value);
    setActiveStartDate(dateConvertToIso(value[0]));
    setActiveEndDate(dateConvertToIso(value[1]));
    console.log('Date Range', activeDateRange);
    console.log('Start Date', activeStartDate);
    console.log('End Date', activeEndDate);
  };

  const changeTrain = () => {
    console.log('changeTrain /statistics');
    setIsChangeTrain(false);
    console.log('team:', team);
    dispatch(setStatTeam(activeTeam.value));
    dispatch(setDateStart(activeStartDate));
    dispatch(setDateEnd(activeEndDate));
    dispatch(
      getTeamRangeStat({
        account_id,
        team: activeTeam.value,
        date_start: activeStartDate,
        date_end: activeEndDate,
      }),
    );
  };

  const playersStatsData = useMemo(
    () =>
      playersStats.map((obj) => {
        const newObj = { ...obj };
        for (var key in newObj) {
          if (newObj.hasOwnProperty(key)) {
            if (key !== 'fio' && key !== 'id_train') {
              // const num = String(newObj[key]).replace('0.', '');
              // newObj[key] = num + (num.length === 1 && num !== '0' ? '0%' : '%');
              console.log(typeof newObj[key]);
              newObj[key] = Number(newObj[key] * 100).toFixed() + '%';
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
    [playersStats, location],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Cols>(
    {
      columns: playersStatsColumns,
      data: playersStatsData,
      initialState: {
        hiddenColumns: ['id_train'],
      },
    },
    useSortBy,
  );

  return (
    <>
      <div className={styles.train}>
        <div className={styles.train__date}>
          <p>Дата:</p>

          {date_start || date_end ? (
            <>
              <span>
                {date_start.slice(0, 10).split('-').reverse().join('.')} —{' '}
                {date_end
                  ? date_end.slice(0, 10).split('-').reverse().join('.')
                  : new Date().toISOString().slice(0, 10).split('-').reverse().join('.')}
              </span>
            </>
          ) : (
            <DataSkeleton width={110} height={27} />
          )}
        </div>
        <div className={styles.train__group}>
          <p>Группа:</p>
          {team ? <span>{team}</span> : <DataSkeleton width={70} height={27} />}
        </div>
        <button
          className={classNames(styles.train__btnChange, {
            [styles.pulse]: playersStats.length === 0 && status !== Status.ERROR && !isChangeTrain,
          })}
          onClick={() => setIsChangeTrain(true)}>
          Сменить тренировку
        </button>
        {playersStats.length === 0 && status !== Status.ERROR ? (
          <div className={styles.train__error}>
            <span>😕</span>
            Выберите промежуток дат и группу.
          </div>
        ) : status === Status.ERROR || (playersStats.length === 0 && status !== Status.LOADING) ? (
          <div className={styles.train__error}>
            <span>😕</span>
            {error ? error : 'Произошла ошибка'}
            <p>Введите данные еще раз или повторите попытку позже.</p>
          </div>
        ) : status === Status.LOADING ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            {!matches ? (
              <>
                <Accordion playersStats={playersStats} buttonEnabled={false} />
              </>
            ) : (
              <table
                className='table'
                {...getTableProps()}
                style={{ borderRadius: '5px !important' }}>
                <thead className='backgroud_table2'>
                  {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          key={index}
                          className={classNames(styles.table__header__column)}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps({ title: undefined }),
                          )}>
                          {column.render('Header')}
                          {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <AiOutlineCaretDown
                                  title='По убыванию'
                                  className={styles.sortIcon}
                                />
                              ) : (
                                <AiOutlineCaretUp
                                  title='По возрастанию'
                                  className={styles.sortIcon}
                                />
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
          </>
        )}
      </div>
      <Modal isActive={isChangeTrain} setIsActive={setIsChangeTrain}>
        <div className={styles.changeModal}>
          <div className={styles.changeModal__group}>
            <p>Группа:</p>
            <TeamSearchBar setTeam={setActiveTeam} />
          </div>
          <div className={styles.changeModal__date}>
            {/* <p>Дата:</p> */}
            <MyCalendar
              onChange={onChangeDate}
              selectRange={true}
              dates={[]}
              value={activeDateRange}
              disableTiles={false}
            />
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
