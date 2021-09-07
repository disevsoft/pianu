<template>
<div class="pn-main-menu">
    <el-icon color="#409EFC" :size="30" style="padding-left: 20px;" >
    <Expand v-if="isCollapse" @click="collapseButtonClick"/>
    <Fold v-else @click="collapseButtonClick"/> 
  </el-icon>
<el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-menu-item v-for="item in menuItems" :key="item.id" :index="item.id" @click="menuItemClick(item)">
    <i class="el-icon-menu"></i>
    <template #title>{{item.synonym}}</template>
  </el-menu-item>
</el-menu>
<el-drawer
  :title="drawerTitle"
  v-model="drawer"
  :with-header="true"
  direction="ltr"
  size="80%">
    
  <el-row :gutter="20">
  <el-col :span="7" v-for="menuItem in currentMenuItem.children" :key="menuItem.id">
      <MainMenuSubItem :menuItem="menuItem" @onItemClick="subMenuItemClick"/>
    </el-col>
  </el-row>
</el-drawer>
</div>

</template>

<script>
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { Expand, Fold } from '@element-plus/icons'
 import MenuService from '../../../services/app/mainMenu.service'
 import MainMenuSubItem from './MainMenuSubItem.vue'
 import mdMenuItem from '../../../metadata/mdMenuItem.class'
 import {FormFactory} from '../../../classes/formFactory'
  export default defineComponent({
    components: {
        Expand,
        Fold,
        MainMenuSubItem
    },
    props: {
         'collapse': [Boolean], 
    },
    setup(props) {
      const isCollapse = ref(true);
      const drawer = ref(false);
      const drawerTitle = ref('');
      const currentMenuItem = ref(mdMenuItem);
      onMounted(async () => {
        await getData();
      });
      const menuItems = ref([]);
      const getData = async () => {
        menuItems.value = await MenuService.getRootMainMenu();       
      };
      const handleOpen = (key, keyPath) => {
        console.log(key, keyPath);
      };
      const handleClose = (key, keyPath) => {
        console.log(key, keyPath);
      };
      const menuItemClick=(menuItem)=>{
          currentMenuItem.value = menuItem;
          drawerTitle.value = menuItem.synonym;
          drawer.value = true;
      };

       const subMenuItemClick=(menuItem)=>{
         if(menuItem.objectId){
          FormFactory.openFormById(menuItem.objectId);
         }
         drawer.value = false;
      };
      const collapseButtonClick =()=>{
          isCollapse.value = !isCollapse.value;
      };
      watch(() => props.collapse, (first, second) => {
          isCollapse.value = second;
    });
      return {
        handleOpen,
        handleClose,
        isCollapse,
        collapseButtonClick,
        menuItemClick,
        menuItems,
        drawer,
        drawerTitle,
        currentMenuItem,
        subMenuItemClick
      };
    },
  });
</script>

<style lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-menu-vertical {
    height: 100vh;
}
.pn-main-menu>.el-overlay{
    left:48px !important;
}

</style>
