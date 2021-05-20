import PoliciesPanel from './PoliciesPanel/PoliciesPanel';

export const panels = [
  {
    link: 'bibliotecas',
    title: 'Bibliotecas',
    single: 'Biblioteca',
    query: 'BIBLIO',
    visibleCols: ['codigo', 'nombre', 'url'],
    columnAlias: { codigo: 'Código' },
    validate: { codigo: 'req', nombre: 'req', url: 'url' },
    fields: [
      { name: 'codigo', label: 'Código' },
      { name: 'nombre', label: 'Nombre' },
      { name: 'url', label: 'URL' }
    ]
  },
  {
    link: 'gruposUsuario',
    title: 'Grupos de Usuario',
    single: 'Grupo de usuario',
    query: 'GRUPOS',
    columnAlias: { codigo: 'Código' },
    visibleCols: ['codigo', 'nombre', 'biblioteca', 'staff'],
    validate: { codigo: 'req', nombre: 'req' },
    initialValues: { staff: 'false' },
    fields: [
      { name: 'codigo', label: 'Código' },
      { name: 'nombre', label: 'Nombre' },
      { name: 'biblioteca_id', type: 'select', label: 'Biblioteca' },
      { name: 'staff', type: 'bool', label: 'Staff' }
    ]
  },
  {
    link: 'multas',
    title: 'Multas Manuales',
    single: 'Multa manual',
    query: 'MULTAS',
    columnAlias: { codigo: 'Código' },
    visibleCols: ['codigo', 'nombre', 'biblioteca', 'cargo'],
    validate: { codigo: 'req', nombre: 'req', cargo: 'money' },
    fields: [
      { name: 'codigo', label: 'Código' },
      { name: 'nombre', label: 'Nombre' },
      { name: 'biblioteca_id', type: 'select', label: 'Biblioteca' },
      { name: 'cargo', label: 'Cargo' }
    ]
  },
  {
    link: 'tiposItem',
    title: 'Tipos de Item',
    single: 'Tipo de item',
    query: 'TIPOS',
    columnAlias: {
      codigo: 'Código',
      costo_prestamo: 'Costo de prestamo',
      disponible_prestamo: 'Para prestamo'
    },
    visibleCols: ['codigo', 'nombre', 'costo_prestamo', 'disponible_prestamo'],
    validate: { codigo: 'req', nombre: 'req', costo_prestamo: 'money' },
    initialValues: { disponible_prestamo: 'true' },
    fields: [
      { name: 'codigo', label: 'Código' },
      { name: 'nombre', label: 'Nombre' },
      { name: 'costo_prestamo', label: 'Costo de prestamo' },
      { name: 'disponible_prestamo', type: 'bool', label: 'Para prestamo' }
    ]
  },
  {
    link: 'politicas',
    title: 'Politicas',
    component: PoliciesPanel,
    columnAlias: { descripcion: 'descripción' },
    visibleCols: ['nombre', 'descripcion']
  }
];
