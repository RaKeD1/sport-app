import { FC } from 'react';
import Calendar from 'react-calendar';
import './calendar.scss';

type MyCalendarProps = {
  value: string;
  onChange: (value: string) => void;
};

const MyCalendar = ({ onChange, value, dates }) => {
  function tileDisabled({ date, view }) {
    // Проверяем дату на возможность выбора
    return !dates.includes(date.toISOString());
  }

  return (
    <Calendar
      maxDate={new Date()}
      tileDisabled={tileDisabled}
      onChange={(value, event) => onChange(value)}
      value={value}
    />
  );
};

export default MyCalendar;
