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
    mdTypeId: "834cd9ad-9720-4fc5-aa09-cef6f7a895a0",
    name: "Catalogs",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Справочник",
  },
  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    mdTypeId: "cc94220b-20f8-4a63-9f29-d02fe64ba918",
    name: "Documents",
    nodeType: NodeType.MdRootType,
    parentId: undefined,
    synonym: "Документ",
  },
];
