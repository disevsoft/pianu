<template>
 <div id="mainSurface" class="fullSize">
   <el-container>
          <MainMenu ref="mainMenu" :collapse="isCollapseMainMenu"/>  
    <el-container>
     <el-header>
     </el-header>
     <el-main/>
    </el-container>
    </el-container>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MainMenu from "../components/webapp/MainMenu.vue";
import { Splitpanes, Pane } from "splitpanes";
export default defineComponent({
  components: {
    MainMenu
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
