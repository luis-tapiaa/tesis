import React from 'react';

import PoliciesForm from './PoliciesForm';
import Policy from './Policy';
import { IconButton, Loading, Modal, Table } from '../../../components';
import { Confirmation } from '../../../smart-components';
import { usePoliciesPanel } from './usePoliciesPanel';
import './PoliciesPanel.css';

const PoliciesPanel = props => {
  const {
    confirm,
    closeConfirm,
    closeModal,
    editValues,
    loading,
    loadingForm,
    loadingConfirm,
    modal,
    onDelete,
    onEdit,
    onSubmit,
    onConfirm,
    onAdd,
    tableData,
    title
  } = usePoliciesPanel();

  if (!tableData.length && loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="config-header">
        <h1>Politicas</h1>
        <IconButton icon="add" onClick={onAdd} />
      </div>
      <Table
        card={Policy}
        type="collapse"
        data={tableData}
        onEdit={onEdit}
        onDelete={onDelete}
        {...props}
      />
      <Modal dismissible open={modal} onClose={closeModal} title={title} className="policy-modal">
        <PoliciesForm editValues={editValues} onSubmit={onSubmit} loading={loadingForm} />
      </Modal>
      <Confirmation
        loading={loadingConfirm}
        open={confirm}
        onClose={closeConfirm}
        onAccept={onConfirm}
      />
    </React.Fragment>
  );
};

export default PoliciesPanel;
