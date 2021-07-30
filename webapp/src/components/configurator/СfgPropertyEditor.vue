<template>
  <el-container>
    <el-main>
      <el-table
        :data="mdObjectData"
        :border="true"
        header-cell-class-name="table-header"
        :highlight-current-row="true"
        :cell-class-name="cellClassName"
        v-loading="!dataLoadingComplete"
        :cell-style="{padding: '0'}">
        height="250"
      >
        <el-table-column prop="key" label="Property" width="140" fixed="left">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="Value" width="200">
          <template #default="scope">
            <!-- <input v-model="scope.row.value" /> -->
            <CfgInput v-model="scope.row.value"> </CfgInput>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer">
      <el-button
        el-button
        type="info"
        icon="el-icon-check"
        style="float: right"
        @click="onSave"
        >Save</el-button
      >
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"; 
import TreeService from "../../services/configurator/metaDataTree.service";
import EventBus from './CfgEventBus';
import CfgInput from './CfgInput.vue';
export default defineComponent({
   components: {
    CfgInput,
  },
  props: {
    mdObjectDescr: Object,
    elementId: String,
  },
  setup(props) {
    const dataLoadingComplete = ref(false);
    const mdObjectData = ref([{ key: "id", props: {} }]);
    mdObjectData.value = [];
    
    const getData = async () => {
      const data = await TreeService.TreeHelper.getMdObjectData(
        props.mdObjectDescr
      );
      mdObjectData.value = data;
      dataLoadingComplete.value = true;
    };

    const onSave = async(targetName: any) => {
      if(!mdObjectData.value){return;}
      
      dataLoadingComplete.value = false;
      let response:any = await TreeService.TreeHelper.saveMdObjectData(mdObjectData.value);
      mdObjectData.value = response;
  
      dataLoadingComplete.value = true;    
      let elementData:any = mdObjectData.value.find((el:any) => el.name === "id");      
      var dataId = elementData.value; 
      const eventArgs = {data:mdObjectData.value, targetElementId:props.elementId, id:dataId};
      EventBus.emit('dataChanged', eventArgs);
    };

    const cellClassName = (cell: any) => {
      if (cell.columnIndex === 0) {
        return "prop_name-cell-class";
      } else{
        return 'cell';
      }
    };

    return {
      dataLoadingComplete,
      mdObjectData,
      getData,
      cellClassName,
      onSave,
    };
  },
  mounted() {
    this.getData(); // 1
  },
});
</script>

<style lang="scss">
.el-table__header tr,
  .el-table__header th {
    padding: 0 !important;
    height: 20px !important;
    text-align: center
}

.cell {

    padding-left: 0px !important;
    padding-right: 0px !important;
}  

.cell>.el-input>.el-input__inner{
    border-radius:0px !important;
    padding: 5px !important;
    text-overflow: ellipsis;
  }
.prop_name-cell-class{
  padding-left: 5px !important;
}
</style>
