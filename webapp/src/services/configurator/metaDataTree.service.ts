import config from "@/configs/configurator/mdTree.config";
import {mdTreeSubfolders} from "@/configs/configurator/mdTreeSubFolders.config";
import { uuid } from "vue-uuid";
import { NodeType } from "@/configs/configurator/mdTree.config";
export { NodeType as NodeType };
import {MdApiCommandArgs, MdApi} from '../app/api.service'
import MdType from '../../metadata/mdType.class'
import * as MdHelper from '../../metadata/mdHelper'
import { MdTypes } from "@/metadata/MdTypes";
import MdTypeField from './mdTypesField'
import DomainService from '../../services/app/domain.service'
import FilterItem from "@/classes/filterItem";
export class TreeHelper {
  public static getMdTreeRoot() {
    const confNodes = config;
    const nodes: Array<NodeData> = [];
    confNodes.forEach((element: any) => {
      const node =  new NodeData(
        element.nodeType,
        element.mdTypeId,
        element.id,
        element.name,
        element.parentId,
        element.canAdd,
        element.canEdit
      )
      nodes.push(node);
    });
    return nodes;
  }

  public static async getMdObjectsList(nodeData: NodeData){ 
    const data = await MdHelper.getMdObjects(nodeData.mdTypeId, nodeData.parentId);    
    const nodes = await TreeHelper.prepareNodeData(data, NodeType.MdObject);    
    return nodes;
  }

  public static async initDomain(nodeData: NodeData){  
    return await DomainService.initDomainById(nodeData.id);
  }


  private static async getMdObjectSubfolder(nodeData: NodeData){
    const data =  await mdTreeSubfolders[nodeData.mdTypeId](nodeData.mdTypeId, nodeData.id);
    if(!data){return []};
    const nodes = await TreeHelper.prepareNodeData(data, NodeType.MdObjectFolder);    
    return nodes;
  }

  public static async getTreeNodes(nodeData: NodeData) { 
    if(nodeData.nodeType===NodeType.MdRootType){
      return await TreeHelper.getMdObjectsList(nodeData);
    }

    if(nodeData.nodeType===NodeType.MdObject){
      if (nodeData.mdTypeId===MdTypes.MenuItem){
          const itemNodeData = TreeHelper.getNewNodeData(nodeData);
          itemNodeData.parentId= nodeData.id;    
          return await TreeHelper.getMdObjectsList(itemNodeData) ;      
      }
      else{
        return await TreeHelper.getMdObjectSubfolder(nodeData);
      }
    }

    if(nodeData.nodeType===NodeType.MdObjectFolder){
      return await TreeHelper.getMdObjectsList(nodeData);
    }
  }

  public static async getMdObjectData(targetNode: any) {     
    const apiCommandArgs = new MdApiCommandArgs("getMdObject", {mdTypeId: targetNode.mdTypeId, mdObjectId: targetNode.id, parentId:targetNode.parentId})
    const data = await MdApi.execApiCommand(apiCommandArgs); 
    return data;
  }

  public static async getMdObjectPresentation(mdObjects:Array<string>) {     
    let result = '';
    for await (const iterator of mdObjects) {
      const data = await MdHelper.getMdObjectById(iterator, '');   
      result = result + (result? ' ,': '') + data?.name;  
    }  
    return result;
  }

  public static async getMdObjectFields(targetNode: any){
    const data = await TreeHelper.getMdObjectData(targetNode);
    return await TreeHelper.getFieldsFromResponse(data);
  }

  private static async getFieldsFromResponse(data:any){
    if (!data) {return undefined};
    const fieldsArray:Array<MdTypeField> = [];
    for await (const iterator of (data as any)) {
      const fieldProps = await MdTypeField.getTypeField(iterator.name, iterator.type, iterator.size, 
        iterator.value, iterator.defaultValue, iterator.readOnly, iterator.fieldMap);
        fieldsArray.push(fieldProps);
    } 
    return fieldsArray;
  }

