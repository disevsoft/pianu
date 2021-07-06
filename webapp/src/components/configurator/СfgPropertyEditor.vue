<template>
  <el-container>
    <el-main> 
      <el-table :data="mdObjectData" :border="true" header-cell-class-name="table-header" 
        :highlight-current-row="true" :cell-class-name="cellClassName"
        v-loading="!dataLoadingComplete"
        :cell-style="{padding: '0px', height: '20px'}">
        <el-table-column prop="key" label="Property" width="140" fixed="left">
          <template #default="scope">
            <span >{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="props.value" label="Value" width="200">
          <input />
          <!-- <template  #default="scope" >
            <CfgInput v-model="scope.row.props.value" :controlProperties="scope.row.props"> </CfgInput>
          </template> -->
        </el-table-column>
      </el-table>
  </el-main>
  <el-footer class="footer">
    <el-row>
     <el-button el-button type="info" icon="el-icon-check" @click="onSave">Save</el-button>
    </el-row>
    
     <template v-if="!dataLoadingComplete">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="50" :indeterminate="true">
        <span>Loading</span>
      </el-progress>
    </template>
  </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TreeService from '../../services/configurator/metaDataTree.service';
export default defineComponent({
    props:{
      mdObjectDescr:Object,
      elementId:String 
      },
    setup (props) {
      const dataLoadingComplete = ref(false);         
      const mdObjectData = ref([{key: "id", props: {}}]);
      mdObjectData.value = [];
      const getData=async()=>{
          const data = await TreeService.TreeHelper.getMdObjectData(props.mdObjectDescr); 
          console.log(data);
          
        };
      const cellClassName=(row:any, column:any, rowIndex:any, columnIndex:any)=>{
          if(columnIndex==0){
            return 'input-readonly-background-color';
          }
      };

      return {dataLoadingComplete, mdObjectData, getData, cellClassName}
    },
    mounted () {
      console.log('mntd');
      
      this.getData() // 1
  }
})
</script>

<style scoped>

</style>