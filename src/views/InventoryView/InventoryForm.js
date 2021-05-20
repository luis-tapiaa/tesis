import React from "react";

import { Button, Form, Select, Input } from "../../components";
import { useInventoryForm } from "./useInventoryForm";

const InventoryForm = ({ onClose }) => {
  const { values, onSubmit, options, loading } = useInventoryForm(onClose);

  return (
    <div className="inventory-form">
      <Form
        onSubmit={onSubmit}
        initialValues={values}
        validate={{
          autor: "req",
          titulo: "req",
          tipo_item: "req",
          editorial: "req"
        }}
      >
        <Form.Field component={Input} label="Autor" name="autor" />
        <Form.Field component={Input} label="Título" name="titulo" />
        <Form.Field
          component={Select}
          placeholder="Seleccionar uno"
          label="Tipo de material"
          name="tipo_item"
          options={options}
        />
        <Form.Field component={Input} label="ISBN / ISSN" name="isbn_issn" />
        <Form.Field component={Input} label="Editorial" name="editorial" />
        <Form.Field
          component={Input}
          label="Lugar de publicación"
          name="l_publicacion"
        />
        <Form.Field
          component={Input}
          label="Fecha de publicación"
          name="f_publicacion"
        />
        <Button type="submit" loading={loading}>
          Aceptar
        </Button>
      </Form>
    </div>
  );
};

export default InventoryForm;
