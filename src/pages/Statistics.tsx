import React, { useEffect, useMemo, useState } from 'react';
import '../scss/statistics.scss';
import { useTable } from 'react-table';
import axios from 'axios';
import Popup from 'reactjs-popup';

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
        Header: 'Добавить',
        Cell: ({ row }) => (
          <Popup trigger={<button className='select--button'> Добавить </button>} modal nested>
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

  return (
    <>
      <div className='main'>
        <table {...getTableProps()}>
          <thead className='backgroud_table2'>
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
        {/* <table>
          <tr>
            <th className="one_rows">ФИО</th>
            <th>Подачи</th>
            <th>Блоки</th>
            <th>Атаки</th>
            <th>Приемы</th>
            <th>Защиты</th>
            <th>Передачи</th>
            <th>_</th>
          </tr>
          { {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{vol.name}</td>
                <td>{vol.age}</td>
                <td>{val.gender}</td>
              </tr>
            );
          })}}
          <tr>
            <th></th>
          </tr>
        </table> */}
      </div>
    </>
  );
};

export default Statistics;
