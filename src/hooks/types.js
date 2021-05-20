import {
  useAppContext,
  useDataContext,
  useDevolucionContext,
  useInventarioContext,
  usePrestamoContext,
  useUsuariosContext
} from '../context';

export { useQuery, useLazyQuery, useMutation } from './';

const fields = {
  bibliotecas: `{ id codigo nombre url }`,
  bloqueos: `{ id usuario_id f_inicio f_termino }`,
  cuentas: `{ id cargo pendiente multa { id nombre } item { id codigo registro { marc } } nota }`,
  direcciones: ``,
  gruposUsuario: `{ id codigo nombre biblioteca { id nombre } staff }`,
  items: `{ id codigo f_adquisicion estado_item ubicacion precio biblioteca { id nombre } }`,
  multas: `{ id codigo nombre biblioteca { id nombre } cargo }`,
  politicas: `{
    id nombre descripcion prestamos p_prestamo p_sancion multa renovaciones p_gracia 
    biblioteca { id nombre } grupo_usuario { id nombre } tipo_item { id nombre }
  }`,
  item: `{ id codigo f_adquisicion estado_item ubicacion precio biblioteca { id nombre } registro { marc } }`,
  prestamos: `{ item { id } f_prestamo f_vencimiento f_devolucion renovaciones }`,
  prestamos_loan: `{ id item { id codigo registro { marc } } f_prestamo f_vencimiento f_devolucion renovaciones
    usuario {
      id biblioteca { id nombre } grupo_usuario { id nombre } a_paterno a_materno nombre
    }
  }`,
  registros: `{ id autor titulo isbn_issn editorial l_publicacion f_publicacion items {
    id codigo f_adquisicion estado_item ubicacion precio biblioteca { id nombre }
  } }`,
  tiposItem: `{ id codigo nombre costo_prestamo disponible_prestamo }`,
  usuarios_loan: `{ id codigo a_paterno a_materno nombre biblioteca { id nombre } grupo_usuario { id nombre } prestamos { id f_devolucion } cuentas { pendiente } }`,
  usuarios: `{ id codigo a_paterno a_materno nombre biblioteca { id nombre } grupo_usuario { id nombre } }`,
  usuarios_full: `{
    id codigo a_paterno a_materno nombre biblioteca { id nombre } grupo_usuario { id nombre }
    usuario password
    prestamos { id item { codigo id registro { marc } } f_prestamo f_vencimiento f_devolucion renovaciones }
    cuentas { id cargo pendiente multa { id nombre } item { id codigo registro { marc } } nota }
    genero f_nacimiento f_registro f_vencimiento email telefono celular foto direcciones { direccion1
      direccion2
      estado
      c_postal
      pais_iso }
  }`
};

const getTypes = (type, name, label) => {
  return {
    ALL: {
      query: `query { ${name} ${fields[name]} }`,
      set: [`set${type}s`],
      format: { [`set${type}s`]: [name] },
      context: useDataContext
    },
    ADD: {
      query: `mutation Add($input: ${type}Input) { ${name}: create${type}(input: $input) ${fields[name]} }`,
      set: `set${type}s`,
      mapping: res => prev => [...prev, res[name]],
      context: useDataContext,
      message: `${label} se ha creado correctamente.`,
      error: `Codigo en uso.`
    },
    UPDATE: {
      query: `mutation Update($id: ID!, $input: ${type}Input) { ${name}: update${type}(id: $id, input: $input) ${fields[name]} }`,
      set: `set${type}s`,
      mapping: (res, vars) => prev => [...prev.filter(t => t.id !== vars.id), res[name]],
      context: useDataContext,
      message: `${label} se ha modificado correctamente.`,
      error: `Codigo en uso.`
    },
    DROP: {
      query: `mutation Drop($id: ID) { ${name}: delete${type}(id: $id) { id } }`,
      set: `set${type}s`,
      mapping: (_, vars) => prev => [...prev.filter(t => t.id !== vars.id)],
      context: useDataContext,
      message: `${label} se ha eliminado correctamente.`,
      error: `${label} no se puede eliminar.`
    }
  };
};

