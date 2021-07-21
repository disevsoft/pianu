import config from "@/configs/configurator/mdTree.config";
import {mdTreeSubfolders} from "@/configs/configurator/mdTreeSubFolders.config";
import { uuid } from "vue-uuid";
import { NodeType } from "@/configs/configurator/mdTree.config";
export { NodeType as NodeType };
import EventBus from '../../components/configurator/CfgEventBus';
import {authHeader} from '../../helpers/authHeader';

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
    const queryParam = {
      command: "getMdObjectsList",
      options: {
        mdTypeId: nodeData.mdTypeId,
        parentId: nodeData.parentId,
      }, 
    };
    const data = await TreeHelper.postMd(queryParam);
    const nodes = TreeHelper.prepareNodeData(data, NodeType.MdObject);    
    return nodes;
  }

  private static async getMdObjectSubfolder(nodeData: NodeData){
    const data =  await mdTreeSubfolders[nodeData.mdTypeId](nodeData.mdTypeId, nodeData.id);
    if(!data){return []};
    const nodes = TreeHelper.prepareNodeData(data, NodeType.MdObjectFolder);    
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
    const queryParam = {
      command: "getMdObject",
      options: {
        mdTypeId: targetNode.mdTypeId,
        mdObjectId: targetNode.id,
        parentId:targetNode.parentId
      },
    };       
    return await TreeHelper.postMd(queryParam);
  }

  public static async saveMdObjectData(mdObjectData: any) {
    const queryParam = {
      command: "saveMdObject",
      options: {
        mdObject: mdObjectData,
      },
    };
    const data = await TreeHelper.postMd(queryParam);    
    return data;
  }

  public static async deleteMdObject(targetNode: any) {   
    const queryParam = {
      command: "deleteMdObject",
      options: {
        mdTypeId: targetNode.mdTypeId,
        mdObjectId: targetNode.id,
      },
    };    
    return await TreeHelper.postMd(queryParam);
  }

  private static async getHeaders(){
    const headers:Headers = authHeader();
    headers.set('Content-Type', 'application/json');
    return headers;
  } 
  
  private static async postMd(queryParam: any) {
    const headers = await TreeHelper.getHeaders();
    const response = await fetch("/api/md", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(queryParam),
    });
    
    const resData = await response.json();  
    EventBus.emit('apiLog', resData.info);
    return resData.data;
  }

  static async initModel(){
    const queryParam = {
      command: "initConfigModel",
      options: {
        force: false,
      },
    };
    const data = await TreeHelper.postMd(queryParam);    
    return data;
  }

  static prepareNodeData(nodeData: any, nodeType: NodeType) {
    if(!nodeData){
      return[];
    }
    const nodes: Array<NodeData> = [];
    nodeData.forEach((elData: any) => {
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
