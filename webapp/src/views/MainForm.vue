<template>
<Splitpanes class="default-theme" vertical>
  <Pane :size="30">
   <el-container>
       <el-header>
       </el-header>
       <el-main>
       </el-main>
   </el-container>
  </Pane>
  <Pane>
   <el-container>
       <el-header>
       </el-header>
       <el-main>
       </el-main>
   </el-container>
  </Pane>
</Splitpanes>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
export default defineComponent({
  components: {
      Splitpanes,
      Pane
  },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>
  /* @import '../global/styles.css' */
</style>