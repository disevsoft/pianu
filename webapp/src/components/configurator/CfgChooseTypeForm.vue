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
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        const onOkButtonClick=()=>{
            console.log('ok');          
        }

        const onCancelButtonClick=()=>{
            console.log('cancel');          
        }
        return {onOkButtonClick, onCancelButtonClick}
    }
})
</script>

<style lang="scss">

</style>