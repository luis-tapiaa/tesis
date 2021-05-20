import React from 'react';

import './Loading.css';

const Loading = () => (
  <div className="load">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>Cargando...</div>
  </div>
);

export default Loading;
