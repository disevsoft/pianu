<template>
    <el-checkbox :id="'chb-'+elementId" v-model="displayValue" :disabled="fieldProp.readOnly" size="medium" class="cell-checkbox">      
    </el-checkbox>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import CfgDialog from './CfgDialog'
import { uuid } from "vue-uuid";
import EventBus from './CfgEventBus';
import MdTypesField from '../../services/configurator/mdTypesField'
import {MdTypes} from '../../metadata/MdTypes'
export default defineComponent({
    props: { 
        'modelValue': [Boolean], 
        'fieldProp': [MdTypesField, Object]
    },
    setup (props, { emit }) {
        const elementId = ref('');
        onMounted(() => {
            elementId.value = uuid.v4();
        });

        const displayValue = computed({ 
            get: () => props.modelValue, 
            set: (value) => emit('update:modelValue', value) 
            });

        return {displayValue,  elementId}
    }
})
</script>

<style lang="scss">

.cell-checkbox{
  padding-left: 48%;
  margin-top:3px;
  margin-bottom:3px
}

.cell>.el-checkbox,
.el-checkbox__label {
  font-size: 22px ;
}

/* checkbox */
.cell>.el-checkbox>.el-checkbox__input>.el-checkbox__inner {
  height: 22px !important;
  width: 22px !important;
}

/* check mark */
.cell>.el-checkbox>.el-checkbox__input>.el-checkbox__inner::after {
  height: 14px !important;
  left: 8px !important;
}
</style>