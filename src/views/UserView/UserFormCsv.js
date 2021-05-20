import React from "react";
import { Button, Form, Input } from "../../components";
import { useUserForm } from "./useUserForm";

const UserFormCsv = ({ onClose }) => {
  const { onSubmit, loading } = useUserForm(onClose);
  return (
    <div className="scroll">
      <div className="user-form">
        <Form onSubmit={onSubmit}>
          <h1>Importar Usuarios mediante un archivo CSV</h1>
          <br></br>
          <h3>
            Esta herramienta le permite importar usuarios a su biblioteca
            mediante un archivo CSV o TXT
          </h3>
          <br></br>
          <Form.Field component={Input} label="Código" name="codigo" />
          <Button type="submit" loading={loading}>
            Aceptar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserFormCsv;
