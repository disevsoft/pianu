
<template>
    <el-container>
    <el-button-group>
      <el-button icon="el-icon-circle-plus" @click="newDomainUser"> </el-button>
      <el-button icon="el-icon-remove" @click="deleteDomainUser"></el-button>
    </el-button-group>
    
      <el-main>
        <el-table :data="domainUsers" style="width: 100%" height="100%" :border="true"  
        header-cell-class-name="table-header" highlight-current-row
        row-key="md_user_id" @current-change="currentRowChange">
        <el-table-column prop="md_user_id" label="Пользователь" width="180"> 
           <template #default="scope">
            <component :is="editComponent(scope.row)" :fieldProp="getMdUserFieldProp()" v-model="scope.row.md_user_id"/> 
          </template>
        </el-table-column>
        <el-table-column prop="domain_admin" label="Админ" width="180"> 
          <template #default="scope">
            <component :is="checkBoxComponent(scope.row)" :fieldProp="scope.row" v-model="scope.row.domain_admin"/> 
          </template>
        </el-table-column>
      </el-table>
      </el-main>
      <el-footer>
        <el-button-group>
        <el-button type="primary" @click="onSave">Save</el-button>
        </el-button-group>
      </el-footer>
  </el-container>
</template>

<script> 
import { defineComponent, ref, watch, onMounted } from 'vue';
import BaseCatalog from '../../classes/baseCatalog';
import { MdTypes } from '@/metadata/MdTypes'
import DomainService from '@/services/app/domain.service'
import CfgInput from './CfgInput.vue';
import CfgCheckBox from './CfgCheckBox.vue';
import MdTypesField from '../../services/configurator/mdTypesField'
import { ElTable } from "element-plus";
export default defineComponent({  
    components: {    
    },
    
    props: {
      mdObjectDescr: Object,   
      elementId: String,
    },
    setup(props, { emit }) {
      const domainUsers = ref([{md_domain_id:'', md_user_id:'', domain_admin:false}]);
      domainUsers.value=[];
      let _currentRow = undefined;
         onMounted(async() => {
            await getData();
        });
        const getData = async ()=>{
          const data = await DomainService.getDomainUsers(props.mdObjectDescr.id);
          domainUsers.value = data;
        };
        const newDomainUser = async() => {
          domainUsers.value.push({md_domain_id:props.mdObjectDescr.id, md_user_id:'', domain_admin:false});
        };
        const deleteDomainUser = async() => {         
          if(!_currentRow){return};
          const t = true;
          while(t){
            let index = domainUsers.value.findIndex(elem=>elem.md_user_id === _currentRow.md_user_id);  
            if(index<0){break;}
            domainUsers.value.splice(index, 1);  
          }
        };
        const getMdUserFieldProp= async ()=>{
          const mdTypesField = await MdTypesField.getTypeField('md_user_id', MdTypes.Users, 0, '', '', false, 'md_user_id');
          return mdTypesField;
        };
        const onSave = async() => {
          const data = await DomainService.saveDomainUsers(props.mdObjectDescr.id, domainUsers.value);
          domainUsers.value = data;
        };

        const currentRowChange = (currentRow, oldCurrentRow) => {
          _currentRow = currentRow;
        };

        const editComponent =()=>{    
          return CfgInput;
        };
        const checkBoxComponent =()=>{    
          return CfgCheckBox;
        };
       return { domainUsers, getData, newDomainUser, onSave, editComponent, checkBoxComponent, getMdUserFieldProp, deleteDomainUser,currentRowChange}; 
    } 
  });
</script>

<style lang="scss">
.cell {

    padding-left: 0px !important;
    padding-right: 0px !important;
}  
.cell>.el-input>.el-input__inner{
    border-radius:0px !important;
    padding: 5px !important;
    text-overflow: ellipsis;
  }


  .el-table th, .el-table td {
     padding: 0px !important; 
   
}
</style>
