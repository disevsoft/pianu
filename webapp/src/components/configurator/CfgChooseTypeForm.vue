<template>
    <el-container >
        <el-main class="height200">
            <el-tree ref = "chooseTypeTree" id="chooseTypeTree" :data="nodes" :expand-on-click-node="false"   
                :props="defaultTreeProps" show-checkbox :check-strictly="true" 
                node-key="id"
                @check-change="checkChange"
                >
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
import { ElTree } from "element-plus";
export default defineComponent({
    props: { 
        'elementId': String,
        'formEvents':[FormEvents, Object],
        'data':[Object]
    },
    setup (props, {emit}) {
        let formEvents:FormEvents;
        const defaultTreeProps = {
            children: "children",
            label: "name",
            };
        const nodes = ref([]);
        const chooseTypeTree = ref(ElTree);

        const onOkButtonClick=()=>{
             let checkedNodes = chooseTypeTree.value.getCheckedNodes();
              const choosedData:Array<any> = [];
             for(let item of checkedNodes) {
                 choosedData.push(item.id);    
             }  
             formEvents.close(choosedData, 'CfgChooseTypeForm');       
        }

        const onCancelButtonClick=()=>{
            formEvents.close();     
        }

        const checkChange = (node:any)=>{
            console.log(node);
            
            //   let checkedNodes = chooseTypeTree.value.getCheckedNodes();
            //  const choosedData = [];
            //  for(let item of checkedNodes) {
            //      console.log(item);
                  
            //  }
            
            //console.log('checkChange');
            
        };
        // const beforeClose=(eventArgs:any)=>{

        // }
        onMounted(async() => {
        formEvents = (props.formEvents as FormEvents);
        console.log(await TreeService.TreeHelper.getMdTypes());
        
        (nodes.value as any) = await TreeService.TreeHelper.getMdTypes();
        if(props.data){
            chooseTypeTree.value.setCheckedKeys(props.data, true);
            // for await (const iterator of (props.data as any)) {
            //     const node = chooseTypeTree.value.getNode(iterator);                
            // }
        }
      });  
        return {onOkButtonClick, onCancelButtonClick, nodes, defaultTreeProps, checkChange, chooseTypeTree}
    }
})
</script>

<style lang="scss">
.height200{
     height:200px !important;
}

</style>