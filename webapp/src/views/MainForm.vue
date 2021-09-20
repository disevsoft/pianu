<template>
 <div id="mainSurface" class="fullSize">
   <el-container>
          <MainMenu ref="mainMenu" :collapse="isCollapseMainMenu"/>  
    <el-container>
     <el-header  id="captionbar" class="caption-header" style="text-align: right; font-size: 12px; display: inline !important"> 
     <!-- <el-header id="captionbar" class="captionbar"> -->
       <UserControl/>
     </el-header>
     <el-main id="pagescontainer">
       <PagesArea/>
    </el-main> 
     <el-footer id="openedForms"/>
    </el-container>
    </el-container>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MainMenu from "../components/webapp/mainmenu/MainMenu.vue";
import PagesArea from "../components/webapp/PagesArea.vue";
import UserControl from "../components/webapp/UserControl.vue";
import { Splitpanes, Pane } from "splitpanes";
export default defineComponent({
  components: {
    MainMenu,
    PagesArea,
    UserControl
  },
  setup() {
    const mainMenu = ref(MainMenu);
    const isCollapseMainMenu = ref(true);
    const expandMainMenu = ()=>{
      isCollapseMainMenu.value= !isCollapseMainMenu.value; 
    }
    return {expandMainMenu, isCollapseMainMenu};
  },
});
</script>

<style scoped>

</style>
