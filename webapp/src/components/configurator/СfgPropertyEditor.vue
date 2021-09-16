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
        <el-table-column prop="name" label="Property" width="140" fixed="left">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="Value" width="200">
          <template #default="scope">
            <component :is="editComponent(scope.row)" :fieldProp="scope.row" v-model="scope.row.value"/> 
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
import { defineComponent, ref, onMounted } from "vue"; 
import TreeService from "../../services/configurator/metaDataTree.service";
import EventBus from './CfgEventBus';
import CfgInput from './CfgInput.vue';
import CfgCheckBox from './CfgCheckBox.vue';
import {MdTypes} from '../../metadata/MdTypes'
import MdTypeField from '../../services/configurator/mdTypesField'
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
    const mdObjectData = ref([MdTypeField]);
    mdObjectData.value = [];
    
  onMounted(async () => {
    await getData();
        });

    const getData = async () => {
      const data:any = await TreeService.TreeHelper.getMdObjectFields(
        props.mdObjectDescr
      );
      if(!data) {return}
      mdObjectData.value = data;
      dataLoadingComplete.value = true;
    };

    const editComponent =(row:any)=>{
     
      if(row.type === MdTypes.Boolean){return CfgCheckBox}
      return CfgInput;
    }

    const getInputProps=(row:any)=>{
      return (row as MdTypeField);     
    }

    const onSave = async(targetName: any) => {
      if(!mdObjectData.value){return;}
      
      dataLoadingComplete.value = false;
      let response:any = await TreeService.TreeHelper.saveMdObjectData(mdObjectData.value);
      console.log(response);
      
      mdObjectData.value = response;  
      let elementData:any = mdObjectData.value.find((el:any) => el.name === "id");      
      var dataId = elementData.value; 
      const eventArgs = {data:mdObjectData.value, targetElementId:props.elementId, id:dataId};
      EventBus.emit('dataChanged', eventArgs);
      dataLoadingComplete.value = true;  
    };

    const cellClassName = (cell: any) => {
      if (cell.columnIndex === 0) {
        return "prop_name-cell-class"; 
      } else{
        return 'prop-cell';
      }
    };

    return {
      dataLoadingComplete,
      mdObjectData,
      cellClassName,
      onSave,
      editComponent, getInputProps
    };
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
