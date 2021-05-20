import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import { Loading, Modal, Panel, Table, Button } from "../../components";
import { Layer, Confirmation } from "../../smart-components";
import { useSmartPanel } from "./useSmartPanel";
//import UserFormCsv from "../../views/UserView/UserFormCsv";
import "./SmartPanel.css";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";

const SmartPanel = ({
  path = "",
  detail,
  context,
  filter,
  detailTitle,
  loading,
  form,
  fetchMore,
  drop,
  onFilter,
  ...rest
}) => {
  const {
    closeAdd,
    closeEdit,
    confirmProps,
    detailProps,
    editValues,
    itemsProps,
    filterProps,
    onClickRow
  } = useSmartPanel(path, drop, rest);
  return (
    <Fragment>
      <Panel title={path} className="smart-items" {...itemsProps}>
        <div className="smart-panel">
          <SearchAndFilter
            columns={rest.columns}
            context={context}
            columnAlias={rest.columnAlias}
            onFilter={onFilter}
          />
          {!rest.data.length && loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              <Table
                type="virtual"
                className="smart-table"
                onClickRow={onClickRow}
                {...rest}
              />
              <Button onClick={fetchMore}>Ver más resultados.</Button>
            </React.Fragment>
          )}
        </div>
      </Panel>
      <Route path={`/${path}/detalle/:id`}>
        <Panel
          title={detailTitle(editValues)}
          className="smart-detail"
          {...detailProps}
        >
          {React.createElement(detail, { values: editValues, loading })}
        </Panel>
      </Route>
      <Route path={`/${path}/nuevo`}>
        <Layer open onClose={closeAdd}>
          {React.createElement(form, { onClose: closeAdd })}
        </Layer>
      </Route>
      <Route path={`/${path}/nuevo/csv`}>
        <Layer open onClose={closeAdd}></Layer>
      </Route>
      <Route path={`/${path}/editar/:id`}>
        <Layer open onClose={closeEdit}>
          {React.createElement(form, { path, editValues, onClose: closeEdit })}
        </Layer>
      </Route>
      <Modal {...filterProps}>{React.createElement(filter, filterProps)}</Modal>
      <Confirmation {...confirmProps} />
    </Fragment>
  );
};

export default SmartPanel;
