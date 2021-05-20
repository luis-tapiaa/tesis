import React from 'react';

import { useToast } from './useToast';
import { Icon, IconButton } from '../../components';
import './Toast.css';

const Toast = ({ id, message, duration = 3000, type = 'accept' }) => {
  const { exit, onExit } = useToast(id, duration);

  return (
    <div className={`toast-item ${exit && 'toast-exit'} toast-${type}`}>
      <Icon className={`toast-icon toast-icon-${type}`} icon={type} />
      <div className="toast-content">
        <div className="toast-title">{type === 'accept' ? 'Éxito' : 'Error'}</div>
        <div className="toast-message">{message}</div>
      </div>
      <IconButton className="close-icon" icon="close" onClick={onExit} />
    </div>
  );
};

export default Toast;
