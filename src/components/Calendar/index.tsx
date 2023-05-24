import { FC } from 'react';
import Calendar from 'react-calendar';
import './calendar.scss';

type MyCalendarProps = {
  value: string;
  dates?: string[];
  disableTiles: boolean;
  selectRange: boolean;
  onChange: (value) => void;
};

const MyCalendar = ({ value, dates, disableTiles, selectRange, onChange }) => {
  function tileDisabled({ date, view }) {
    // Проверяем дату на возможность выбора
    if (disableTiles) return !dates.includes(date.toISOString());
    else return false;
  }

  return (
    <Calendar
      maxDate={new Date()}
      tileDisabled={tileDisabled}
      selectRange={selectRange}
      onChange={(value, event) => onChange(value)}
      value={value}
    />
  );
};

export default MyCalendar;
