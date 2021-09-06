<template>
<div  v-show ="show" :id ="'dfrm-'+elementId" class="drag-size" >
<div class="fullSize dialog-form" :id="'VM-'+elementId">
  <el-container class="shadow-borders">
    <el-header
        class="form-header dialog-form-header"
        id="modalTitle">
        <div class="drag-header display-inline form-header-caption">
        <slot name="header" >
         Header
        </slot>
       </div>
        <span class="display-inline form-header-buttons">
        <i v-if="expanded"
          type="button" 
          class="btn-restore-form el-icon-copy-document"
          @click="showFullScreen"
          aria-label="Restore"
        ></i>
        <i v-else 
          type="button" 
          class="btn-expand-form el-icon-full-screen"
          @click="showFullScreen"
          aria-label="Expand"
        ></i>
        <i
          type="button"
          class="btn-close el-icon-close"
          @click="closeDialog"
          aria-label="Close"
        ></i>
        </span>      
    </el-header>
      <component :is="currentComponent" :formEvents="currentformEvents()" :data="currentData()"/> 
    </el-container>
    <i v-for="sizer in sizers()" :key="sizer" :class= "'resize ' + sizer"></i>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,computed,markRaw } from 'vue';
import {DragResize, Sizers}  from '../../helpers/dragResize';
import {setMaxZIndex} from './dialogUtils';
import CfgChooseTypeForm from './CfgChooseTypeForm.vue'
import FormEvents from '../../helpers/formEvents'
export default defineComponent({ 
  data: function () {
      return {
        currentComponent: markRaw(CfgChooseTypeForm),
      }
    },
    props: { 
        'elementId': String,
        'dialogVisible': Boolean, 
        'formEvents':FormEvents, 
        'data':[Object]
    },
    setup (props, { emit }) {
      const show = ref(false);
      const expanded = ref(false);

      let elementId = '';
      let dragResizer:DragResize;
      let _formEvents:FormEvents;
      const sizers=()=>{  
        return Sizers;
      };

      const closeDialog=()=> { 
        const eventArgs = _formEvents.close();
        if(!eventArgs.cancel){
          show.value = false;
        }        
      };

       const onCloseDialog=(eventArgs:any)=> { 
        if(!eventArgs.cancel){
          show.value = false;
        }        
      };
    const currentformEvents=()=>{
      return props.formEvents;
    }
    const currentData=()=>{
      return props.data;
    }
     const showFullScreen=(e:any)=> { 
      e.stopPropagation();
      expanded.value = !expanded.value;   
      if(!dragResizer){return;}
      if(expanded.value){
        dragResizer.expand();
      }else{
        dragResizer.restore();
      }
    };
  
      onMounted(() => {       
        elementId =(props.elementId as string); 
        show.value = (props.dialogVisible as boolean);
        _formEvents = (props.formEvents as FormEvents);
        if(_formEvents){
          _formEvents.on('onClose', onCloseDialog);
        }
        dragResizer = DragResize.init('VM-'+elementId);
        const dv = document.getElementById('VM-'+elementId);
        setMaxZIndex(dv);
      });  
         
        return {sizers, closeDialog, show, showFullScreen, expanded,currentformEvents, currentData}
    }
})
</script>


<style lang="scss">
.display-inline{
  display: inline;
}

.form-header-buttons{
  float: right;
  width:48px;
  cursor:pointer;
}
.form-header-caption{
  text-align:left;
  width:100%;
}

.dialog-form-header {
  background: #F2F6FC !important;
}
.shadow-borders{
  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
  box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}

.dialog-form{
  height:300px;
  width:300px;
  min-height:300px;
  min-width:300px;
  position: fixed !important;
}
.el-main{
  padding:0px
}
</style>