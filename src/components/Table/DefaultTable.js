import React from "react";

const format = (value) => {
  switch (typeof value) {
    case "object":
      if ((value || {}).type) return value;
      return (value || {}).nombre;
    case "number":
      return parseFloat(value).toFixed(2);
    case "boolean":
      return value ? "Si" : "No";
    default:
      return value;
  }
};

const DefaultTable = ({
  className,
  columnAlias,
  data,
  visibleCols = [],
  onClickRow,
  loading,
  ...rest
}) => {
  if (!data.length) {
    return "No hay items";
  }

  const renderHeaders = visibleCols.map((h) => (
    <th key={h}>{columnAlias ? columnAlias[h] || h : h}</th>
  ));
  const renderData = data.map((d, i) => (
    <tr
      key={i}
      onClick={() => {
        if (onClickRow) {
          onClickRow(d);
        }
      }}
    >
      {visibleCols.map((c) => (
        <td key={c}>{format(d[c]) || "-"}</td>
      ))}
    </tr>
  ));

  return (
    <table className={className || "editable"} {...rest}>
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{renderData}</tbody>
    </table>
  );
};

export default DefaultTable;
