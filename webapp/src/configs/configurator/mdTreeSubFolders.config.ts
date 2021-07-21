import {MdTypes} from '../../common/MdTypes'
import {NodeType} from '../configurator/mdTree.config';


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

mdTreeSubfolders[MdTypes.Domains] = function(parentMdType:MdTypes, parentId:string){
    const subFolders = [usersSubFolder];
    setParentId(subFolders, parentId);
    return subFolders;
}

mdTreeSubfolders[MdTypes.Field] = function(parentMdType:MdTypes, parentId:string){
    return undefined;
}

mdTreeSubfolders[MdTypes.User] = function(parentMdType:MdTypes, parentId:string){
    return undefined;
}
