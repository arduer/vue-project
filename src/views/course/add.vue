<template>
    <h2>添加课程</h2>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="课程名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="教师">
      <el-input v-model="form.teacher" />
    </el-form-item>
    <!-- <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="开课时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"

          placeholder="开始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-date-picker
          v-model="form.date2"
          
          placeholder="结束时间"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <div style="display: flex">
        <el-form-item label="学分">
            <el-input v-model="form.point" />
        </el-form-item>
        <el-form-item label="学时">
            <el-input v-model="form.hour" />
        </el-form-item>
    </div>

    <el-form-item label="课程描述">
      <el-input v-model="form.content" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { InitStore } from '@/store/inidex.ts'
import { type Course } from '@/type';
import { ElMessage } from 'element-plus'

const store = InitStore()
const courses = store.coursesList
// do not use same name with ref
const form = reactive({
  name: '',
  teacher: '',
  date1: '',
  date2: '',
  point: '',
  hour: '',
  content: '',
})

const onSubmit = () => {
  console.log('submit!')
  const id = courses.value.length + 1
  
  const course = ref<Course>({
    id:id, 
    name:form.name,
    teacher:form.teacher,
    start_time:new Date(form.date1),
    end_time:new Date(form.date2),
    point:Number(form.point),
    hour:Number(form.hour),
    content:form.content,
})
courses.value.push(course.value)
console.log(course.value)
  form.name= ''
  form.teacher= ''
  form.date1=''
  form.date2=''
  form.point=''
  form.hour=''
  form.content=''
  ElMessage({
    message: '创建成功！',
    type: 'success',
  })
}
const reset = () =>{
  form.name= ''
  form.teacher= ''
  form.date1=''
  form.date2=''
  form.point=''
  form.hour=''
  form.content=''
}
</script>
<style scoped>



</style>
