import React from 'react';

import CollapsibleTable from './CollapsibleTable';
import DefaultTable from './DefaultTable';
import EditableTable from './EditableTable';
import VirtualizedTable from './VirtualizedTable';
import './Table.css';

const Table = ({ type = 'default', ...rest }) => {
  const tables = {
    collapse: CollapsibleTable,
    default: DefaultTable,
    editable: EditableTable,
    virtual: VirtualizedTable
  };

  return React.createElement(tables[type], rest);
};

Table.defaultProps = {
  data: []
};

export default Table;
