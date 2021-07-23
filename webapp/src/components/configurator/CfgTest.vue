<template>
<div class="popup">
    <el-header
        class="popup-header"
        id="modalTitle"
      >
       
    </el-header>
    <el-main>
      
    </el-main>
    <el-footer>
    </el-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import initDragResize from '../../helpers/dragResize'

export default defineComponent({
    props: { 
        'modelValue': [Boolean], 
    },
    setup () {
       onMounted(() => {
         initDragResize("popup", "popup-header");
        });
        
        
        return {}
    }
})
</script>


<style ang="scss">
/*--------------------------------*/ 
.vue-grid-item.cssTransforms { transition-property: inherit !important; }
  .vue-resizable.resizing { pointer-events: none; }
  .vue-draggable-dragging { pointer-events: none; }

.popup {
  z-index: 9;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  min-height: 150px;
  min-width: 300px;
  /* max-height: 300px;
  max-width: 600px; */
}

/*Drgable */

.popup {
  top:25%;
  position: fixed;
  height:300px;
  /*resize: both; /*!*enable this to css resize*! */
  overflow: hidden;
}

.popup-header {
  height:30px !important;
  padding:0px 0px !important;
  cursor: move;
  z-index: 10;
  background-color: #2196f3;
  color: #fff;
}

/*Resizeable*/


.popup .resizer-bottom {
  width: 100%;
  height: 5px;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: n-resize;
}

.popup .resizer-both {
  width: 5px;
  height: 5px;
  background: transparent;
  z-index: 10;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: nw-resize;
}

/*NOSELECT*/

.popup * {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.el-main{
  padding:0px
}
</style>