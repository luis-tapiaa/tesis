import React from "react";

import { Icon, Input } from "../../components";

const Card = ({
  address,
  setAddress,
  setValue,
  index,
  name: fieldName,
  ...rest
}) => {
  const dropAddr = () => {
    const copy = [...address];
    copy.splice(index, 1);
    setValue(fieldName, copy);
    setAddress(copy);
  };

  const onChange = ({ target: { name, value } }) => {
    const copy = [...address];
    copy[index] = { ...rest, [name]: value };
    setValue(fieldName, copy);
    setAddress(copy);
  };

  const dropButton = (
    <Icon className="addr-drop" icon="delete" onClick={dropAddr} />
  );

  return (
    <div className="addr-card">
      <div className="addr-index">
        {`Dirección ${index + 1}`}
        {dropButton}
      </div>
      <div className="addr-fields">
        <Input
          label="Direccion 1"
          name="direccion1"
          placeholder="Direccion 1"
          value={rest.direccion1}
          onChange={onChange}
        />
        <Input
          label="Direccion 2"
          name="direccion2"
          placeholder="Direccion 2"
          value={rest.direccion2}
          onChange={onChange}
        />
        <Input
          label="C.P."
          placeholder="CP"
          name="c_postal"
          value={rest.c_postal}
          onChange={onChange}
        />
        <Input
          label="Estado"
          placeholder="Estado"
          name="estado"
          value={rest.estado}
          onChange={onChange}
        />
        <Input
          label="País"
          placeholder="País"
          name="pais_iso"
          value={rest.pais_iso}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Card;
