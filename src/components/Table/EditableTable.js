import React from 'react';

import { IconButton } from '../../components';
import DefaultTable from './DefaultTable';

const EditableTable = ({ onEdit, onDelete, ...props }) => {
  const visibleCols = [...props.visibleCols, ' '];

  const data = props.data.map(d => ({
    ...d,
    ' ': (
      <div className="actions">
        <IconButton icon="edit" onClick={() => onEdit(d)} />
        <IconButton icon="delete" onClick={() => onDelete(d)} />
      </div>
    )
  }));
  return <DefaultTable {...props} {...{ data, visibleCols }} />;
};

EditableTable.defaultProps = {
  data: []
};

export default EditableTable;
