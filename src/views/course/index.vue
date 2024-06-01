<template>
    <div class="">
    <el-container>
      <el-aside width="400px" class="el-aside">
        <el-scrollbar height="80vh">
        <h2>课程信息</h2>
        <div id="course-list" v-for="(c, index) of courses" :key="index" >
                <button type="button" class="btn" :class="(getClass(index))" @click="updateCourse(c)">
                    <h5>{{ c.name }}</h5><span>{{ c.teacher }}</span>
                    {{ c.point }}学分
                    <span>{{ c.hour }}学时</span>{{ index+1 }}
                </button>
        </div>
        <div>
            <el-button type="primary" size="large"  @click="addCourse"><el-icon><Plus /></el-icon>添加预约</el-button>
        </div>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <Add v-if="addflag" />
        <editbutton2
         v-if="updateflag"
         v-model:course="course"
        />
      </el-main>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import { type Course } from '@/type';
import { InitStore } from '@/store/inidex.ts'
import { useRouter } from "vue-router"
import { Plus } from "@element-plus/icons-vue";
import Add from './add.vue'
import { ref, defineAsyncComponent, watch } from 'vue'
const editbutton2 = defineAsyncComponent(() => import('./update.vue'))

const addflag = ref(false)
const updateflag = ref(false)
const course = ref<Course>()
const getClass = (i:number) => {
    if (i % 4 == 0) {
        return 'btn-primary'
    } else if (i % 4 == 1) {
        return 'btn-success'
    } else if (i % 4 == 2) {
        return 'btn-danger'
    } else if (i % 4 == 3) {
        return 'btn-warning'
    }
}

const router = useRouter()
const store = InitStore()
const courses = store.coursesList


const updateCourse = (c:Course) => {
    course.value = c
    // router.push('course/add')
    updateflag.value = false
    addflag.value = false
    updateflag.value = true
}
const addCourse = () => {
    // router.push('course/add')
    addflag.value = false
    updateflag.value = false
    addflag.value = true
}
</script>

<style scoped>
.btn{
    padding: 5px 10px;
    width: 200px;
    height: 100px;
    margin: 5px;
    h3{
        display: inline-block;
        position: relative;
        font-weight: bolder;
        left: -20%;
        top: -20%;
    }
}
.el-aside{
    border-right: rgb(225, 225, 225) solid 2px;
}


</style>