export const data = {
  bibliotecas: getTypes('Biblioteca', 'bibliotecas', 'La biblioteca'),
  gruposUsuario: {
    ...getTypes('GrupoUsuario', 'gruposUsuario', 'El grupo de usuario'),
    ALL: {
      query: `query { gruposUsuario ${fields.gruposUsuario} bibliotecas ${fields.bibliotecas} }`,
      set: ['setGrupoUsuarios', 'setBibliotecas'],
      format: {
        setBibliotecas: ['bibliotecas'],
        setGrupoUsuarios: ['gruposUsuario']
      },
      context: useDataContext
    }
  },
  multas: {
    ...getTypes('Multa', 'multas', 'La multa'),
    ALL: {
      query: `query { multas ${fields.multas} bibliotecas ${fields.bibliotecas} }`,
      set: ['setMultas', 'setBibliotecas'],
      format: { setMultas: ['multas'], setBibliotecas: ['bibliotecas'] },
      context: useDataContext
    }
  },
  tiposItem: getTypes('TipoItem', 'tiposItem', 'El tipo de item'),
  politicas: {
    ...getTypes('Politica', 'politicas', 'La politica'),
    ALL: {
      query: `query {
        politicas ${fields.politicas}
        bibliotecas ${fields.bibliotecas}
        gruposUsuario ${fields.gruposUsuario}
        tiposItem ${fields.tiposItem}
      }`,
      set: ['setPoliticas', 'setBibliotecas', 'setGrupoUsuarios', 'setTipoItems'],
      format: {
        setPoliticas: ['politicas'],
        setBibliotecas: ['bibliotecas'],
        setGrupoUsuarios: ['gruposUsuario'],
        setTipoItems: ['tiposItem']
      },
      context: useDataContext
    }
  }
};

export const items = {
  ADD: {
    query: `mutation Add($input: ItemInput) { items: createItem(input: $input) ${fields.items} }`,
    set: `setItems`,
    mapping: (res, vars) => {
      const callback = prev => [...prev, res.items];
      return [callback, vars.regId];
    },
    message: 'Se ha creado el item exitosamente',
    error: 'El codigo esta en uso',
    context: useInventarioContext
  },
  UPDATE: {
    query: `mutation Update($id: ID!, $input: ItemInput) { items: updateItem(id: $id, input: $input) ${fields.items} }`,
    set: `setItems`,
    mapping: (res, vars) => {
      const callback = prev => [...prev.filter(t => t.id !== vars.id), res.items];
      return [callback, vars.regId];
    },
    message: 'Se ha modificado el item exitosamente',
    error: 'El codigo esta en uso',
    context: useInventarioContext
  },
  DROP: {
    query: `mutation Drop($id: ID) { items: deleteItem(id: $id) { id } }`,
    set: `setItems`,
    mapping: (_, vars) => {
      const callback = prev => [...prev.filter(t => t.id !== vars.id)];
      return [callback, vars.regId];
    },
    message: 'Se ha eliminado el item exitosamente',
    error: 'El item no se puede eliminar porque esta en uso',
    context: useInventarioContext
  }
};

export const auth = {
  LOGIN: {
    query: `query Login($usuario: String!, $password: String!) {
      login(usuario: $usuario, password: $password) {
        token usuario { nombre a_paterno foto }
      }
    }`,
    load: false,
    set: ['setToken', 'setAuth'],
    format: { setToken: ['login', 'token'], setAuth: ['login', 'usuario'] },
    context: useAppContext
  },
  VERIFY: {
    query: `query Veririfar($token: String) {
      verificar(token: $token) { nombre a_paterno foto }
    }`,
    set: ['setAuth'],
    format: { setAuth: ['verificar'] },
    context: useAppContext
  }
};

export const inventario = {
  ALL: {
    query: `query Reg($offset: Int, $filter: String) {
      registros(input: { limit: 10, offset: $offset, filter: $filter }) { id autor titulo isbn_issn editorial l_publicacion f_publicacion }      
    }`,
    set: ['addRegistros'],
    format: { addRegistros: ['registros'] },
    context: useInventarioContext
  },
  ONE: {
    query: `query Registro($id: ID) { registro(id: $id) ${fields.registros} }`,
    set: ['setRegistro'],
    format: { setRegistro: ['registro'] },
    context: useInventarioContext
  },
  ADD: {
    query: `mutation Add($input: RegistroInput) { registros: createRegistro(input: $input) ${fields.registros}}`,
    set: `setRegistros`,
    mapping: res => prev => [...prev, res.registros],
    message: 'El registro ha sido agregado correctamente',
    error: 'El codigo esta en uso',
    context: useInventarioContext
  },
  UPDATE: {
    query: `mutation Update($id: ID!, $input: RegistroInput) { registros: updateRegistro(id: $id, input: $input) ${fields.registros}}`,
    set: `setRegistros`,
    mapping: (res, vars) => prev => [...prev.filter(t => t.id !== vars.id), res.registros],
    message: 'El registro ha sido modificado exitosamente.',
    error: 'El codigo esta en uso',
    context: useInventarioContext
  },
  DROP: {
    query: `mutation Drop($id: ID) { registros: deleteRegistro(id: $id) { id } }`,
    set: `setRegistros`,
    mapping: (_, vars) => prev => [...prev.filter(t => t.id !== vars.id)],
    message: 'El registro ha sido eliminado correctamente.',
    error: 'El registro esta en uso',
    context: useInventarioContext
  }
};

