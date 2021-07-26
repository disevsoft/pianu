<template>
<div :id ="'form-'+elementId" class="drag-size" >
<div class="fullSize dialog-form" :id="'VM-'+elementId">
  <el-container class="shadow-borders">
    <el-header
        class="drag-header"
        id="modalTitle"
      >
    </el-header>
    <el-main>
     
    </el-main>
    <el-footer>
    </el-footer>
    </el-container>

    <i v-for="sizer in sizers()" :key="sizer" :class= "'resize ' + sizer"></i>
  </div>
  </div>
</template>

<script lang="ts">
import {getMaxZIndex} from './dialogUtils';
import { defineComponent, onMounted, ref,computed } from 'vue';
import {DragResize, Sizers}  from '../../helpers/dragResize';

export default defineComponent({ 
    props: { 
        'elementId': String,
        'modelValue': [Boolean], 
    },
    setup (props, { emit }) {

      const sizers=()=>{  
        return Sizers;
      };

     
      let elementId = '';

       onMounted(() => {
          elementId =(props.elementId as string); 
          DragResize.init('VM-'+elementId);
        });
        
        return {sizers}
    }
})
</script>


<style ang="scss">

.shadow-borders{
  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
  box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}

.dialog-form{
  height:300px;
  width:300px;
  position: fixed !important;
}
.el-main{
  padding:0px
}
</style>