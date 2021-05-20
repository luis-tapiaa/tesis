import React from 'react';

import { Icon, Input } from '../../components';
import { useDate } from './useDate';
import './Input.css';

const Date = ({ ...rest }) => {
  const { active, icon, calendar, changeValue, next, prev, style, title, ref } = useDate(rest);

  const header = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(h => <th key={h}>{h}</th>);

  const renderCalendar = calendar.map((week, index) => (
    <tr key={`week-${index}`}>
      {week.map((day, i) => (
        <td key={`day-${i}`} {...style(day)} onClick={() => changeValue(day)}>
          {day.format('D').toString()}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="date-container">
      <div className="date-input">
        <Input placeholder="DD-MM-AAAA" {...rest} />
        <button type="button" onClick={icon.onClick} className="date-icon">
          <Icon size="16px" {...icon} />
        </button>
      </div>
      <div ref={ref} className={`calendar calendar-${active && 'active'}`}>
        <div className="date-header">
          <Icon className="day-prev" icon="caret-down" onClick={prev} />
          <span>{title}</span>
          <Icon className="day-next" icon="caret-down" onClick={next} />
        </div>
        <table className="date-table">
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{renderCalendar}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Date;
