<template>
<span>
    <el-input :type="editType()" :id="'inp-'+elementId" class="cfg-input" v-model="displayValue" :disabled="fieldProp.readOnly" size="small">
         <template  v-if="!fieldProp.readOnly" #append>
            <el-button @click="chooseButtonClick" icon="el-icon-more"></el-button>
        </template>
    </el-input>
    </span>
    <div :id="'windowBox-'+ elementId"></div>
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
        'modelValue': [String, Number, Boolean, Array], 
        'fieldProp': [MdTypesField, Object]
    },
    setup (props, { emit }) {
        const elementId = ref('');
        onMounted(() => {
            elementId.value = uuid.v4();
            EventBus.on('dataChoosed', dataChoosed);
        });

        const dataChoosed=async(eventArgs:any)=>{
            if (eventArgs.elementId === elementId.value){
                console.log(eventArgs);
            }
            
        }
        const displayValue = computed({ 
            get: () => props.modelValue, 
            set: (value) => emit('update:modelValue', value) 
            });

        const editType = ()=>{
            
                let editType = "text";
                if((props.fieldProp as MdTypesField).type === MdTypes.Number) {editType = 'number'}
                return editType;
                };

        const chooseButtonClick=()=>{
            console.log('chooseButtonClick', 'windowBox-'+elementId.value);
            CfgDialog.showDialog(document.getElementById('windowBox-'+elementId.value), elementId.value);
        };

        return {displayValue, chooseButtonClick, elementId, editType}
    }
})
</script>

<style lang="scss">

.el-input>.el-input-group__append {
    padding:0 5px
}
</style>