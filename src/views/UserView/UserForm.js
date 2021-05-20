import React, { useState } from 'react';

import { Button, Date, Form, Select, Input, File } from '../../components';
import { Address } from '../../smart-components';
import { useUserForm } from './useUserForm';

const UserForm = ({ onClose }) => {
  const [auth, setAuth] = useState(false);
  const { values, onSubmit, bibliotecas, gruposUsuario, loading, genero } = useUserForm(onClose);
  return (
    <div className="scroll">
      <div className="user-form">
        <Form
          onSubmit={onSubmit}
          initialValues={values}
          onChangeForm={(name, value, setValue) => {
            if (name === 'grupo_usuario_id') {
              const grupo = gruposUsuario.find(g => g.id === value) || {};
              setAuth(!!grupo.staff);
            }
          }}
          validate={{
            nombre: 'req',
            codigo: 'req',
            a_paterno: 'req',
            biblioteca_id: 'req',
            grupo_usuario_id: 'req'
          }}
        >
          <Form.Field component={Input} label="Código" name="codigo" />
          <Form.Field component={Input} label="Nombre(s)" name="nombre" />
          <Form.Field component={Input} label="Apellido Paterno" name="a_paterno" />
          <Form.Field component={Input} label="Apellido Materno" name="a_materno" />
          <Form.Field component={Select} options={genero} label="Genero" name="genero" />
          <Form.Field
            placeholder="Selecciona una biblioteca"
            component={Select}
            options={bibliotecas}
            label="Biblioteca"
            name="biblioteca_id"
          />
          <Form.Field
            placeholder="Selecciona un grupo de usuario"
            component={Select}
            options={gruposUsuario}
            label="Grupo Usuario"
            name="grupo_usuario_id"
          />
          {auth && <Form.Field component={Input} label="Usuario" name="usuario" />}
          {auth && (
            <Form.Field component={Input} label="Contraseña" type="password" name="password" />
          )}
          <Form.Field component={Address} label="Dirección" name="direcciones" />
          <Form.Field component={Input} label="Telefono" name="telefono" />
          <Form.Field component={Input} label="Celular" name="celular" />
          <Form.Field component={Input} label="Correo" name="email" />
          <Form.Field component={Date} label="Fecha de Nacimiento" name="f_nacimiento" />
          <Form.Field component={File} label="Imagen de Perfil" name="foto" />
          <Button type="submit" loading={loading}>
            Aceptar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
