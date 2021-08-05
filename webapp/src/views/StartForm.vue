<template>
<el-container>
<div>
<!-- <CfgDialogForm :dialogVisible="true" elementId="123"/> -->
<el-checkbox size="small"/>
</div>

</el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CfgDialog from '../components/configurator/CfgDialog'
// import CfgDialogForm from '../components/configurator/CfgDialogForm.vue'
export default defineComponent({
  // components: {CfgDialogForm},
  setup() {
    const v = ref('');
    const show = ref(false);
    const onClick = ()=>{
      console.log('click');
      CfgDialog.showDialog(document.getElementById('elem2'), '1');
    }
    return {show, onClick, v};
  },
});
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
