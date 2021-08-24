<template>
<div>
    <el-icon color="#409EFC" :size="30" style="padding-left: 20px;" >
    <Expand v-if="isCollapse" @click="collapseButtonClick"/>
    <Fold v-else @click="collapseButtonClick"/> 
  </el-icon>
<el-menu default-active="2" class="el-menu-vertical-demo" @select="menuItemClick" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template #title>
      <i class="el-icon-location"></i>
      <span>Navigator One two</span>
    </template>
    <el-menu-item-group>
      <template #title><span>Group One</span></template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <template #title><span>item four</span></template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <template #title>Navigator Two</template>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <template #title>Navigator Three</template>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <template #title>Navigator Four</template>
  </el-menu-item>
</el-menu>
</div>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue';
    import { Expand, Fold } from '@element-plus/icons'
  export default defineComponent({
    components: {
        Expand,
        Fold
    },
    props: {
         'collapse': [Boolean], 
    },
    setup(props) {
      const isCollapse = ref(true);
      const handleOpen = (key, keyPath) => {
        console.log(key, keyPath);
      };
      const handleClose = (key, keyPath) => {
        console.log(key, keyPath);
      };
      const menuItemClick=(index, indexPath, menuItem)=>{
          console.log(menuItem);
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
        menuItemClick
      };
    },
  });
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo {
    height: 100vh;
}
</style>
