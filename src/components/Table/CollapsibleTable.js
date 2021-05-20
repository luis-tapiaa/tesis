import React, { Fragment, useRef, useState } from 'react';

import { IconButton } from '../../components';

const TableRow = ({ data, card, visibleCols }) => {
  const [state, setState] = useState({ detail: false, height: '0px' });

  const content = useRef(null);

  const onClick = e => {
    if (!e.target.className) {
      setState(prev => ({
        detail: !prev.detail,
        height: prev.detail ? '0px' : `${content.current.scrollHeight}px`
      }));
    }
  };

  return (
    <Fragment>
      <tr onClick={onClick}>
        {visibleCols.map(col => (
          <td key={col}>{data[col] || '-'}</td>
        ))}
      </tr>
      <tr className="row-detail">
        <td colSpan={visibleCols.length}>
          <div
            ref={content}
            style={{ height: `${state.height}` }}
            className={`${state.detail && 'row-active'}`}
          >
            {React.createElement(card, { data })}
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

const CollapsibleTable = ({ card, onEdit, onDelete, ...props }) => {
  if (!props.data.length) {
    return 'No hay items';
  }

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
  const renderHeaders = visibleCols.map(c => <th key={c}>{c}</th>);
  const renderData = data.map((d, i) => (
    <TableRow key={i} data={d} card={card} visibleCols={visibleCols} />
  ));

  return (
    <table className="editable collapsible">
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{renderData}</tbody>
    </table>
  );
};

export default CollapsibleTable;
