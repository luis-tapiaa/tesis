import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { IconButton, Modal } from "../../components";
import { Dropdown } from "../../smart-components";
import { useMutation } from "../../hooks";

export const useSmartPanel = (path = "", dropQuery, rest) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [filter, setFilter] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editValues, setValues] = useState({});
  const [import_, setImport] = useState(false);

  const closeConfirm = () => {
    setConfirm(false);
    setValues({});
    history.push(`/${path}`);
  };

  const [drop, { loading }] = useMutation(dropQuery, closeConfirm);

  const id = editValues.id || pathname.split("/")[3];

  const menu = [
    {
      label: "Nuevo",
      icon: "add",
      action: () => history.push(`/${path}/nuevo`)
    }
  ];

  const onAccept = () => {
    drop({ id });
  };

  const detailMenu = [
    {
      action: () => history.push(`/${path}/editar/${id}`),
      icon: "edit",
      label: "Editar"
    },
    { action: () => setConfirm(true), icon: "delete", label: "Borrar" }
  ];

  const itemsProps = {
    lastMenu: <Dropdown icon="elipsis" menu={menu} />
  };

  const onCloseDetail = () => {
    setValues({});
    history.push(`/${path}`);
  };

  const detailProps = {
    firstMenu: (
      <IconButton className="close-icon" size="14px" icon="close" onClick={onCloseDetail} />
    ),
    lastMenu: <Dropdown icon="elipsis" menu={detailMenu} />
  };

  const onClickRow = (row) => {
    setValues(row);
    history.push(`/${path}/detalle/${row.id}`);
  };

  const confirmProps = {
    open: confirm,
    onClose: () => setConfirm(false),
    onAccept,
    loading
  };

  const filterProps = {
    title: "Añadir filtros",
    open: filter,
    onClose: () => setFilter(false)
  };

  const closeAdd = () => history.push(`/${path}`);

  const closeEdit = () => history.push(`/${path}/detalle/${id}`);

  return {
    closeAdd,
    closeEdit,
    confirmProps,
    detailProps,
    editValues,
    itemsProps,
    onClickRow,
    filterProps
  };
};
