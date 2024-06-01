<template>
    <h2>修改课程</h2>
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
      <el-button type="primary" @click="onSubmit">修改</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref,watch } from 'vue'
import { InitStore } from '@/store/inidex.ts'
import { type Course } from '@/type'
import { ElMessage } from 'element-plus'

const course = defineModel<Course>('course')

// 双向绑定名称，用于传回给父元素
const courseR = ref<Course>(course.value)

const store = InitStore()
const courses = store.coursesList
// do not use same name with ref
const form = reactive({
  name: courseR.value.name,
  teacher: courseR.value.teacher,
  date1: String(courseR.value.start_time),
  date2: String(courseR.value.end_time),
  point: String(courseR.value.point),
  hour: String(courseR.value.hour),
  content: courseR.value.content,
})
watch(course, () => {
  courseR.value = course.value
form.name = courseR.value.name
form.teacher=courseR.value.teacher
form.date1=String(courseR.value.start_time)
form.date2=String(courseR.value.end_time)
form.point=String(courseR.value.point)
form.hour=String(courseR.value.hour)
form.content=courseR.value.content
})


const onSubmit = () => {
  console.log('submit!')
  const i = courseR.value.id - 1
  courses.value[i].name = form.name
  courses.value[i].teacher = form.teacher
  courses.value[i].start_time = new Date(form.date1)
  courses.value[i].end_time = new Date(form.date2)
  courses.value[i].point = Number(form.point)
  courses.value[i].hour = Number(form.hour)
  courses.value[i].content = form.content
  // const course = courses.value.filter(c => c.name == courseR.value.name && c.id == courseR.value.id)[0]
  // course.value.id = courseR.value.id
  ElMessage({
    message: '修改成功',
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
