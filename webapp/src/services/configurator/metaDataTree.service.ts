import config from '@/configs/configurator/mdTree.config'
import { uuid } from 'vue-uuid';
import  { NodeType }  from '@/configs/configurator/mdTree.config'
export {NodeType as NodeType}

class TreeHelper{
    public static getMdTreeRoot() {
        const confNodes = config; 
        const nodes:Array<NodeData> = [];
        confNodes.forEach((element:any)=>{
            nodes.push(new NodeData(element.nodeType, element.mdTypeId, element.id, element.name, element.parentId, element.canAdd, element.canEdit, element.canDelete));
        })
        return nodes;       
    }

    public static async getTreeNodes(targetNode: NodeData){
        const response = await fetch("/api/m");
        const data = await response.json();
        const nodes = TreeHelper.prepareMapData(data, NodeType.MdObject); 
        return nodes; 
    }

    static prepareMapData(nodeData:any, nodeType:NodeType){
        const nodes:Array<NodeData> = [];
        nodeData.forEach((elData:any) => {
           const element = elData[1];
           nodes.push(new NodeData(nodeType, element.mdTypeId, element.id, element.name, element.parentId, element.canAdd, element.canEdit, element.canDelete)); 
        });
        return nodes; 
    }
}
class NodeData{
    name = '';
    id = '';
    elementId= '';
    canAdd= false;
    canEdit= false;
    canDelete= false;
    parentId = '';
    nodeType = NodeType.MdObject;
    mdTypeId = '';
    constructor(nodeType:NodeType, mdTypeId:string, id:string, name:string, parentId:string, canAdd:boolean,  canEdit:boolean, canDelete:boolean){
        this.name = name;
        this.id = id;
        this.parentId = parentId;
        this.elementId = uuid.v4();
        this.canAdd = canAdd;
        this.canEdit=canEdit;
        this.canDelete = canDelete;
        this.mdTypeId = mdTypeId;
    }
}
export default{NodeData, TreeHelper}


