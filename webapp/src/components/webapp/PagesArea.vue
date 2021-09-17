<template>
  <el-tabs 
      id = "formPages"
      ref="tabPanel"
      v-model="editableTabsValue"
      type="border-card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.elementId"
        :label="item.title"
        :name="item.name"
        lazy
        :ref="'pane-' + item.elementId"
      >
        <component
          :is="currentTabComponent(item)"
          v-bind="getTabProps(item)"
          :ref="item.elementId"
        ></component>
      </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import NomenclatureListForm from '../../catalogs/nomenclature/NomenclatureListForm.vue'
import {FormFactory} from '../../classes/formFactory'
import EventBus from './appEventBus'
import { Events } from './appEventBus';
import { uuid } from "vue-uuid";
export default defineComponent({
    components: {  
     
    },
    props: {
        
    },

    setup(props, { emit }) {
      const editableTabsValue = ref("");
      const tabs = ref([{}]);
      tabs.value = [];
      const _forms = new Map();
      onMounted(async () => {   
        FormFactory.initForms();
        EventBus.on('openForm', openForm);  
      });

      const openForm = (openFormArgs:any)=>{
        const elementId = uuid.v4();
        const tabData = {
          title: openFormArgs,
          name: elementId,
          data: '',
          elementId:elementId,
        };
        tabs.value.push(tabData);
        editableTabsValue.value = tabData.name;  
      }
      const removeTab=(targetName:any)=>{
        const k =1;
       };
      const getTabProps = (tabItem: any) => {      
        return '';
      };


      const currentTabComponent = (item:any) => { 
        const form = FormFactory.getForm('NomenclatureListForm');
        return form;      
      };
       return {removeTab, currentTabComponent, getTabProps, editableTabsValue, tabs};
    } 
  });
</script>

<style lang="scss">

</style>
