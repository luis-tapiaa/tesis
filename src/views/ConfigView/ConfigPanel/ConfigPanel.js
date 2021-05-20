import React from 'react';

import ConfigForm from './ConfigForm';
import { IconButton, Loading, Modal, Table } from '../../../components';
import { Confirmation } from '../../../smart-components';
import { useConfigPanel } from './useConfigPanel';

const ConfigPanel = ({ title, initialValues, single, query, fields, link, validate, ...rest }) => {
  const {
    biblioData,
    closeConfirm,
    closeModal,
    confirm,
    editValues,
    loading,
    loadingForm,
    loadingConfirm,
    modal,
    onConfirm,
    onDelete,
    onEdit,
    onSubmit,
    onAdd,
    tableData,
    titleModal
  } = useConfigPanel(single, link);

  if (!tableData.length && loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="config-header">
        <h1>{title}</h1>
        <IconButton icon="add" onClick={onAdd} />
      </div>
      <Table {...rest} data={tableData} type="editable" onEdit={onEdit} onDelete={onDelete} />
      <Modal dismissible open={modal} onClose={closeModal} title={titleModal}>
        <ConfigForm
          onSubmit={onSubmit}
          biblioData={biblioData}
          fields={fields}
          validate={validate}
          editValues={editValues}
          initialValues={initialValues}
          loading={loadingForm}
        />
      </Modal>
      <Confirmation
        open={confirm}
        onClose={closeConfirm}
        onAccept={onConfirm}
        loading={loadingConfirm}
      />
    </React.Fragment>
  );
};

export default ConfigPanel;
