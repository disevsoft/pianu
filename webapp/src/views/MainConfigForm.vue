<template>
  <div id="mainSurface" class="fullSize">
    <Splitpanes class="default-theme" vertical>
      <Pane :size="30">
        <el-container class="full-height">
          <el-header class="form-header"> 
          </el-header>
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
                      <el-popconfirm
                        confirmButtonText='OK'
                        cancelButtonText='No, Thanks'
                        icon="el-icon-info"
                        iconColor="red"
                        title="Are you sure to delete this?"
                        @confirm="onDeleteNode(node)"
                      >
                      <template #reference>
                        <i
                        v-show="data.canEdit"
                        class="el-icon-delete"
                        style="float: right"
                        margin-left="5px"
                        title="Delete node"
                        
                      >
                      </i>
                        </template>
                      </el-popconfirm>
                    </span>
                  </span>
                </span>
              </template>
            </el-tree>
          </el-main>
        </el-container>
      </Pane>
      <Pane>
        <el-container class="full-height">
            <el-header  class="form-header" style="text-align: right; font-size: 12px; display: inline !important">
            <el-dropdown trigger="click" style= "cursor:pointer">
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="onInitModel">Init DB model</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            
            <el-dropdown trigger="click" style= "cursor:pointer">
            <span class="el-dropdown-link">
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onLogOut">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          </el-header>
          <el-main>
             <Splitpanes class="default-theme" horizontal>
                <Pane :size="80">
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
                </Pane>
                <Pane>
                  <div id="log" class="logger">
                    <p v-for="item in logData" :key="item">
                      {{ item }}
                    </p>
                  </div>
                </Pane>
            </Splitpanes>
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
import 'splitpanes/dist/splitpanes.css';
import TreeService from "../services/configurator/metaDataTree.service";
import NodeData from "../services/configurator/metaDataTree.service";
import { ElTree } from "element-plus";
import { uuid } from "vue-uuid";
import СfgPropertyEditor from "../components/configurator/СfgPropertyEditor.vue";
import EventBus from '../components/configurator/CfgEventBus';
import {NodeType} from '../configs/configurator/mdTree.config';
import {getTypeIconName} from '../metadata/MdTypes'
import { useStore } from 'vuex'

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
    const logData = ref([{}]);
    logData.value = [];
    const editableTabsValue = ref("");
    const metaDataTreeRef = ref(ElTree);
    const store = useStore();
    const user = ref(store.state.authentication.user)
    const defaultTreeProps = {
      children: "children",
      label: "name",
    };

    onMounted(() => {
       EventBus.on('dataChanged', dataChanged); // 1
      EventBus.on('apiEvent', apiLog);
    });
    const currentTabComponent = computed(() => {
      return СfgPropertyEditor;
    });
    const onInitModel=()=>{
      TreeService.TreeHelper.initModel();  
    };
    const onLogOut=()=>{
      store.dispatch('authentication/logout');
    };
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

    const onDeleteNode=async(node:any)=>{
      await TreeService.TreeHelper.deleteMdObject(node.data);
      const tabIndex = tabs.value.findIndex((elem:any)=>elem.data.id===node.data.id);
      
      if(tabIndex>=0){
        tabs.value.splice(tabIndex, 1);       
      }
      const parentNode = node.parent;
      if(parentNode){   
        const data = await TreeService.TreeHelper.getTreeNodes(parentNode.data);
        metaDataTreeRef.value.updateKeyChildren(parentNode.data.elementId, data);
        updateNodes(parentNode);
      }
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
        if(data){
          return resolve(data);
        }
      }
    };

    const apiLog = async (logInfo:any)=>{
      if(logInfo && logInfo.message){
        logData.value.push(logInfo.message)
      }
    }
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
      let iconName = getTypeIconName(nodeData.mdTypeId);
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
      metaDataTreeRef,
      onInitModel,
      onDeleteNode,
      apiLog,
      logData,
      user,
      onLogOut
    };
  },
  
});
</script>

<style scoped>
/* .fullSize {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
} */
.logger{
  text-align:left;
}
.full-height{
    height: 100% !important;  
  }
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
