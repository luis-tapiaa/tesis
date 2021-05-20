import React from 'react';

import UserForm from './UserForm';
import { useUsuariosContext } from '../../context';
import { useUserView } from './useUserView';
import { SmartPanel } from '../../smart-components';
import { usuarios } from '../../hooks/types';
import UserDetail from './UserDetail';
import './UserView.css';

const UserView = () => {
  const rest = useUserView();

  const detailTitle = values => {
    return `${values.a_paterno || ''}, ${values.nombre || ''}`;
  };

  const cmp = () => {
    return <div>Componente</div>;
  };

  return (
    <SmartPanel
      path="usuarios"
      context={useUsuariosContext}
      detail={UserDetail}
      form={UserForm}
      filter={cmp}
      drop={usuarios.DROP}
      detailTitle={detailTitle}
      {...rest}
    />
  );
};

export default UserView;
