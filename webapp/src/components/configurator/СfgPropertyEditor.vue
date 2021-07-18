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
        :cell-style="{ padding: '0px', height: '20px' }"
        height="250"
      >
        <el-table-column prop="key" label="Property" width="140" fixed="left">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="Value" width="200">
          <template #default="scope">
            <input v-model="scope.row.value" />
            <!-- <CfgInput v-model="scope.row.props.value" :controlProperties="scope.row.props"> </CfgInput> -->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer">
      <!-- <el-row> -->
      <el-button
        el-button
        type="info"
        icon="el-icon-check"
        style="float: right"
        @click="onSave"
        >Save</el-button
      >
      <!-- </el-row> -->
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TreeService from "../../services/configurator/metaDataTree.service";
import EventBus from './CfgEventBus';
export default defineComponent({
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
      dataLoadingComplete.value = false;
      let response:any = await TreeService.TreeHelper.saveMdObjectData(mdObjectData.value);
      mdObjectData.value = response;
  
      dataLoadingComplete.value = true;    
      let elementData:any = mdObjectData.value.find((el:any) => el.name === "id");      
      var dataId = elementData.value; 
      const eventArgs = {data:mdObjectData.value, targetElementId:props.elementId, id:dataId};
      EventBus.emit('dataChanged', eventArgs);
    };

    const cellClassName = (
      row: any,
      column: any,
      rowIndex: any,
      columnIndex: any
    ) => {
      if (columnIndex == 0) {
        return "input-readonly-background-color";
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

<style scoped></style>
