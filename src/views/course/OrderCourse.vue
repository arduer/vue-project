<template>
    <div class="course-select" style="">
    <el-container>
      <el-aside width="260px" style="height: 100%">
      <el-scrollbar height="80vh">
        <span style="font-size: 20px;font-weight: bold;" >选择课程：</span>
        <select class="" v-model="courseR">
         <option v-for="(c, index) of courseS" :key="index" :value="c">
          {{ c.name }}
         </option>
        </select>
        <div class="room">
          
          <h5>选择教室</h5>
          <div style="">
            <div class="room-item" @click="room=1" id="room-1" :class="{ roomactive: room==1}" >丹青901</div>
            <div class="room-item" @click="room=2" id="room-2" :class="{ roomactive: room==2}" >丹青902</div>
          </div>
          <div class="room-item" @click="room=3" id="room-3" :class="{ roomactive: room==3}" >丹青903</div>
          <div class="room-item" @click="room=4" id="room-4" :class="{ roomactive: room==4}" >丹青904</div>
        </div>
        <div class="week">
          <h5>选择周次</h5>
          <div class="checkbox-group">
            <el-checkbox v-model="weeks[0]" label="第1周" size="" />
            <el-checkbox v-model="weeks[1]" label="第2周" size="" />
            <el-checkbox v-model="weeks[2]" label="第3周" size="" />
          </div>
          <div class="checkbox-group">
            <el-checkbox v-model="weeks[3]" label="第4周" size="" />
            <el-checkbox v-model="weeks[4]" label="第5周" size="" />
            <el-checkbox v-model="weeks[5]" label="第6周" size="" />
          </div>
          <div class="checkbox-group">
            <el-checkbox v-model="weeks[6]" label="第7周" size="" />
            <el-checkbox v-model="weeks[7]" label="第8周" size="" />
            <el-checkbox v-model="weeks[8]" label="第9周" size="" />
          </div>
          <div class="checkbox-group">
            <el-checkbox v-model="weeks[9]" label="第10周" size="" />
            <el-checkbox v-model="weeks[10]" label="第11周" size="" />
            <el-checkbox v-model="weeks[11]" label="第12周" size="" />
          </div>
          <div class="checkbox-group">
            <el-checkbox v-model="weeks[12]" label="第13周" size="" />
            <el-checkbox v-model="weeks[13]" label="第14周" size="" />
            <el-checkbox v-model="weeks[14]" label="第15周" size="" />
          </div>
          <div class="checkbox-group">
            <el-checkbox v-model="weeks[15]" label="第16周" size="" />
            <el-checkbox v-model="weeks[16]" label="第17周" size="" />
            <el-checkbox v-model="weeks[17]" label="第18周" size="" />
          </div>
          <div class="checkbox-group">
          </div>
          <el-button type="primary" plain style="position: relative;left: 45%;" @click="reset" size="small">重置</el-button>
        </div>
        <div class="">
          <h5 style="margin:0;padding-bottom: 0;">选择时间</h5>
          <div v-for="(dl, index) of dls" :key="index">
            <div class="dl-item">
              <el-input v-model="dl.day" style="width: 220px;height: 35px" placeholder="输入周几(1-7)" />
              <div class="" style="display: inline-block;">
                <el-radio-group v-model="dl.lesson" class="">
                  <el-radio value="1" class="el-radio">1,2节</el-radio>
                  <el-radio value="2" class="el-radio">3,4节</el-radio>
                  <el-radio value="3" class="el-radio">5,6节</el-radio>
                  <el-radio value="4" class="el-radio">7,8节</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <el-button type="success" plain size="small"  @click="add" style="position: relative;left: 40%;"><el-icon><Plus /></el-icon>添加预约</el-button>
        </div>
        <el-button type="primary" style="position: relative;left: 40%;margin-top: 10px" @click="OrderCourse">提交预约</el-button>
      </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header>
          <h3 style="font-weight: bold;" >课程：{{ courseR?.name }}</h3>
          教室：{{ labb }}
        </el-header>
        <el-main>
          <select name="weeks" id="weeks" class="" v-model="weekR">
  <option value="1">第一周</option><option value="2">第二周</option><option value="3">第三周</option>
  <option value="4">第四周</option><option value="5">第五周</option><option value="6">第六周</option>
  <option value="7">第七周</option><option value="8">第八周</option><option value="9">第九周</option>
  <option value="10">第十周</option><option value="11">第十一周</option><option value="12">第十二周</option>
  <option value="13">第十三周</option><option value="14">第十四周</option><option value="15">第十五周</option>
  <option value="16">第十六周</option><option value="17">第十七周</option><option value="18">第十八周</option>
</select>
          <div id="coursesTable" style=""></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, computed} from 'vue'
