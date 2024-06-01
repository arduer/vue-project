
<template>
    <div class="">
    <el-container>
      <el-aside width="220px" class="el-aside">
        <el-scrollbar height="80vh">
        <h2>预约记录</h2>
        <div id="course-list" v-for="(c, index) of courses" :key="index" >
                <button type="button" class="btn" :class="(getClass(index))" @click="updateCourse(c)">
                    <h5>{{ c.name }}</h5><span>{{ c.teacher }}</span>
                    {{ c.point }}学分
                    <span>{{ c.hour }}学时</span>{{ index+1 }}
                </button>
        </div>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <h3>课程: {{ course?.name }}</h3>
        <div>
        <el-table :data="tableData" 
        style="width: 100%"
        height="100%"
        :row-class-name="tableRowClassName"
        >
            <el-table-column prop="room" label="教室" width="180" />
            <el-table-column prop="week" label="周次" width="180" />
            <el-table-column prop="day" label="日期" />
            <el-table-column prop="lesson" label="节数" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button
                    link
                    type="primary"
                    size="large"
                    @click="deleteRow(scope.$index)"
                    >
                    删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>            
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { type Course, type Order } from '@/type';
import { InitStore } from '@/store/inidex.ts'
import { useRouter } from "vue-router"
import { Plus } from "@element-plus/icons-vue";
import { ref, onMounted, watch } from 'vue'
interface Table{
    room:string
    week:string
    day:string
    lesson:string
}
interface Schedule{
    room:string
    week:number[]
    day:string
    lesson:string
}
const schedules = ref<Schedule[]>([])
const tableData = ref<Table[]>([])
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
const ordersS = store.ordersList
const orders = ref<Order[]>([])

const updateCourse = (c:Course) => {
    schedules.value = []
    tableData.value = []
    course.value = c
    // router.push('course/add')
    orders.value = ordersS.value.filter(o => o.course?.name == course.value?.name)
    orders.value.forEach( o => {
        if(Number(o.lesson?.id) % 2 != 0){return}
        if(schedules.value.filter(s => s.room == o.lab?.name && s.day == String(o.day) && s.lesson == String(Number(o.lesson?.id) / 2)).length == 0){
            console.log('添加新的')
            const schedule:Schedule = {room: String(o.lab?.name), week:[Number(o.week)], day:String(o.day), lesson: String(Number(o.lesson?.id) / 2)}
            schedules.value.push(schedule)
        }else {
            console.log('添加周')
            schedules.value.forEach(s => {
                if(s.room == o.lab?.name && s.day == String(o.day) && s.lesson == String(Number(o.lesson?.id) / 2)){
                    s.week.push(Number(o.week))
                }
            })
        }
    })
    schedules.value.forEach(s => {
        let lesson = ''
        if(s.lesson == '1'){ lesson = '[1,2]'}
        else if(s.lesson == '2'){ lesson = '[3,4]'}
        else if(s.lesson == '3'){ lesson = '[5,6]'}
        else { lesson = '[7,8]'}
        const tableitem:Table = {room:s.room, week:formatArray(s.week), day:s.day, lesson:lesson}
        tableData.value.push(tableitem)
    })
}
function formatArray(arr:number[]){
    let result = '';
      let start = arr[0];
      let end = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === 1) {
          end = arr[i];
        } else {
          if (start === end) {
            result += `${start}, `;
          } else {
            result += `${start}-${end}, `;
          }
          start = arr[i];
          end = arr[i];
        }
      }
      if (start === end) {
        result += start;
      } else {
        result += `${start}-${end}`;
      }
      return result;
}
function deleteRow(index:number){
    const s = schedules.value[index]
    console.log(s)
    s.week.forEach(i => {
        console.log(i)
        ordersS.value = ordersS.value.filter(
        o => s.room != o.lab?.name ||
        s.day != String(o.day) || 
        (s.lesson != String(Number(o.lesson?.id) / 2) || s.lesson == String((Number(o.lesson?.id)+1) / 2)) ||
        o.course?.name != course.value?.name
        || o.week != i
        )
    })
}
watch(ordersS, ()=>{
    const c:Course = course.value
    updateCourse(c)
})
onMounted(() => {
    schedules.value = []
    tableData.value = []
    course.value = store.coursesList.value.filter(c => c.name == '软件工程导论')[0]
    // router.push('course/add')
    orders.value = ordersS.value.filter(o => o.course?.name == course.value?.name)
    orders.value.forEach( o => {
        if(Number(o.lesson?.id) % 2 != 0){return}
        if(schedules.value.filter(s => s.room == o.lab?.name && s.day == String(o.day) && s.lesson == String(Number(o.lesson?.id) / 2)).length == 0){
            console.log('添加新的')
            const schedule:Schedule = {room: String(o.lab?.name), week:[Number(o.week)], day:String(o.day), lesson: String(Number(o.lesson?.id) / 2)}
            schedules.value.push(schedule)
        }else {
            console.log('添加周')
            schedules.value.forEach(s => {
                if(s.room == o.lab?.name && s.day == String(o.day) && s.lesson == String(Number(o.lesson?.id) / 2)){
                    s.week.push(Number(o.week))
                }
            })
        }
    })
    schedules.value.forEach(s => {
        let lesson = ''
        if(s.lesson == '1'){ lesson = '[1,2]'}
        else if(s.lesson == '2'){ lesson = '[3,4]'}
        else if(s.lesson == '3'){ lesson = '[5,6]'}
        else { lesson = '[7,8]'}
        const tableitem:Table = {room:s.room, week:formatArray(s.week), day:s.day, lesson:lesson}
        tableData.value.push(tableitem)
    })
})


const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
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
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

</style>
