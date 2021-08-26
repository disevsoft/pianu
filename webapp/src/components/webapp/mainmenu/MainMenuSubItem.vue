<template>
    <el-card class="pn-main-menu-card">
      <template #header>
        <div class="pn-main-menu-card-header">
          <span>{{menuItem.synonym}}</span>
        </div>
      </template>
      <div v-for="item in menuItem.children" :key="item.id">
      <el-link href="#" @click="menuItemClick(item)">
        {{item.synonym}}
      </el-link>
      </div>
  </el-card>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import MenuService from '../../../services/app/mainMenu.service'
import mdMenuItem from '../../../metadata/mdMenuItem.class'
export default defineComponent({
    components: {     
    },
    props: {
         'menuItem': [mdMenuItem], 
    },
    setup(props, { emit }) {
       const menuItemClick=(menuItem)=>{
         emit('onItemClick', menuItem);
       } 
       return { menuItemClick};
    } 
  });
</script>

<style lang="scss">
.pn-main-menu-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
    
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .pn-main-menu-card {
    margin-left:10px;
  }
</style>
