<template>
    <div class="login-container flx-center" style="">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.png" alt="" />
          <h2 class="logo-text">实验室预约系统</h2>
        </div>
          <el-form ref="loginFormRef" :model="userForm" :rules="loginRules" size="large">
            <el-form-item prop="username">
              <el-input v-model="userForm.username" placeholder="用户名：admin / user">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <user />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="userForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="login-btn">
            <el-button :icon="CircleClose" round size="large" @click="clear"> 重置 </el-button>
            <el-button :icon="UserFilled" round size="large" type="primary" color="#009688" @click="loginF" native-type=“submit”>
              登录
            </el-button>
          </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts" name="login">
import { ref, reactive, onMounted } from "vue";
import { useExample11Store } from './Example11Store'
import { loginService } from './Example11Service'
import { useRouter } from "vue-router";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { ElNotification } from 'element-plus'

import type { ElForm } from "element-plus";

interface User {
  username: string
  password: string
}
const loading = ref(false);
const router = useRouter();


const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const userForm = ref<User>({ username: 'admin', password: '123456' })
const userR = useExample11Store().userS

const coursesR = useExample11Store().coursesS

const loginF = async () => {
  const user: User = {
    username: userForm.value.username,
    password: userForm.value.password
  }
  await loginService(user)
  userForm.value.username = ''
  userForm.value.password = ''
  const token = sessionStorage.getItem('token');
  if(token){
    loading.value=true
    // 使用 router.push() 方法跳转到指定路由
    router.push({ path: '/home' })
    ElNotification({
    title: 'Success',
    message: '用户登陆成功',
    type: 'success',
  })
}
  
}

const clear = () => {
  userForm.value.username = ''
  userForm.value.password = ''
}



const clearSessionStorageF = () => {
  sessionStorage.clear()
  coursesR.value.length = 0
}
</script>

<style scoped >
@import "./index.scss";
</style>
