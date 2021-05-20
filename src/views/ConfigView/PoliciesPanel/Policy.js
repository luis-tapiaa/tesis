import React from 'react';

import { Key } from '../../../components';
import './Policy.css';

const periodo = (value = '') => {
  if (!value) return '-';

  const [periodo, intervalo] = value.substring(1, value.length - 1).split(',');
  const intervalos = {
    h: 'hora(s)',
    d: 'dia(s)',
    m: 'mes(es)',
    w: 'semana(s)'
  };

  return `${periodo} ${intervalos[intervalo]}`;
};

const format = value => {
  return (value || {}).nombre || '-';
};

const Policy = ({ data }) => (
  <div className="policy">
    <div className="policy-row">
      <Key label="biblioteca" value={format(data.biblioteca)} />
      <Key label="grupo de usuario" value={format(data.grupo_usuario)} />
      <Key label="tipo de item" value={format(data.tipo_item)} />
    </div>
    <div className="policy-row">
      <Key label="prestamos" value={data.prestamos || 0} />
      <Key label="periodo de prestamo" value={periodo(data.p_prestamo)} />
      <Key label="multa" value={parseFloat(data.multa || 0).toFixed(2)} />
    </div>
    <div className="policy-row">
      <Key label="sancion" value={periodo(data.p_sancion)} />
      <Key label="renovaciones" value={data.renovaciones || 0} />
      <Key label="periodo de gracia" value={periodo(data.p_gracia)} />
    </div>
  </div>
);

export default Policy;
