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
          :is="currentTabComponent"
          v-bind="getTabProps(item)"
          :ref="item.elementId"
        ></component>
      </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import NomenclatureListForm from '../../catalogs/nomenclature/NomenclatureListForm.vue'
export default defineComponent({
    components: {  
      NomenclatureListForm   
    },
    props: {
        
    },
    setup(props, { emit }) {
      const editableTabsValue = ref("");
      const tabs = ref([{}]);
      tabs.value = [];

      const removeTab=(targetName:any)=>{
        const k =1;
       };
      const getTabProps = (tabItem: any) => {      
        return '';
      };

      const currentTabComponent = computed(() => {
        return NomenclatureListForm;
      });
       return {removeTab, currentTabComponent, getTabProps};
    } 
  });
</script>

<style lang="scss">

</style>
