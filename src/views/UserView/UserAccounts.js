import React, { useState } from 'react';

import { Button, Modal, Table } from '../../components';
import { Dropdown } from '../../smart-components';
import ChargeManual from './ChargeManual';
import PayForm from './PayForm';

const UserAccounts = ({ cuentas, usuario }) => {
  const [manual, setManual] = useState(false);
  const [pay, setPay] = useState(false);
  const [editValues, setValues] = useState({});

  const menu = c => [
    {
      action: () => {
        setPay(true);
        setValues(c);
      },
      label: 'Pagar',
      icon: 'logout'
    }
  ];

  const formattedCuentas = cuentas?.map(c => ({
    ...c,
    razon: '',
    codigo: '',
    titulo: '',
    ' ': <Dropdown icon="elipsis" menu={menu(c)} />
  }));

  const cols = ['cargo', 'pendiente', 'nota', 'razon', 'codigo', 'titulo', ' '];

  const onClosePay = () => {
    setPay(false);
    setValues({});
  };

  return (
    <div>
      <Button onClick={() => setManual(true)}>Multa manual</Button>
      <Table data={formattedCuentas} visibleCols={cols} />
      <Modal open={manual} title="Multa manual" onClose={() => setManual(false)}>
        <ChargeManual usuario={usuario} />
      </Modal>
      <Modal open={pay} title="Pagar multa" onClose={onClosePay}>
        <PayForm values={editValues} onClose={onClosePay} usuario={usuario} />
      </Modal>
    </div>
  );
};

export default UserAccounts;
