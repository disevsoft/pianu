<template>
    <el-input :type="editType()" :id="'inp-'+elementId" class="cfg-input" v-model="displayValue" :disabled="fieldProp.readOnly" size="small">
         <template  v-if="showChooseButton" #append>
            <el-button @click="chooseButtonClick" icon="el-icon-more"></el-button>
        </template>
    </el-input>
    <div :id="'windowBox-'+ elementId"></div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import CfgDialog from './CfgDialog'
import { uuid } from "vue-uuid";
import EventBus from './CfgEventBus';
import MdTypesField from '../../services/configurator/mdTypesField'
import {MdTypes} from '../../metadata/MdTypes'
import MdType from '../../metadata/mdType.class'
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
            get: () => {
                const fieldProp = (props.fieldProp as MdTypesField);
                if(!fieldProp.mdType || fieldProp.mdType.isMdType){
                    return props.modelValue;
                }
                else{
                    return props.modelValue
                }
                }, 
            set: (value) => emit('update:modelValue', value) 
            });

        const showChooseButton = computed(()=>{
            const fieldProp = (props.fieldProp as MdTypesField);
            if(fieldProp.readOnly) {return false} 
            let result = false;
            if(!fieldProp.mdType || fieldProp.mdType.isMdType){result = true}
             return result;           
        });

        const editType = ()=>{
                let editType = "text";
                if((props.fieldProp as MdTypesField).type === MdTypes.Number) {editType = 'number'}
                return editType;
                };

        const chooseButtonClick=()=>{         
            CfgDialog.showDialog(document.getElementById('windowBox-'+elementId.value), elementId.value);
        };

        return {displayValue, chooseButtonClick, elementId, editType, showChooseButton}
    }
})
</script>

<style lang="scss">

.el-input>.el-input-group__append {
    padding:0 5px
}
</style>