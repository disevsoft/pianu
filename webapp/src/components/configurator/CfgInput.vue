<template>
    <el-input class="cfg-input" v-model="displayValue" :disabled="disabled" size="small"/>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
    props: { 
        'modelValue': String, 
        'disabled':Boolean
    },
    setup (props, { emit }) {
        const disabled = ref(false)

        const displayValue = computed({ 
            get: () => props.modelValue, 
            set: (value) => emit('update:modelValue', value) 
            }) 
        return {displayValue}
    }
})
</script>

<style lang="scss">

</style>