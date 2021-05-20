import React from "react";

import { IconButton, Key, Modal, Table } from "../../components";
import { Confirmation } from "../../smart-components";
import { useInventoryDetail } from "./useInventoryDetail";
import ItemForm from "./ItemForm";

const InventoryDetail = ({ loading }) => {
  const {
    values,
    options,
    items,
    editValues,
    columnAlias,
    visibleCols,
    loadingForm,
    modalProps,
    onAdd,
    onEdit,
    onDelete,
    onSumbit,
    confirmProps
  } = useInventoryDetail(loading);

  const {
    titulo,
    autor,
    editorial,
    isbn_issn,
    l_publicacion,
    f_publicacion,
    tipo_item
  } = values;

  return (
    <div className="inventory-detail">
      <h3>Registro</h3>
      <Key label="Título" value={titulo || "-"} />
      <Key label="Autor" value={autor || "-"} />
      <Key label="ISBN/ISSN" value={isbn_issn || "-"} />
      <Key label="Editorial" value={editorial || "-"} />
      <Key label="Lugar de publicación" value={l_publicacion || "-"} />
      <Key label="Año de publicación" value={f_publicacion || "-"} />
      <Key label="Tipo de Material" value={tipo_item || "-"} />
      <hr />
      <div className="items-header">
        <h3>Items</h3>
        <IconButton className="pane-add" icon="add" onClick={onAdd} />
      </div>
      <div className="inventory-items">
        <Table
          type="editable"
          style={{ tableLayout: "auto" }}
          data={items}
          columnAlias={columnAlias}
          visibleCols={visibleCols}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      <Modal {...modalProps}>
        <ItemForm
          options={options}
          values={editValues}
          submit={onSumbit}
          loading={loadingForm}
        />
      </Modal>
      <Confirmation {...confirmProps} />
    </div>
  );
};

export default InventoryDetail;
