<template>
    <el-container>
        <el-main>
            <el-tree ref="metaDataTree" :data="nodes" :expand-on-click-node="false"   
                :props="defaultTreeProps" show-checkbox :check-strictly="true" 
                :node-key="elementId"
                @check-change="checkChange"
                class="ht">
            </el-tree>
        </el-main>
        <el-footer>
            <el-button @click="onOkButtonClick">OK</el-button>
            <el-button @click="onCancelButtonClick">Cancel</el-button>
        </el-footer>
    </el-container>    
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue'
import FormEvents from '../../helpers/formEvents'
import TreeService from '../../services/configurator/metaDataTree.service'
export default defineComponent({
    props: { 
        'elementId': String,
        'formEvents':FormEvents
    },
    setup (props, {emit}) {
        let formEvents:FormEvents;
        const defaultTreeProps = {
            children: "children",
            label: "name",
            };
        const nodes = ref([]);
        const onOkButtonClick=()=>{
            console.log('ok');          
        }

        const onCancelButtonClick=()=>{
            formEvents.close();     
        }

        const checkChange = ()=>{
            // let checkedNodes = this.$refs.metaDataTree.getCheckedNodes();
            // const choosedData = [];
            // for(let item of checkedNodes) {
            //     choosedData.push(item.id);    
            // }
            // this.$emit('dataChoosen', choosedData);
            console.log('checkChange');
            
        };
        // const beforeClose=(eventArgs:any)=>{

        // }
        onMounted(async() => {
        //elementId =(props.elementId as string); 
        formEvents = (props.formEvents as FormEvents);
        (nodes.value as any) = await TreeService.TreeHelper.getMdTypes();
        //formEvents.on('beforeClose', beforeClose);
      });  
        return {onOkButtonClick, onCancelButtonClick, nodes, defaultTreeProps, checkChange}
    }
})
</script>

<style lang="scss">
.ht{
    
}
</style>