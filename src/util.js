import { useState } from 'react';

export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const setCookie = (name, value) => {
  document.cookie = `${name}=${value || ''}; max-age=${value ? 86400 : 0}; path=/`;
};

export const get = (obj, path, def) => {
  return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : def), obj);
};

export function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

export function isEqual(a = {}, b = {}) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var prop = aProps[i];

    if ((a[prop] || '') !== (b[prop] || '')) {
      return false;
    }
  }

  return true;
}

const format = ({ biblioteca, grupo_usuario, tipo_item, ...values }) => {
  const data = {};
  if (biblioteca) {
    data.biblioteca_id = (biblioteca || {}).id || null;
  }
  if (grupo_usuario) {
    data.grupo_usuario_id = (grupo_usuario || {}).id || null;
  }
  if (tipo_item) {
    data.tipo_item_id = (tipo_item || {}).id || null;
  }
  return {
    ...values,
    ...data
  };
};

export const useCRUD = () => {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editValues, setValues] = useState({});

  const closeModal = () => {
    setModal(false);
    setValues({});
  };

  const closeConfirm = () => {
    setConfirm(false);
    setValues({});
  };

  const onAdd = () => {
    setModal(true);
  };

  const onEdit = values => {
    setValues(format(values));
    setModal(true);
  };

  const onDelete = values => {
    setValues(values);
    setConfirm(true);
  };

  return {
    closeConfirm,
    closeModal,
    confirm,
    editValues,
    modal,
    onAdd,
    onDelete,
    onEdit
  };
};

export const findPolicy = (policies, prestamo) => {
  function compare(a, b) {
    let aAcc = 0;
    let bAcc = 0;
    if (a.biblioteca) {
      aAcc += 1;
    }
    if (a.grupo_usuario) {
      aAcc += 1;
    }
    if (a.tipo_item) {
      aAcc += 1;
    }

    if (b.biblioteca) {
      bAcc += 1;
    }
    if (b.grupo_usuario) {
      bAcc += 1;
    }
    if (b.tipo_item) {
      bAcc += 1;
    }
    if (aAcc > bAcc) {
      return -1;
    }
    if (aAcc < bAcc) {
      return 1;
    }
    return 0;
  }

  const nextPolicies = policies.sort(compare);

  for (let p of nextPolicies) {
    let policy = 0;
    if (isEqual(prestamo.biblioteca, p.biblioteca || {}) || p.biblioteca === null) {
      policy += 4;
    }
    if (isEqual(prestamo.grupo_usuario, p.grupo_usuario || {}) || p.grupo_usuario === null) {
      policy += 2;
    }
    if (prestamo.tipo_item === get(p, ['tipo_item', 'nombre'], null) || p.tipo_item === null) {
      policy += 1;
    }
    if (policy === 7) {
      return p;
    }
  }
};