export const usuarios = {
  ALL: {
    query: `query Usr($offset: Int, $filter: String) {
      usuarios(input: { limit: 10, offset: $offset, filter: $filter }) ${fields.usuarios}      
    }`,
    set: ['addUsuarios'],
    format: { addUsuarios: ['usuarios'] },
    context: useUsuariosContext
  },
  ONE: {
    query: `query Usuario($id: ID) { usuario(id: $id) ${fields.usuarios_full} }`,
    set: ['setUsuario'],
    format: { setUsuario: ['usuario'] },
    context: useUsuariosContext
  },
  ADD: {
    query: `mutation Add($input: UsuarioInput) { usuarios: createUsuario(input: $input) ${fields.usuarios}}`,
    set: `setUsuarios`,
    mapping: res => prev => [...prev, res.usuarios],
    message: 'El usuario ha sido creado exitosamente',
    error: 'El codigo esta en uso',
    context: useUsuariosContext
  },
  UPDATE: {
    query: `mutation Update($id: ID!, $input: UsuarioInput) { usuarios: updateUsuario(id: $id, input: $input) ${fields.usuarios}}`,
    set: `setUsuarios`,
    mapping: (res, vars) => prev => [...prev.filter(t => t.id !== vars.id), res.usuarios],
    message: 'El usuario ha sido modificado exitosamente',
    error: 'El codigo esta en uso',
    context: useUsuariosContext
  },
  DROP: {
    query: `mutation Drop($id: ID) { usuarios: deleteUsuario(id: $id) { id } }`,
    set: `setUsuarios`,
    mapping: (_, vars) => prev => [...prev.filter(t => t.id !== vars.id)],
    message: 'El usuario ha sido eliminado exitosamente',
    error: 'El usuario esta en uso',
    context: useUsuariosContext
  }
};

export const loans = {
  ONE: {
    query: `query Usuario($codigo: String) { usuario(codigo: $codigo) ${fields.usuarios_loan} }`,
    set: ['setUsuario'],
    load: false,
    format: { setUsuario: ['usuario'] },
    context: usePrestamoContext
  },
  FIND: {
    query: `query Item($codigo: String) { item(codigo: $codigo) ${fields.item} }`,
    load: false,
    context: usePrestamoContext
  },
  ADD: {
    query: `mutation Add($input: PrestamoInput) { prestamos: createPrestamo(input: $input) ${fields.prestamos} } `,
    set: `setUsuario`,
    mapping: res => prev => {
      return { ...prev, prestamos: [...prev.prestamos, res.prestamos] };
    },
    message: 'Item prestado correctamente.',
    context: usePrestamoContext
  },
  UPDATE: {
    query: `mutation Update($id: ID!, $input: ItemInput) { item: updateItem(id: $id, input: $input) ${fields.item} } `,
    set: 'setItems',
    mapping: res => prev => [...prev, res.item],
    context: usePrestamoContext
  }
};

export const accounts = {
  PAY: {
    query: `mutation Pay($id: ID!, $input: CuentaInput) { cuentas: updateCuenta(id: $id, input: $input) ${fields.cuentas} } `,
    set: 'setCuenta',
    mapping: (res, vars) => {
      return [vars, res];
    },
    message: 'Pago realizado',
    context: useUsuariosContext
  }
};

export const blocks = {
  ONE: {
    query: `query Block($id: ID!){
      blocks: bloqueos(id: $id) {
        f_inicio
        f_termino
      }
    }`,
    set: ['setBlocks'],
    format: { setBlocks: ['blocks'] },
    context: usePrestamoContext
  }
};

export const returns = {
  RETURN: {
    query: `mutation Return($codigo: String, $input: PrestamoInput) { prestamos: returnPrestamo(codigo: $codigo, input: $input) ${fields.prestamos_loan} } `,
    set: `setItems`,
    mapping: res => prev => {
      return [...prev, res.prestamos];
    },
    error: 'Este item no esta en prestamo',
    message: 'Item devuelto correctamente',
    context: useDevolucionContext
  },
  ADD: {
    query: `mutation Add($input: CuentaInput) { cuentas: createCuenta(input: $input) ${fields.cuentas}}`,
    set: 'setCuenta',
    mapping: (res, vars) => {
      return [vars, res];
    },
    message: 'Multa generada.',
    context: useUsuariosContext
  },
  BLOCK: {
    query: `mutation Add($input: BloqueoInput) { bloqueos: createBloqueo(input: $input) ${fields.bloqueos}}`,
    set: '',
    mapping: () => () => {},
    message: 'La devolucion de este item ha generado un bloqueo.',
    context: useDevolucionContext
  },
  RENEW: {
    query: `mutation Renew($id: ID!, $input: PrestamoInput) { prestamos: renewPrestamo(id: $id, input: $input) ${fields.prestamos_loan} } `,
    set: 'setPrestamo',
    mapping: (res, vars) => {
      return [vars, res];
    },
    message: 'Item renovado',
    context: useUsuariosContext
  }
};
