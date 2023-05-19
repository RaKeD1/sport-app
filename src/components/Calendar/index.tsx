import { FC } from 'react';
import Calendar from 'react-calendar';
import './calendar.scss';

type MyCalendarProps = {
  value: string;
  onChange: (value: string) => void;
};

const MyCalendar = ({ onChange, value }) => {
  return (
    <Calendar maxDate={new Date()} onChange={(value, event) => onChange(value)} value={value} />
  );
};

export default MyCalendar;
