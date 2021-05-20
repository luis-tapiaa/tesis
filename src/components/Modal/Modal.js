import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../IconButton';
import useModal from './useModal';
import './Modal.css';

const Modal = ({
  children,
  className,
  closeOnBackgroundClick,
  dismissible,
  open,
  onClose,
  title
}) => {
  const ref = useModal(open, onClose, closeOnBackgroundClick);

  return (
    open && (
      <div className={`modal-root ${className}`}>
        <div ref={ref} className="modal">
          <div className={`modal-header ${dismissible && 'dismissible'}`}>
            <div className="modal-title">{title}</div>
            {dismissible && (
              <IconButton className="modal-close-icon" icon="close" onClick={onClose} size="12px" />
            )}
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType(PropTypes.string, PropTypes.node)
};

Modal.defaultProps = {
  dismissible: false,
  closeOnBackgroundClick: false
};

export default Modal;