import Timetables from 'timetables'
import { InitStore } from '@/store/inidex.ts'
import { courseType,updatetable } from '@/store/timetableStroe.ts'
import { Plus } from "@element-plus/icons-vue";
import { type Course, type Lab, type Lesson, type Order} from '@/type'
import { ElMessage } from 'element-plus'

interface DL{
  day:string
  lesson:string
}
const dls = ref<DL[]>([{day:'', lesson:''}])
const store = InitStore()
const orderS = store.ordersList
const weekR = ref(1)
const room = ref(0)
const weeks = ref(Array.from({ length: 18 }, () => 0))
const reset = () => {
  weeks.value.fill(0)
}
const add = () => {
  const dl:DL = {day:'', lesson:''}
  dls.value.push(dl)
}
const courseR = ref<Course>()
const courseS =store.coursesList
const OrderCourse = (() => {
  let flag = true
  const orders = ref<Order[]>([])
  let ww = 0
  const c2:Course = store.coursesList.value.filter(c => c.name == courseR.value?.name)[0]
  const lab2:Lab = store.labsList.value.filter(l => l.id==room.value)[0]
  weeks.value.forEach(w => {
    ww = ww+1
    if(w == 1){
      dls.value.forEach(dl =>{

        const order1:Order = {
          course: c2,
          lab: lab2,
          week: ww,
          day: Number(dl.day),
          lesson: store.lessonsList.value.filter(le => le.id == Number(dl.lesson)*2-1)[0]
        }
        const order2:Order = {
          course: c2,
          lab: lab2,
          week: ww,
          day: Number(dl.day),
          lesson: store.lessonsList.value.filter(le => le.id == Number(dl.lesson)*2)[0]
        }
        // const orders = store.ordersList
        orders.value.push(order1)
        orders.value.push(order2)
        const length =  store.ordersList.value.filter(o => o.lab.id == lab2.id && o.week == ww && o.day == Number(dl.day) && o.lesson?.id == order1.lesson?.id).length
        if(length > 0){
          flag = false
        }
        // console.log(orders.value)
      })
    }
  })
  if(orders.value.length + store.ordersList.value.filter(o => o.course.name == courseR.value?.name).length > c2.hour){
    console.log('超了')
    alert('超了')
  }else if(flag != true){
    alert('预约时间有冲突')
  }else{
    orders.value.forEach(o => {
      store.ordersList.value.push(o)
    })
    ElMessage({
    message: '预约成功！',
    type: 'success',
  })
    const dlss = ref<DL[]>([{day:'', lesson:''}]);
    dls.value = dlss.value
    room.value = 0
    const weekss = ref(Array.from({ length: 18 }, () => 0))
    weeks.value = weekss.value
    const coursee =  ref<Course>()
    courseR.value =coursee.value
  }

})



let courseList = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ]
let week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五','周六','周日'] :
    ['一', '二', '三', '四', '五','六','日']
let day = new Date().getDay()
let Timetable = null
  onMounted(() => { 
    const orders =  computed(() => {
        return store.ordersList.value.filter(order => order.lab?.id == room.value && order.week == weekR.value)
    })
    orders.value.forEach((order) => {
        courseList[Number(order.day)-1][Number(order.lesson?.id)-1] = String(order.course?.name)
    })
  // 实例化(初始化课表)
    Timetable = new Timetables({
    el: '#coursesTable',
    timetables: courseList,
    week: week,
    timetableType: courseType,
    highlightWeek: day,
    gridOnClick: function (e) {
      alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
      console.log(e);
    },
    styles: {
      Gheight: 50
    }
  });
  })
  watch([room, weekR], () => {
  updatetable(room.value, weekR.value,Timetable)
  console.log(room.value)
})
const labb = ref()
watch(room,() => {
  if(room.value == 1){
    labb.value = '丹青901'
  }else if(room.value == 2){
    labb.value = '丹青902'
  }else if(room.value == 3){
    labb.value = '丹青903'
  }else if(room.value == 4){
    labb.value = '丹青904'
  }
})


</script>

<style scoped>
.room{
  width: 100%;
  /* border-bottom: grey solid 2px */
}
.room-item{
  text-align: center;
  display: inline-block;
  border-radius: 3px;
  padding: 2px 5px;
  margin: 3px 10px;
  width: 40%;
  cursor: pointer;
  transition: transform 0.1s ease;
  transform-origin: left;
}
.room-item:hover{
  color: white;
  background-color: #409eff;
  transform: scale(1.1); 
}
.roomactive{
  color: white;
  background-color: #409eff;
}
.week{
  position: relative;
}
.checkbox-group{
  display: flex;
  justify-content: space-between;
}
.dl-item{
  margin: 0;
  display: flex;
  align-items: center;
  border-bottom: rgb(192, 192, 192) solid 2px;
  .el-radio{
    margin:3px 8px;
  }
}

</style>
