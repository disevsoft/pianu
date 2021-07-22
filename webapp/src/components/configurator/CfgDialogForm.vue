<template>
<el-container div v-show="modelValue " class="popup">
    <el-header
        class="popup-header"
        id="modalTitle"
      >
        <slot name="header">
          Header
        </slot>
        <i
          type="button" 
          class="btn-full-screen el-icon-full-screen"
          @click="close"
          aria-label="Close modal"
        >
          </i>
        <i
          type="button"
          class="btn-close el-icon-close"
          @click="close"
          aria-label="Close modal"
        >
        </i>
    </el-header>
    <el-main>
      <component :is="currentComponent" @dataChoosen="onDataChoosen"></component>
    </el-main>
    <el-footer>
      <el-button @click="onOkButtonClick">OK</el-button>
      <el-button @click="onCancelButtonClick">Cancel</el-button>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
    name: 'CfgDialogForm', 
    props: { 
       
    },
    setup () {       
         onMounted(() => {
            console.log('mounted!')
        })
        ////////////////
   
        ////////////////

        return {}
    },
})
</script>

<style lang="scss">

/*--------------------------------*/ 
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
  overflow: auto;
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

.popup .resizer-right {
  width: 5px;
  height: 100%;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: e-resize;
}

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