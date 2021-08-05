<template>
<span>
    <el-checkbox :id="'chb-'+elementId" v-model="displayValue" :disabled="fieldProp.readOnly" size="medium">      
    </el-checkbox>
</span>
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

.el-input>.el-input-group__append {
    padding:0 5px
}
</style>