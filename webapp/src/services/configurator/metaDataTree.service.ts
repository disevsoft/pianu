import config from "@/configs/configurator/mdTree.config";
import { uuid } from "vue-uuid";
import { NodeType } from "@/configs/configurator/mdTree.config";
export { NodeType as NodeType };

class TreeHelper {
  public static getMdTreeRoot() {
    const confNodes = config;
    const nodes: Array<NodeData> = [];
    confNodes.forEach((element: any) => {
      nodes.push(
        new NodeData(
          element.nodeType,
          element.mdTypeId,
          element.id,
          element.name,
          element.parentId,
          element.canAdd,
          element.canEdit
        )
      );
    });
    return nodes;
  }

  public static async getTreeNodes(targetNode: NodeData) {
    const queryParam = {
      command: "getMdObjectsList",
      options: {
        mtTypeId: targetNode.mdTypeId,
      },
    };
    const data = await TreeHelper.postMd(queryParam);
    console.log(data);
    const nodes = TreeHelper.prepareMapData(data, NodeType.MdObject);

    return nodes;
  }

  public static async getMdObjectData(targetNode: any) {
    const queryParam = {
      command: "getMdObject",
      options: {
        mdTypeId: targetNode.mdTypeId,
        mdObjectId: targetNode.id,
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
    console.log(queryParam);
    return await TreeHelper.postMd(queryParam);
  }

  private static async postMd(queryParam: any) {
    const response = await fetch("/api/md", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queryParam),
    });
    const data = await response.json();
    return data;
  }

  static prepareMapData(nodeData: any, nodeType: NodeType) {
    const nodes: Array<NodeData> = [];
    nodeData.forEach((elData: any) => {
      const element = elData[1];
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
