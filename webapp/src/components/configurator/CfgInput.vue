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
import TreeService from "../../services/configurator/metaDataTree.service";
export default defineComponent({
    props: { 
        'modelValue': [String, Number, ], 
        'fieldProp': [MdTypesField, Object],
    },
    setup (props, { emit }) {
        const elementId = ref('');
        const presentation = ref('');
        const _showChooseButton = ref(false);
        onMounted(async () => {
            elementId.value = uuid.v4();     
            //if(props.modelValue && typeof props.modelValue === 'string'){
                await setPresentationValue(props.modelValue);
           // }
            EventBus.on('dataChoosed', dataChoosed);
        });

        const dataChoosed=async(eventArgs:any)=>{
            if (eventArgs.elementId === elementId.value){
                if(eventArgs.resultData && eventArgs.resultData.length > 0){
                    await setPresentationValue(eventArgs.resultData.join(','));
                    updateValue(eventArgs.resultData.join(','))             
                }
                else{
                    updateValue('');  
                    presentation.value = '';                      
                }
            }   
        }

        const setPresentationValue= async(value:any)=>{
            const fieldProp = (props.fieldProp as MdTypesField);
             if(value && (!fieldProp.mdType || fieldProp.mdType.isMdType  && typeof value === 'string')){                    
                 const items =value.split(',');   
                 presentation.value = await TreeService.TreeHelper.getMdObjectPresentation(items);
             }else{
                presentation.value =  (value as string);  
             }
        };

        const displayValue = computed({ 
            get: () => {return presentation.value;}, 
            set: (value) => {updateValue(value)} 
            });

        const updateValue=async (value:any)=>{
            await emit('update:modelValue', value) ;   
            await setPresentationValue(props.modelValue); 
        };

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
            let choosedData:any = undefined   
            if( typeof props.modelValue === 'string') {
                if(props.modelValue && typeof props.modelValue === 'string')
                choosedData = props.modelValue.split(',')    
            }
            CfgDialog.showDialog(document.getElementById('windowBox-'+elementId.value), elementId.value, choosedData);
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