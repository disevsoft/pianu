<template>
    <div>
        номенклатура
    </div>
    <el-table :data="tableData" height="250" style="width: 100%" :border="true">
    <el-table-column prop="date" label="Date" width="180"> </el-table-column>
    <el-table-column prop="name" label="Name" width="180"> </el-table-column>
    <el-table-column prop="address" label="Address"> </el-table-column>
  </el-table>
</template>

<script> 
import { defineComponent, ref, watch, onMounted } from 'vue';
import BaseCatalog from '../../classes/baseCatalog';
import { MdTypes } from '@/metadata/MdTypes'
export default defineComponent({  
    components: {    
    },
    
    props: {
        
    },
    setup(props, { emit }) {
        const tableData = [ 
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          { 
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ];
         onMounted(async() => {
            getData();
        });
        const getData = async ()=>{
          const catalog = await new BaseCatalog(MdTypes.Catalog, 'e42ab001-d707-49b1-9a7a-f429161d9ed0');
          const data = await catalog.getListDataForView();
        };
       return { tableData, getData};
    } 
  });
</script>

<style lang="scss">

</style>
