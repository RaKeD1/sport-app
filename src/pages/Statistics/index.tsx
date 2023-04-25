import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../scss/statistics.scss';
import { useTable } from 'react-table';
import axios from 'axios';
import Popup from 'reactjs-popup';
import styles from './statistics.module.scss';

export const Statistics: React.FC = () => {
  const [playersStats, setPlayersStats] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get('https://644500d8b80f57f581af0fcb.mockapi.io/playersStats')
      .catch((err) => console.log(err));

    if (response) {
      const playersStats = response.data;

      console.log('Statistics: ', playersStats);
      setPlayersStats(playersStats);
    }
  };

  const playersStatsData = useMemo(() => [...playersStats], [playersStats]);

  const playersStatsColumns = useMemo(
    () =>
      playersStats[0]
        ? Object.keys(playersStats[0])
            .filter((key) => key !== 'rating')
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [playersStats],
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Select',
        Header: '',
        Cell: ({ row }) => (
          <Popup trigger={<button className="select--button"> Добавить </button>} modal nested>
            <div>
              <h2>Модальное окно </h2>
              <button onClick={() => alert('Добавить: ' + row.values.Id)}>Добавить</button>
            </div>
          </Popup>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: playersStatsColumns,
      data: playersStatsData,
    },
    tableHooks,
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  useEffect(() => {
    fetchProducts();
  }, []);

  const isEven = (idx: number) => idx % 2 === 0;
  const isOdd = (idx: number) => idx % 2 === 1;

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 769;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
  const [toggle, setToggle] = useState(false);
  const [heightEl, setHeightEl] = useState();

  const refHeight = useRef();

  // useEffect(() => {
  //   console.log(refHeight);
  //   setHeightEl(`${refHeight.current.scrollHeight}px`);
  // }, []);

  const toggleState = () => {
    setToggle(!toggle);
  };

  console.log(toggle);

  if (width < breakpoint) {
    return (
      <div className="main">
        <div className={styles.accordion}>
          <button onClick={toggleState} className={styles.accordion_visible}>
            <span>Lorem ipsum dolor sit amet.</span>
          </button>
          <div
            className={toggle ? 'accordion-toggle animated' : 'accordion-toggle'}
            style={{ height: toggle ? `${heightEl}` : '0px' }}
            ref={refHeight}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, suscipit quae
              maiores sunt ducimus est dolorem perspiciatis earum corporis unde, dicta quibusdam aut
              placeat dignissimos distinctio vel quo eligendi ipsam.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main">
        <table {...getTableProps()}>
          <thead className="backgroud_table2">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, idx) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  className={
                    isEven(idx) ? 'backgroud_table' : isOdd(idx) ? 'backgroud_table2' : ''
                  }>
                  {row.cells.map((cell) => (
                    <td {...row.getRowProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Statistics;
