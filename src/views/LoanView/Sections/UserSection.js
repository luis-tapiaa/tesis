import React from "react";
import { Link } from "react-router-dom";

import { Panel, Input, Button, Form, Key } from "../../../components";
import { useUserSection } from "./useUserSection";
import { get } from "../../../util";

const UserSection = () => {
  const { loading, onSubmit, usuario } = useUserSection();

  const multa = parseFloat(
    get(usuario, ["cuentas"], []).reduce((a, v) => a + v.pendiente, 0)
  ).toFixed(2);

  const prestamos = get(usuario, ["prestamos"], []).filter(
    (p) => p.f_devolucion === null
  );

  const renderUser = (
    <div className="loan-user">
      <h2 className="loan-user-label">
        {usuario.a_paterno} {usuario.a_materno} {usuario.nombre}
      </h2>
      <Key
        label="Código"
        value={
          <Link to={`/usuarios/detalle/${usuario.id}`}>{usuario.codigo}</Link>
        }
      />
      <hr />
      <div className="loan-row">
        <Key label="Grupo" value={get(usuario, ["grupo_usuario", "nombre"])} />
        <Key
          label="Biblioteca"
          value={get(usuario, ["biblioteca", "nombre"])}
        />
      </div>
      <hr />
      <div className="loan-row">
        <Key label="Prestamos" value={prestamos.length || 0} />
        <Key label="Multas" value={multa} />
      </div>
    </div>
  );

  return (
    <Panel className="loan-panel" title="Usuario">
      <div className="form-container">
        <Form onSubmit={onSubmit}>
          <Form.Field
            component={Input}
            name="codigo"
            placeholder="Codigo del usuario"
          />
          <Button
            className="barcode-submit"
            type="submit"
            disabled={usuario.id}
            loading={loading}
          >
            Seleccionar
          </Button>
        </Form>
      </div>
      {usuario.codigo && renderUser}
    </Panel>
  );
};

export default UserSection;
