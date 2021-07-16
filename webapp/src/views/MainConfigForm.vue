<template>
  <div id="mainSurface" class="fullSize">
    <Splitpanes class="default-theme" vertical>
      <Pane :size="30">
        <el-container>
          <el-header> </el-header>
          <el-main>
            <el-tree
              @current-change="onCurrentNodeChange"
              ref="metaDataTreeRef"
              :data="nodes"
              node-key="elementId"
              :load="loadNodes"
              :expand-on-click-node="false"
              lazy
              :props="defaultTreeProps"
            >
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <i
                    :class="getTreeNodeClassName(data)"
                    style="padding-right: 5px"
                  >
                  </i>
                  <span>{{ node.label }}</span>
                  <span v-if="isSelectedNode(data)">
                    <span style="padding: 20px">
                      <i
                        v-show="data.canAdd"
                        class="el-icon-plus"
                        style="float: right"
                        margin-left="15px"
                        title="Add child node"
                        @click="onAddNode(node)"
                      >
                      </i>
                      <i
                        v-show="data.canEdit"
                        class="el-icon-edit-outline"
                        style="float: right"
                        margin-left="5px"
                        title="Edit node"
                        @click="onEditNode(node)"
                      >
                      </i>
                      <i
                        v-show="data.canEdit"
                        class="el-icon-delete"
                        style="float: right"
                        margin-left="5px"
                        title="Delete node"
                        @click="onDeleteNode(node)"
                      >
                      </i>
                    </span>
                  </span>
                </span>
              </template>
            </el-tree>
          </el-main>
        </el-container>
      </Pane>
      <Pane>
        <el-container>
          <el-header> </el-header>
          <el-main>
            <el-tabs
              ref="tabPanel"
              v-model="editableTabsValue"
              type="border-card"
              closable
              @tab-remove="removeTab"
              id="formTabs"
            >
              <el-tab-pane
                v-for="item in tabs"
                :key="item.elementId"
                :label="item.title"
                :name="item.name"
                lazy
                :ref="'pane-' + item.elementId"
              >
                <component
                  :is="currentTabComponent"
                  v-bind="getTabProps(item)"
                  @afterSave="onAfterSave(item)"
                  :ref="item.elementId"
                ></component>
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </Pane>
    </Splitpanes>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineProps,
  onMounted,
  watch,
  defineComponent,
  computed,
} from "vue";
import { Splitpanes, Pane } from "splitpanes";
import TreeService from "../services/configurator/metaDataTree.service";
import NodeData from "../services/configurator/metaDataTree.service";
import { ElTree } from "element-plus";
import { uuid } from "vue-uuid";
import СfgPropertyEditor from "../components/configurator/СfgPropertyEditor.vue";
import EventBus from '../components/configurator/CfgEventBus';
import {NodeType} from '../configs/configurator/mdTree.config';
export default defineComponent({
  components: {
    Splitpanes,
    Pane,
  },
  data() {
    return {
      nodes: [],
    };
  },

  setup() {
    const selectedNodeId = ref("");
    const tabs = ref([{}]);
    tabs.value = [];
    const editableTabsValue = ref("");
    const metaDataTreeRef = ref(ElTree);
    const defaultTreeProps = {
      children: "children",
      label: "name",
    };

    const currentTabComponent = computed(() => {
      return СfgPropertyEditor;
    });

    const getTabProps = (tabItem: any) => {
      
      const mdObjectDescr = {
        mdTypeId: tabItem.data.mdTypeId,
        id: tabItem.data.id,
        parentId: tabItem.data.parentId,
      };

      return { mdObjectDescr: mdObjectDescr, elementId: tabItem.elementId };
    };

    const onCurrentNodeChange = (n: any) => {
      selectedNodeId.value = n.elementId;
    };

    const removeTab=(targetName:any)=>{
       let _tabs = tabs.value;;
        let activeName = editableTabsValue.value;
        if (activeName === targetName) {
          _tabs.forEach((tab:any, index) => {
            if (tab.name === targetName) {
              let nextTab:any = _tabs[index + 1] || _tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        editableTabsValue.value = activeName;
        tabs.value = _tabs.filter((tab:any) => tab.name !== targetName);
    };
    const onEditNode = (node: any) => {
      if (findeAndActivateTab(node)) {
        return;
      }
      const elementId = uuid.v4();
      const tabData = {
        title: node.data.name,
        name: elementId,
        data: node.data,
        elementId:elementId,
        node:node
      };
      tabs.value.push(tabData);
      editableTabsValue.value = tabData.name;
    };

    const findeAndActivateTab = (node: any) => {
      let result = false;
      let tab: any = tabs.value.find((el: any) => el?.data.id === node.data.id);
      if (tab) {
        editableTabsValue.value = tab.name;
        result = true;
      }
      return result;
    };

    const onAddNode = (node: any) => {
      const elementId = uuid.v4();
      const tabData = {
        title: node.data.name,
        name: elementId,
        data: node.data,
        elementId:elementId, 
        node:node
      };
      tabs.value.push(tabData);
      editableTabsValue.value = tabData.name;
    };

    const loadNodes = async (node: any, resolve: any) => {
      if (node.level === 0) {
        const data = TreeService.TreeHelper.getMdTreeRoot();
        return resolve(data);
      } else {
        const data = await TreeService.TreeHelper.getTreeNodes(node.data);      
        return resolve(data);
      }
    };

    const dataChanged = async (dataChangedArgs:any) => {   
      let parentNode:any|undefined = undefined;
      let tabData:any = tabs.value.find((elem:any)=>elem.elementId === dataChangedArgs.targetElementId)     
      if(!tabData){
        return;
      }
      tabData.data.id = dataChangedArgs.id;
      if(tabData.node.data.nodeType=== NodeType.MdRootType  || tabData.node.data.nodeType===NodeType.MdObjectFolder){
        parentNode = tabData.node;
        }
      else{ 
        parentNode = tabData.node.parent;
      }
      if(parentNode){   
        const data = await TreeService.TreeHelper.getTreeNodes(parentNode.data);
        metaDataTreeRef.value.updateKeyChildren(parentNode.data.elementId, data);
        updateNodes(parentNode);
      }
    };

    const updateNodes= async (parentNode:any)=> {    
      parentNode.childNodes.forEach((nodeElement:any) => {
        let tabData:any = tabs.value.find((elem:any)=>elem.data.id === nodeElement.data.id);
        if (tabData){        
          tabData.title= nodeElement.data.name,
          tabData.data =  nodeElement.data,
          tabData.node =nodeElement;  
        }
      });
    };
    const isSelectedNode = (node: any) => {
      return selectedNodeId.value === node.elementId;
    };

    const getTreeNodeClassName = (nodeData: any) => {
      let iconName = "";
      if (nodeData.mdTypeId === "834cd9ad-9720-4fc5-aa09-cef6f7a895a0") {
        iconName = "el-icon-notebook-2";
      }
      if (nodeData.mdTypeId === "cc94220b-20f8-4a63-9f29-d02fe64ba918") {
        iconName = "el-icon-document";
      }
      //table
      if (nodeData.mdTypeId === "0cf72dda-2547-4333-aec0-c852d2f3f235") {
        iconName = "el-icon-s-grid";
      }
      //field
      if (nodeData.mdTypeId === "8c474f75-b63a-4f3a-b624-f9a58cb7eeae") {
        iconName = "el-icon-minus";
      }
      //WebForm
      if (nodeData.mdTypeId === "370c9fb7-c2c8-4360-9863-6dc456460080") {
        iconName = "el-icon-s-platform";
      }
      return iconName;
    };

    return {
      loadNodes,
      defaultTreeProps,
      getTreeNodeClassName,
      isSelectedNode,
      onCurrentNodeChange,
      editableTabsValue,
      removeTab,
      currentTabComponent,
      onAddNode,
      tabs,
      getTabProps,
      onEditNode,
      dataChanged,
      metaDataTreeRef
    };
  },
   mounted() {

    EventBus.on('dataChanged', this.dataChanged); // 1
  },
});
</script>

<style scoped>
.fullSize {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
/* .full-height{
    height: 100% !important;  
  } */
/* .el-tabs{
   height: 100% !important;  
  } */
/* .el-tabs__content{
   height: 100% !important;   
  }
  .el-tab-pane{
    height: 100% !important;   
  }
  .el-table--fit{
    height: 100% !important;   
  } */
</style>
