const isReq = value => {
  const err = 'Este campo es obligatorio.';
  switch (typeof value) {
    case 'string':
      return !value.trim() && err;
    case 'number':
      return (value === undefined || value === null) && err;
    default:
      return !value && err;
  }
};

const isInt = value => {
  if (!value) return false;
  const intValue = parseInt(value, 10);

  return !Number.isInteger(intValue) && 'Este campo debe ser un entero.';
};

const isMoney = value => {
  if (!value) return false;

  return isNaN(value) && 'Este campo debe ser un número.';
};

const validator = { isReq, isInt, isMoney };

export default validator;
