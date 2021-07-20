import {MdTypes} from '../../common/MdTypes'

export enum NodeType {
  MdRootType =0,
  MdObject,
  MdObjectFolder,
  Folder,
}

export default [
  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    mdTypeId: MdTypes.Catalog,
    name: "Catalogs",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Справочник",
  },
  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    mdTypeId: MdTypes.Document,
    name: "Documents",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Документ",
  },
  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    mdTypeId: MdTypes.Domains,
    name: "Domains",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Домен",
  },
  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    mdTypeId: MdTypes.Subsystem,
    name: "Subsystems",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Подсистема",
  },
  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    mdTypeId: MdTypes.User, 
    name: "Users",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Пользователь",
  },
];
