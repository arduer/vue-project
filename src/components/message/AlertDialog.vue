<template>
  <div>
    <el-dialog v-model="visible" :show-close="false" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">异常</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    用户名或密码错误
  </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { render } from 'vue'
// 接收信息数据，以及当关闭模态框时的执行函数
const props = defineProps<{ msg: string; close: Function }>()
//
const closed = () => {
  // 执行传入的关闭模态框时需执行的操作
  props.close()
  // 从body移除
  render(null, document.body)
}

const visible = ref(true)
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
</style>
