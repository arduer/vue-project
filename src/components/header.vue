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
          <el-button>Print</el-button>
          <el-button type="primary" class="ml-2">Edit</el-button>
          <span class="text-large font-600 mr-3" style="font-weight: bolder;">Git </span>
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
</style>
