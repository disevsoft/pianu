<template>
<span>
    <el-input class="cfg-input" v-model="displayValue" :disabled="disabled" size="small">
         <template  #append>
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
export default defineComponent({
    props: { 
        'modelValue': [String, Number, Boolean, Array], 
        'disabled':Boolean
    },
    setup (props, { emit }) {
        const elementId = ref('');
        const disabled = ref(false);
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

        const chooseButtonClick=()=>{
            console.log('chooseButtonClick', 'windowBox-'+elementId.value);
            CfgDialog.showDialog(document.getElementById('windowBox-'+elementId.value), elementId.value);
        };

        return {displayValue, chooseButtonClick, elementId}
    }
})
</script>

<style lang="scss">

.el-input>.el-input-group__append {
    padding:0 5px
}
</style>