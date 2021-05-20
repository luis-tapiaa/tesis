import React from 'react';

import { Panel, IconButton } from '../../components';
import './Layer.css';

const Layer = ({ children, onClose, open, title }) => {
  const firstMenu = (
    <IconButton className="close-icon" icon="close" size="14px" onClick={onClose} />
  );
  return (
    open && (
      <div className="layer">
        <Panel {...{ firstMenu, title }}>{children}</Panel>
      </div>
    )
  );
};
export default Layer;
