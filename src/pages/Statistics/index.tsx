import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../scss/statistics.scss';
import { Column, SortByFn, useSortBy, useTable } from 'react-table';
import axios from 'axios';
import Popup from 'reactjs-popup';
import styles from './statistics.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SelectTrainPlayers, getTeamTrain } from '../../redux/slices/trainSlice';
import { useAppDispatch } from '../../redux/store';
import AccordionItem from '../../components/AccordionItem';
import ActionModal from '../../components/ActionModal';

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
  const [toggle, setToggle] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<number>(null);
  const [heightEl, setHeightEl] = useState();
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

  const refHeight = useRef();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEven = (idx: number) => idx % 2 === 0;
  const isOdd = (idx: number) => idx % 2 === 1;
  const breakpoint = 860;

  useEffect(() => {
    dispatch(
      getTeamTrain({
        account_id: 2,
        team: 'Бомбы',
        date: '2023-05-10',
      }),
    );

    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };

    console.log(refHeight);
    // setHeightEl(`${refHeight.current.scrollHeight}px`);
  }, []);

  const onClickAddAction = (id_train: number) => {
    setActivePlayer(id_train);
    setIsActive(true);
  };

  const updateTrain = () => {
    dispatch(
      getTeamTrain({
        account_id: 2,
        team: 'Бомбы',
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
          // <Popup trigger={<button className='select--button'> Добавить </button>} modal nested>
          //   <div>
          //     <h2>Модальное окно </h2>
          //     <button onClick={() => alert('Добавить: ' + JSON.stringify(row.values.id_train))}>
          //       Добавить
          //     </button>
          //   </div>
          // </Popup>
          <button
            className="select--button"
            onClick={() => onClickAddAction(+JSON.stringify(row.values.id_train))}>
            Добавить
          </button>
          // <ActionPopup  />
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

  console.log(toggle);
  const accordionData = [
    {
      title: 'Section 1',
      content: `Lorem: `,
    },
    {
      title: 'Section 2',
      content: `Lorem: `,
    },
    {
      title: 'Section 3',
      content: `Sapiente: `,
    },
  ];

  if (width < breakpoint) {
    return (
      <>
        <div className="main">
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
      <div className="main">
        <table className="table" {...getTableProps()}>
          <thead className="backgroud_table2">
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
      </div>
      <ActionModal
        isActive={isActive}
        setIsActive={setIsActive}
        id_train={activePlayer}
        updateTrain={updateTrain}
      />
    </>
  );
};

export default Statistics;
