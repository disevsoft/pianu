<template>
  <Splitpanes class="default-theme" vertical>
    <Pane :size="30">
      <el-container>
        <el-header> </el-header>
        <el-main>
          <el-tree
            ref="metaDataTree"
            :data="nodes"
            node-key="elementId"
            :load="loadNodes"
            :expand-on-click-node="false"
            lazy
            :props="defaultTreeProps"
          >
            <template #default="{ node, data }">
            <span class="custom-tree-node">
            <i :class="getTreeNodeClassName(data)" style="padding-right: 5px"> </i>
            <span>{{ node.label }}</span>
              <span v-if="isSelectedNode(node)">
                <span style="padding: 20px">
                  <i v-show="data.canAdd"  class="el-icon-plus" margin-left="15px" title="Add child node" @click="onAddNode(node)"> </i>
                  <i v-show="data.canEdit" class="el-icon-edit-outline"  margin-left="5px" title="Edit node" @click="onEditNode(node)"> </i>
                  <i v-show="data.canEdit" class="el-icon-delete" margin-left="5px" title="Delete node" @click="onDeleteNode(node)"> </i>
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
        <el-main> </el-main>
      </el-container>
    </Pane>
  </Splitpanes>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { Splitpanes, Pane } from "splitpanes";
import TreeService from '../services/configurator/metaDataTree.service';
import NodeData from '../services/configurator/metaDataTree.service';
export default defineComponent({
  components: {
    Splitpanes,
    Pane,
  },
  data(){return{
    nodes:[],
    }
  },
  setup() {
    //const nodes = [];
    const defaultTreeProps = {
      children: "children",
      label: "name",
    };

    const loadNodes = async (node: any, resolve: any) => {
       if (node.level === 0) {
          const data = TreeService.TreeHelper.getMdTreeRoot();
          return resolve(data);
         } else{
           const data = await TreeService.TreeHelper.getTreeNodes(node.data);
           return resolve(data);
       }
    };

    const isSelectedNode = (node:any)=>{    
      return  false;//metaDataTree.value && metaDataTree.value.getCurrentKey() == node.data.elementId;
    };
    
    const getTreeNodeClassName = (nodeData:any)=>{
      let iconName = "";
      if(nodeData.mdTypeId === "834cd9ad-9720-4fc5-aa09-cef6f7a895a0")  {iconName = "el-icon-notebook-2"}
      if(nodeData.mdTypeId === "cc94220b-20f8-4a63-9f29-d02fe64ba918")  {iconName = "el-icon-document"}
      //table
      if(nodeData.mdTypeId === "0cf72dda-2547-4333-aec0-c852d2f3f235")  {iconName = "el-icon-s-grid"}
      //field
      if(nodeData.mdTypeId === "8c474f75-b63a-4f3a-b624-f9a58cb7eeae")  {iconName = "el-icon-minus"}
      //WebForm
      if(nodeData.mdTypeId === "370c9fb7-c2c8-4360-9863-6dc456460080")  {iconName = "el-icon-s-platform"}
      return iconName;      
    };
    
    return { loadNodes, defaultTreeProps, getTreeNodeClassName, isSelectedNode,  };
  },
});
</script>

<style scoped>
/* @import '../global/styles.css' */
</style>
