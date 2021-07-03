<template>
<Splitpanes class="default-theme" vertical>
  <Pane :size="30">
   <el-container>
       <el-header>
       </el-header>
       <el-main>
         <el-tree  ref="metaDataTree" :data="nodes" node-key="elementId" :load="loadNodes" :expand-on-click-node="false"  lazy 
        :props="defaultTreeProps"> 
        <template #default="{ node, data }">
           <span>{{ node.label }}</span>  
           <span>{{ data.id }}</span>  
          <!-- <span class="custom-tree-node">
            <i :class="getTreeNodeClassName(data)" style="padding-right: 5px"> </i>
            <span>{{ node.label }}</span>
            <span v-if="this.isSelectedNode(node)">
              <span style="padding: 20px">
                <i v-show="data.can_add"  class="el-icon-plus" margin-left="15px" title="Add child node" @click="onAddNode(node)"> </i>
                <i v-show="data.can_edit" class="el-icon-edit-outline"  margin-left="5px" title="Edit node" @click="onEditNode(node)"> </i>
                <i v-show="data.can_edit" class="el-icon-delete" margin-left="5px" title="Delete node" @click="onDeleteNode(node)"> </i>
              </span>
            </span>
          </span> -->
        </template> 
      </el-tree>
       </el-main>
   </el-container>
  </Pane>
  <Pane>
   <el-container>
       <el-header>
       </el-header>
       <el-main>
       </el-main>
   </el-container>
  </Pane>
</Splitpanes>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
export default defineComponent({
  components: {
      Splitpanes,
      Pane
  },
    setup () {
      const nodes= ref([]);    
      const defaultTreeProps = {
          children: 'children',
          label: 'name',
        };
      const  loadNodes= (node: any, resolve: any)=> {
         if (node.level === 0) {
        //   getMdTreeRoot().then(response => {
        //     return resolve(response);
        //   })
           } else{
        //   getMdList(node.data).then(response => {
        //     return resolve(response); 
        //   })
         }
        return resolve([]);
      };
        return {nodes}
    },

})
</script>

<style scoped>
  /* @import '../global/styles.css' */
</style>