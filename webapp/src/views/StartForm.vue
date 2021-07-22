<template>
<div>
 <button @click = "onClick">sdfg</button>
  <div id ='elem'>
    
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CfgInput from '../components/configurator/CfgInput.vue'
import CfgDialog from '../components/configurator/CfgDialog'


export default defineComponent({
  components: {},
  setup() {
    const show = ref(false);
    const onClick = ()=>{
      console.log('click');
      CfgDialog.showDialog(document.getElementById('elem'), '1');
    }
    return {show, onClick};
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
