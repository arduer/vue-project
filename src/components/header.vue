<template>
  <div class="header">
    <el-page-header :icon="ArrowLeft" @back="goBack">
      <template #content>
        <div class="flex items-center">

          <span class="text-large font-600 mr-3"> 实验室预约 </span>
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
            
          </span>
          <el-tag>Default</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-dropdown>
            <span class="el-dropdown-link" >
              admin
              <el-icon class="el-icon--right" >
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="clear">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>          
          <a href="https://gitee.com/lgc3076131388/vue-project" class="head-item"><img src="@/assets/images/github.svg" alt="github" style="width: 40px;"></a>
        </div>
        
      </template>
    </el-page-header>
  </div>

  
</template>
<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  console.log('go back')
  router.go(-1);
}
const clear = () =>{
  sessionStorage.removeItem('token');
  router.push('/login')
}
</script>
<style scoped>
.header{
  margin: 6px;
  /* border: red solid 2px; */
  padding: 6px 0;

}
.flex{
  display: flex;

}
.head-item{
  margin-left: 40px;
  margin-right: 20px;
}
.el-dropdown-link{
  font-size: 18px;
  padding-top: 10px;
}
</style>
