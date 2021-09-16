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
       return { tableData};
    } 
  });
</script>

<style lang="scss">

</style>
