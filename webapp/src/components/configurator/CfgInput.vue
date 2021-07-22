<template>
    <el-input class="cfg-input" v-model="displayValue" :disabled="disabled" size="small">
         <template  #append>
            <el-button @click="chooseButtonClick" icon="el-icon-more"></el-button>
        </template>
    </el-input>
    <div :id="'windowBox-'"></div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import CfgDialog from './CfgDialog'
export default defineComponent({
    props: { 
        'modelValue': [String, Number, Boolean, Array], 
        'disabled':Boolean
    },
    setup (props, { emit }) {
        const disabled = ref(false)
        const displayValue = computed({ 
            get: () => props.modelValue, 
            set: (value) => emit('update:modelValue', value) 
            });

        const chooseButtonClick=()=>{
            console.log('chooseButtonClick');
            CfgDialog.showDialog(document.getElementById('windowBox-'+''), '');
        };

        return {displayValue, chooseButtonClick}
    }
})
</script>

<style lang="scss">

.el-input>.el-input-group__append {
    padding:0 5px
}
</style>