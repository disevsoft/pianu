<template>
    <div/>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';

export default defineComponent({
    components: {  
     
    },
    props: {
      mdObjectDescr: Object,
      elementId: String,
    },

    setup(props, { emit }) {
       onMounted(async () => {
        await getData();
            });

    const getData = async () => {
     const k = 1;
    };
       return {};
    } 
  });
</script>

<style lang="scss">

</style>
