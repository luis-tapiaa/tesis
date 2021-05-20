import React, { useState } from 'react';

import { Select, Input } from '../../components';
import './Period.css';

export const periods = [
  { id: 'h', nombre: 'Hora(s)' },
  { id: 'd', nombre: 'Dia(s)' },
  { id: 'w', nombre: 'Semana(s)' },
  { id: 'm', nombre: 'Meses(s)' }
];

const Period = ({ className, value = '', name, setValue, onBlur }) => {
  const [period, interval] = value ? value.substring(1, value.length - 1).split(',') : [];
  const initialState = { interval, period };
  const [state, setState] = useState(initialState);

  const onChangePeriod = ({ target: { value } }) => {
    setState(prev => ({ ...prev, period: value }));
    if (!value && !state.interval) {
      setValue(name, '');
    } else {
      setValue(name, `(${value},${state.interval})`);
    }
  };

  const onChangeInterval = ({ target: { value } }) => {
    setState(prev => ({ ...prev, interval: value }));
    setValue(name, `(${state.period},${value})`);
  };

  return (
    <div className="periodfield">
      <Input
        className={className}
        value={state.period}
        onChange={onChangePeriod}
        type="number"
        onBlur={() => {
          onBlur({ target: { name } });
        }}
      />
      <Select
        className={className}
        value={state.interval}
        label="intervalo"
        options={periods}
        onChange={onChangeInterval}
        onBlur={() => {
          onBlur({ target: { name } });
        }}
      />
    </div>
  );
};

export default Period;
