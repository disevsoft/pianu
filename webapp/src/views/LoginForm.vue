<template>
<div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="120px" class="login-form">
  <el-form-item prop="email" label="Email" v-model="ruleForm.checkEmail">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="Password" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" class="submit-button">OK</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElForm } from "element-plus";
import { useStore } from 'vuex'
export default defineComponent({
    data() {
       
        return {
           
        };
    },
    setup () {
        const store = useStore();
        const ruleForm: any = ref({email: "", password: "" });
        const loginForm = ref(ElForm);

        const  rules:any = { 
            password: [
                { required: true, message: 'Please input password', trigger: 'blur' },
            ],
            email: [
                { required: true, message: 'Please input email address', trigger: 'blur' },
                { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ]
        };
        const submitForm=(formName:string)=> {
            loginForm.value.validate((valid:boolean) => {
            if (valid) {
                // const { ruleForm.email, ruleForm.password } = this;
                // const { dispatch } = this.$store;
                if (ruleForm.value.email && ruleForm.value.password) {
                    
                    store.dispatch('authentication/login', {  });
                    //root.$store.dispatch('authentication/login', { ruleForm.email, ruleForm.password });
                }
            } else {
                return false;  
            }
            });
        };

      return {submitForm, ruleForm, loginForm, rules}
    },
})
</script>

<style scoped>
.login-form{
    padding: 10px 10px;
    width: 460px
}
.submit-button{
    width:100%
}
</style>