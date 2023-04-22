import React from 'react';
import '../scss/statistics.scss';
import { useTable } from 'react-table';
import Header from '../components/Header';

export const Statistics: React.FC = () => {
  return (
    <>
      <div className="main">
        <table>
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
          {/* {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.gender}</td>
              </tr>
            );
          })} */}
        </table>
      </div>
    </>
  );
};
export default Statistics;
