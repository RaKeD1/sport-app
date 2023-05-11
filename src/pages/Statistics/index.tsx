import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../scss/statistics.scss';
import { useTable } from 'react-table';
import axios from 'axios';
import Popup from 'reactjs-popup';
import styles from './statistics.module.scss';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

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
  const breakpoint = 860;
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
  const navigate = useNavigate();
  const [playerStats, setPlayerStats] = React.useState<{
    Id: string;
    FIO: string;
    Feeds: number;
    Blocks: number;
    Attacks: number;
    Techniques: number;
    Defenses: number;
    Transfers: number;
  }>();
  React.useEffect(() => {
    async function fetchPlayer() {
      try {
        const { data } = await axios.get(
          'https://644500d8b80f57f581af0fcb.mockapi.io/playersStats',
        );
        setPlayerStats(data);
      } catch (error) {
        alert('Ошибка!');
        navigate('/');
      }
    }

    fetchPlayer();
  }, []);

  const Accordion = ({ FIO, name, Feeds, Blocks }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className={styles.accordion_item}>
        <div className={styles.accordion_title} onClick={() => setIsActive(!isActive)}>
          <div>{FIO}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && (
          <div className={styles.accordion_content}>
            <div className={styles.accordion_content_list}>
              <div></div>
              <div>{name}</div>
              <div className={styles.accordion_content_rez}>{Feeds}</div>
            </div>
            <div className={styles.accordion_content_list}>
              <div>{Blocks}</div>
              <div className={styles.accordion_content_rez}>{Blocks}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (width < breakpoint) {
    return (
      <>
        <div className="main">
          <div className={styles.accordion}>
            {playersStats.map(({ FIO, name, Feeds, Blocks }) => (
              <Accordion FIO={FIO} name={name} Feeds={Feeds} Blocks={Blocks} />
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
