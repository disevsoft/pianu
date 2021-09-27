
<template>
    <el-container>
    <el-button-group>
      <el-button icon="el-icon-circle-plus" @click="newDomainUser"> </el-button>
      <el-button icon="el-icon-remove"></el-button>
    </el-button-group>
    
      <el-main>
        <el-table :data="domainUsers" style="width: 100%" height="100%" :border="true" highlight-current-row>
        <el-table-column prop="md_user_id" label="Пользователь" width="180"> </el-table-column>
        <el-table-column prop="domain_admin" label="Админ" width="180"> </el-table-column>
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
export default defineComponent({  
    components: {    
    },
    
    props: {
      mdObjectDescr: Object,   
      elementId: String,
    },
    setup(props, { emit }) {
      const domainUsers = ref([{md_user_id:'', domain_admin:false}]);
         onMounted(async() => {
            await getData();
        });
        const getData = async ()=>{
          const data = await DomainService.getDomainUsers(props.mdObjectDescr.id);
          domainUsers.value = data;
        };
        const newDomainUser = async() => {
          domainUsers.value.push({md_user_id:'', domain_admin:false});
        }
        const onSave = async() => {
          domainUsers.value.push({md_user_id:'', domain_admin:false});
        }
       return { domainUsers, getData, newDomainUser, onSave}; 
    } 
  });
</script>

<style lang="scss">

</style>
