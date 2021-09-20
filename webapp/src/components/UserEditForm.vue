<template>
<el-container>
  <el-main>
<el-form label-width="auto" >
<el-form-item label="Ваше имя:" class="form-item">
  <el-input
    type="text"
    v-model="userName"
    maxlength="100"
    placeholder="Как Вас зовут?"
  >
  </el-input>   
</el-form-item>

<el-form-item label = 'Ваш email:' class="form-item">
<el-input
  type="text"
  v-model="email"
  placeholder="Будет использоваться в качестве имени пользователя"
  maxlength="150"
></el-input> 
</el-form-item>

<el-form-item label = 'Ваш телефон:' class="form-item">
<el-input
  type="text"
  v-model="phonenumber"
  placeholder="Введите ваш номер телефона"
  maxlength="150"
></el-input> 
</el-form-item>

<el-form-item label='Название аккаунта:' class="form-item">
<el-input
  type="text"
  v-model="databaseName"
  placeholder="Придумайте название аккаунта"
  maxlength="150"
>
</el-input>  
</el-form-item>
</el-form> 
</el-main>
</el-container>
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
       const userName = ref('');
       const email = ref('');
       const phonenumber = ref('');
       const databaseName = ref('');
       return {userName, email, phonenumber, databaseName};
    } 
  });
</script>

<style lang="scss">
.form-item{
  margin-bottom: 5px !important;
}
</style>
