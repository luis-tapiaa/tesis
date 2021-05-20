import React, { useState } from 'react';

import { IconButton } from '../../components';
import Card from './Card';
import './Address.css';

const Address = ({ label, name, setValue, value = [] }) => {
  const [address, setAddress] = useState(value || []);

  const addAddress = () => {
    const addr = { direccion1: '', direccion2: '', c_postal: '', estado: '', pais_iso: '' };
    setAddress(prev => [...prev, addr]);
    setValue(name, [...address, addr]);
  };

  const labelElement = label && <div className="label">{label}</div>;
  const addButton = <IconButton icon="add" onClick={addAddress} />;

  return (
    <div>
      <div className="addr-header">
        {labelElement}
        {addButton}
      </div>
      <div className="addr-list">
        {address.map((addr, index) => (
          <Card key={index} {...addr} {...{ address, index, name, setAddress, setValue }} />
        ))}
      </div>
    </div>
  );
};

export default Address;
