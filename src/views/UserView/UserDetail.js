import React from 'react';

import { Button, Key } from '../../components';
import { Layer } from '../../smart-components';
import { useUserDetail } from './useUserDetail';
import UserLoans from './UserLoans';
import UserAccounts from './UserAccounts';

const UserDetail = ({ loading }) => {
  const { values, cuenta, prestamo, setPrestamo, setCuenta } = useUserDetail(loading);

  const {
    a_paterno,
    a_materno,
    nombre,
    genero,
    f_nacimiento,
    f_registro,
    f_vencimiento,
    codigo,
    biblioteca = {},
    grupo_usuario = {},
    email,
    cuentas,
    prestamos,
    telefono,
    celular
  } = values;

  const foto = values.foto
    ? values.foto
    : 'https://luis-tapiaa.github.io/icons-host/icons/profile.jpg';

  return (
    <div className="user-detail">
      <img src={foto} alt="profile" />
      <h3>Detalles de Usuario</h3>
      <Key label="Codigo" value={codigo} />
      <Key label="Apellido Paterno" value={a_paterno} />
      <Key label="Apellido Materno" value={a_materno} />
      <Key label="Nombre" value={nombre} />
      <Key label="Biblioteca" value={biblioteca.nombre} />
      <Key label="Grupo Usuario" value={grupo_usuario.nombre} />
      <Key label="Fecha de Nacimiento" value={f_nacimiento} />
      <Key label="Género" value={genero} />
      <Key label="Fecha de Registro" value={f_registro} />
      <Key label="Fecha de Vencimiento" value={f_vencimiento} />
      <Key label="Correo" value={email} />
      <Key label="Teléfono" value={telefono} />
      <Key label="Celular" value={celular} />
      <hr />
      <Button onClick={() => setPrestamo(true)}>Prestamos</Button>
      <hr />
      <Button onClick={() => setCuenta(true)}>Cuenta</Button>
      <Layer open={prestamo} onClose={() => setPrestamo(false)} title="Prestamos">
        <UserLoans prestamos={prestamos} usuario={values} />
      </Layer>
      <Layer open={cuenta} onClose={() => setCuenta(false)} title="Cuenta">
        <UserAccounts cuentas={cuentas} usuario={values} />
      </Layer>
    </div>
  );
};

export default UserDetail;
