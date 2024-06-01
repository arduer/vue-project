<template>
  <el-row class="tac">
    <el-col >
      <div class="thead" style="">
          <img src="@/assets/images/logo.png" alt="Logo" style="">
          <h3 class="" style="display: inline-block;font-weight: bolder;">实验室预约</h3>
      </div>
      
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-menu-item index="/home" >
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>实验室排表</span>
          </template>
          <el-menu-item index="/lab/901">丹青901</el-menu-item>
          <el-menu-item index="/lab/902">丹青902</el-menu-item>
          <el-menu-item index="/lab/903">丹青903</el-menu-item>
          <el-menu-item index="/lab/904">丹青904</el-menu-item>
          <!-- <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu> -->
        </el-sub-menu>
        <el-menu-item index="/course">
          <el-icon><icon-menu /></el-icon>
          <span>课程信息</span>
        </el-menu-item>
        <el-menu-item index="/course/order">
          <el-icon><document /></el-icon>
          <span>实验室预约</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <el-icon><setting /></el-icon>
          <span>预约记录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";

const router = useRouter();

const activeIndex = ref('/home');
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (index:string) => {
  router.push(index);
  activeIndex.value = index;
  
}

</script>

<style scoped>
.tac{
  border-right: rgb(225, 225, 225) solid 2px;
  height: 100%;
  .el-menu-demo{
    border: 0;
  }
}
.thead{
  position: relative;
  padding: 8px 30px;
  padding-top: 15px;
  /* border: red solid 2px; */
  h2{
    margin: auto;
  }
  img{
    width: 32px;
    position: relative;
    top: -5px;
    /* border: red solid 2px; */
  }
}
</style>