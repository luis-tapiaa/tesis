import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { useDropdown } from '../../smart-components/Dropdown/useDropdown';

const buildCalendar = value => {
  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');
  const day = startDay.clone().subtract(1, 'day');

  const calendar = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return calendar;
};

export const useDate = rest => {
  const ref = useRef(null);
  const [active, toggleActive] = useDropdown(ref);

  const [calendar, setCalendar] = useState([]);
  const [date, setDate] = useState(rest.value ? moment(rest.value, 'DD-MM-YYYY') : moment());

  useEffect(() => {
    setCalendar(buildCalendar(date));
  }, [date]);

  const changeValue = day => {
    if (!(day.isBefore(date, 'month') || day.isAfter(date, 'month'))) {
      rest.setValue(rest.name, day.format('DD-MM-YYYY'));
      toggleActive();
    }
  };

  const next = () => setDate(date.add(1, 'month').clone());
  const prev = () => setDate(date.subtract(1, 'month').clone());

  const style = day => {
    return day.isBefore(date, 'month') || day.isAfter(date, 'month')
      ? { className: 'day-out' }
      : null;
  };

  const title = `${date.format('MMMM YYYY')}`;

  const icon = {
    icon: 'calendar',
    onClick: toggleActive
  };

  return { active, ref, calendar, changeValue, next, prev, style, title, icon };
};
