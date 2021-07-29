import config from "@/configs/configurator/mdTree.config";
import {mdTreeSubfolders} from "@/configs/configurator/mdTreeSubFolders.config";
import { uuid } from "vue-uuid";
import { NodeType } from "@/configs/configurator/mdTree.config";
export { NodeType as NodeType };
import {ApiCommandArgs, ApiMain} from '../app/api.service'
import {MdType} from '../../common/mdType.class'
class TreeHelper {
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

  private static async getMdObjectsList(nodeData: NodeData){ 
    const apiCommandArgs = new ApiCommandArgs("getMdObjectsList", {mdTypeId: nodeData.mdTypeId, parentId: nodeData.parentId})
    const data = await ApiMain.execApiCommand(apiCommandArgs);
    const nodes = await TreeHelper.prepareNodeData(data, NodeType.MdObject);    
    return nodes;
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
      return await TreeHelper.getMdObjectSubfolder(nodeData);
    }

    if(nodeData.nodeType===NodeType.MdObjectFolder){
      return await TreeHelper.getMdObjectsList(nodeData);
    }
  }

  public static async getMdObjectData(targetNode: any) {   
    const apiCommandArgs = new ApiCommandArgs("getMdObject", {mdTypeId: targetNode.mdTypeId, mdObjectId: targetNode.id, parentId:targetNode.parentId})
    const data = await ApiMain.execApiCommand(apiCommandArgs); 
    return data;
  }

  public static async getMdTypes() {   
  
    const data = await MdType.getTypes(); 
    const typesArray:Array<any> = [];
    if(!data) return;
    for await (const elem of data) { 
      const node = new NodeData(NodeType.MdRootType, elem.id, elem.id, elem.name, '', false, false);
      const children = await TreeHelper.getMdObjectsList(node);
      node.children = children;
      typesArray.push(node);
    };
    return typesArray;
  }

  public static async saveMdObjectData(mdObjectData: any) {   
    const apiCommandArgs = new ApiCommandArgs("saveMdObject", { mdObject: mdObjectData})
    const data = await ApiMain.execApiCommand(apiCommandArgs); 
    return data;
  }

  public static async deleteMdObject(targetNode: any) {   
   
    const apiCommandArgs = new ApiCommandArgs("deleteMdObject", { mdTypeId: targetNode.mdTypeId, mdObjectId: targetNode.id})
    const data = await ApiMain.execApiCommand(apiCommandArgs); 
    return data;
  }

  static async initModel(){
   
    const apiCommandArgs = new ApiCommandArgs("initConfigModel", { force: false})
    const data = await ApiMain.execApiCommand(apiCommandArgs); 
    return data;
  }

  static async prepareNodeData(nodeData: any, nodeType: NodeType) {
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
          element.mdId,
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
      return false;
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
  
}
class NodeData {
  name = "";
  id = "";
  elementId = "";
  canAdd = false;
  canEdit = false;
  parentId = "";
  nodeType = NodeType.MdObject;
  mdTypeId = "";
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
    this.parentId = parentId;
    this.elementId = uuid.v4();
    this.canAdd = canAdd;
    this.canEdit = canEdit;
    this.mdTypeId = mdTypeId;
  }
}
export default { NodeData, TreeHelper }; 
