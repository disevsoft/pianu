<template>
<div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="120px" class="login-form">
  <el-form-item prop="email" label="Email" v-model="ruleForm.checkEmail">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="Password" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
    <el-collapse-transition>
        <div v-show="alert.message" class="transition-box alert-message">{{alert.message}}</div>
    </el-collapse-transition>
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
        const alert = ref(store.state.alert);
        const  rules:any = { 
            password: [
                { required: true, message: 'Please input password', trigger: 'blur' },
            ],
            email: [
                { required: true, message: 'Please input email address', trigger: 'blur' },
                { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ]
        };
        const submitForm=async (formName:string)=> {
            await loginForm.value.validate((valid:boolean) => {
            if (valid) {
                if (ruleForm.value.email && ruleForm.value.password) {
                   store.dispatch('authentication/login', {username:ruleForm.value.email, password:ruleForm.value.password});
                }
            } else {
                return false;  
            }
            });
        };

      return {submitForm, ruleForm, loginForm, rules, alert}
    },
})
</script>

<style scoped>
.login-form{
    padding: 50px 50px;
    width: 460px
}

.submit-button{
    width:100%
}

.alert-message{
    color:red;
    text-align: center
}
</style>