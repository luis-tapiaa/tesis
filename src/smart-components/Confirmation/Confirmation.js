import React from 'react';
import { Modal, Button } from '../../components';
import './Confirmation.css';

const Confirmation = ({ loading, message, open, onClose, onAccept }) => {
  return (
    <Modal {...{ open, onClose }} className="confirmation-modal">
      <img src="https://www.flaticon.es/svg/static/icons/svg/550/550096.svg" alt="" />
      <p className="confirm-message">{message || '¿Esta seguro que desea eliminar este item?'}</p>
      <div className="confirm-actions">
        <Button onClick={onAccept} loading={loading}>
          Aceptar
        </Button>
        <Button className="button-error" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default Confirmation;
