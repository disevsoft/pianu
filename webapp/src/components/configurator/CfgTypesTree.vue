<template>
    <el-tree ref="metaDataTree" :data="nodes" :expand-on-click-node="false"   
      :props="defaultTreeProps" show-checkbox :check-strictly="true" 
      @check-change="checkChange">
    </el-tree>
</template>

<script>
import {
  ref,
  reactive,
  defineProps,
  onMounted,
  watch,
  defineComponent,
  computed,
} from "vue";

export default defineComponent({
   components: {
    CfgInput,
  },
  props: {
      
  },
  setup(props) {
     const defaultTreeProps = {
      children: "children",
      label: "name",
    };
    const checkChange= ()=>{
        
    }
    return {defaultTreeProps
    };
  },
  mounted() {
    
  },
});
</script>

<style lang="scss">

</style>
