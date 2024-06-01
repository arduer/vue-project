<template >
 
  <div class="common-layout" >
    <el-container style="height: 100vh;">
      <el-aside width="250px" style="background-color: white;"><Siderbar/></el-aside>
      <el-container>
        <el-header height="" class="el-header"><Head/></el-header>
        <el-main class="el-main" >
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <div class="block box-shadow-1"></div> -->
</template>

<script setup lang="ts" name="home">
import { RouterView } from 'vue-router'
import Siderbar from '@/components/Siderbar.vue'
import Head from '@/components/header.vue'
</script>




<style scoped >
.el-main{
  /* border: red solid 2px; */
  margin: 12px;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  /* border: red solid 2px; */
}
.el-header{
  background-color: white;
  padding: 0;
  border-bottom: rgb(225, 225, 225) solid 2px;
}
.block{
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.common-layout{
  background-color: rgb(240, 240, 240);
}
</style>
