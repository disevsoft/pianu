import {MdTypes} from '../../metadata/MdTypes'
import {NodeType} from '../configurator/mdTree.config';
import {TreeHelper} from '../../services/configurator/metaDataTree.service'
import * as MdHelper from '../../metadata/mdHelper'
const tablesSubFolder =  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    typeId: MdTypes.Table,
    name: "Tables",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "Таблица",
   
};
const webFormsSubFolder = {
    canAdd: true,
    canEdit: false,
    children: undefined,
    typeId: MdTypes.WebForm,
    name: "WebForms",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "ВебФорма",
};
const fieldsSubFolder = {
    canAdd: true,
    canEdit: false,
    children: undefined,
    typeId: MdTypes.Field,
    name: "Fields",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "Реквизит",
};
const reportssSubFolder = {
    canAdd: true,
    canEdit: false,
    children: undefined,
    typeId: MdTypes.Report,
    name: "Reports",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "Отчеты",
}
const usersSubFolder = {
    canAdd: true,
    canEdit: false,
    children: undefined,
    typeId: MdTypes.User,
    name: "Users",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "Пользователи",
}

const enumItemsSubFolder =  {
    canAdd: true,
    canEdit: false,
    children: undefined,
    typeId: MdTypes.EnumerationItem,
    name: "Values",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "Значения",
   
};
const menuItemsSubFolder =  {
    canAdd: true,
    canEdit: true,
    children: undefined,
    typeId: MdTypes.MenuItem,
    name: "items",
    nodeType: NodeType.MdObjectFolder,
    parentId: undefined,
    synonym: "Элементы меню",
   
};

function setParentId(subFolders:any, parentId:string){
    subFolders.forEach((subFolder:any)=>{
        subFolder.parentId = parentId
    });
};

export const mdTreeSubfolders: { [unit: string]: any;} = {}

mdTreeSubfolders[MdTypes.Document] = function(parentMdType:MdTypes, parentId:string){
    const subFolders = [tablesSubFolder, webFormsSubFolder, reportssSubFolder]
    setParentId(subFolders, parentId)
    return subFolders;
}

mdTreeSubfolders[MdTypes.Catalog] = function(parentMdType:MdTypes, parentId:string){
    const subFolders = [tablesSubFolder, webFormsSubFolder, reportssSubFolder]
    setParentId(subFolders, parentId);
    return subFolders;
}

mdTreeSubfolders[MdTypes.Table] = function(parentMdType:MdTypes, parentId:string){
    const subFolders = [fieldsSubFolder];
    if(!parentId){
        subFolders.push(webFormsSubFolder);      
    }
    setParentId(subFolders, parentId);
    return subFolders;
}

mdTreeSubfolders[MdTypes.Domains] = async function(parentMdType:MdTypes, parentId:string){
    const subFolders = [usersSubFolder];
    setParentId(subFolders, parentId);
    return subFolders;
}

mdTreeSubfolders[MdTypes.Field] = async function(parentMdType:MdTypes, parentId:string){
    return undefined;
}

mdTreeSubfolders[MdTypes.User] = async function(parentMdType:MdTypes, parentId:string){
    return undefined;
}
mdTreeSubfolders[MdTypes.Enumeration] = async function(parentMdType:MdTypes, parentId:string){
    const subFolders = [enumItemsSubFolder];
    setParentId(subFolders, parentId);
    return subFolders;
}
mdTreeSubfolders[MdTypes.MenuItem] = async function(parentMdType:MdTypes, parentId:string){
    // const data = await MdHelper.getMdObjects(parentMdType, parentId);         
    // return data;
    
    const subFolders = [enumItemsSubFolder];
    setParentId(subFolders, parentId);
    return subFolders;
}
