<template>
    <el-dropdown trigger="click" style= "cursor:pointer">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item @click="openDomainProperties">Домены</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>

    <el-dropdown trigger="click" style= "cursor:pointer">
    <span class="el-dropdown-link">
        {{user.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template #dropdown>
        <el-dropdown-menu>
        <el-dropdown-item @click="onLogOut">Log out</el-dropdown-item>
        </el-dropdown-menu>
    </template>
    </el-dropdown> 
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import { useStore } from 'vuex'
export default defineComponent({
    components: {  
     
    },
    props: {
        
    },

    setup(props, { emit }) {
        const store = useStore();
        const user = ref(store.state.authentication.user) 
       const openDomainProperties=()=>{
           const k = 1;
       } 
       const onLogOut=()=>{
            store.dispatch('authentication/logout');
        };
       return {openDomainProperties, onLogOut, user};
    } 
  });
</script>

<style lang="scss">

</style>