  public static async getMdTypes(filter:any) {   
  
    const data = await MdType.getTypes(); 
    const typesArray:Array<any> = [];
    if(!data) return;
    for await (const elem of data) { 
      if(filter){
        let applylFilter = false;
        filter.forEach((value:FilterItem, key:string)=>{
          applylFilter = value.filterApply(elem, key);
        })      
        if(!applylFilter){continue;}
      }
      const node = new NodeData(NodeType.MdRootType, elem.id, elem.id, elem.name, '', false, false);
      const children = await TreeHelper.getMdObjectsList(node);
      node.children = children;
      typesArray.push(node);
    };
    return typesArray;
  }

  public static async saveMdObjectData(mdObjectData: any) {   
    await MdHelper.resetCache();
    const apiCommandArgs = new MdApiCommandArgs("saveMdObject", { mdObject: mdObjectData})
    const data = await MdApi.execApiCommand(apiCommandArgs);   
    const fieldsArray = await TreeHelper.getFieldsFromResponse(data);
    return fieldsArray;
  }

  public static async deleteMdObject(targetNode: any) {     
    const apiCommandArgs = new MdApiCommandArgs("deleteMdObject", { mdTypeId: targetNode.mdTypeId, mdObjectId: targetNode.id})
    const data = await MdApi.execApiCommand(apiCommandArgs); 
    await MdHelper.resetCache();
    return data;
  }

  static async initModel(){
   
    const apiCommandArgs = new MdApiCommandArgs("initConfigModel", { force: false})
    const data = await MdApi.execApiCommand(apiCommandArgs); 
    return data;
  }

  public static async prepareNodeData(nodeData: any, nodeType: NodeType) {
    if(!nodeData){
      return[];
    }
    const nodes: Array<NodeData> = [];
    await nodeData.forEach((elData: any) => {
      const element = elData;
      nodes.push(
        new NodeData( 
          nodeType,
          element.typeId,
          element.id,
          element.name,
          element.parentId,
          TreeHelper.nodeSupportAdd(nodeType),
          TreeHelper.nodeSupportEdit(nodeType)
        )
      );
    });
    return nodes;
  }

  static nodeSupportAdd(nodeType: NodeType) {
    if (nodeType === NodeType.Folder) {
      return false;
    }
    if (nodeType === NodeType.MdObject) {
      return true;
    }
    if (nodeType === NodeType.MdObjectFolder) {
      return true;
    }
    if (nodeType === NodeType.MdRootType) {
      return true;
    }
    return false;
  }

  static nodeSupportEdit(nodeType: NodeType) {
    if (nodeType === NodeType.Folder) {
      return false;
    }
    if (nodeType === NodeType.MdObject) {
      return true;
    }
    if (nodeType === NodeType.MdObjectFolder) {
      return false;
    }
    if (nodeType === NodeType.MdRootType) {
      return false;
    }
    return false;
  }
  
  public static getNewNodeData(nodeData:NodeData){
    const newNodeData = new NodeData(nodeData.nodeType, nodeData.mdTypeId, nodeData.id,nodeData.name, nodeData.parentId,
      nodeData.canAdd,
      nodeData.canEdit);
      newNodeData.id='';
      return newNodeData;
  }
}
class NodeData {
  name = "";
  id = "";
  elementId = "";
  canAdd = false;
  canEdit = false;
  parentId = "";
  nodeType = NodeType.MdObject;
  mdTypeId = MdTypes.None;
  children:Array<NodeData>=[];
  constructor(
    nodeType: NodeType,
    mdTypeId: string,
    id: string,
    name: string,
    parentId: string,
    canAdd: boolean,
    canEdit: boolean
  ) {
    this.nodeType = nodeType;
    this.name = name;
    this.id = id;
    this.parentId = !parentId?'':parentId;
    this.elementId = uuid.v4();
    this.canAdd = canAdd;
    this.canEdit = canEdit;
    this.mdTypeId = (mdTypeId as MdTypes);
  }
}
export default { NodeData, TreeHelper }; 
