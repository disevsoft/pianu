<template>
    <el-container>
        <el-main>
        </el-main>
        <el-footer>
            <el-button @click="onOkButtonClick">OK</el-button>
            <el-button @click="onCancelButtonClick">Cancel</el-button>
        </el-footer>
    </el-container>    
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import FormEvents from '../../helpers/formEvents'
export default defineComponent({
    props: { 
        'elementId': String,
        'formEvents':FormEvents
    },
    setup (props, {emit}) {
         let formEvents:FormEvents;

        const onOkButtonClick=()=>{
            console.log('ok');          
        }

        const onCancelButtonClick=()=>{
            formEvents.close();     
        }
        // const beforeClose=(eventArgs:any)=>{
 
        // }
        onMounted(() => {
        //elementId =(props.elementId as string); 
        formEvents = (props.formEvents as FormEvents);
        
        //formEvents.on('beforeClose', beforeClose);
      });  
        return {onOkButtonClick, onCancelButtonClick}
    }
})
</script>

<style lang="scss">

</style>