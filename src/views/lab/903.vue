<script setup lang="ts">
// import Timetables from '@/assets/js/Timetables.min.js'
import Timetables from 'timetables'
import { ref, onMounted, watch, computed} from "vue"
import { InitStore } from '@/store/inidex.ts'
const store = InitStore()

  let courseList = [
    ['大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', '', '毛概@14208', '毛概@14208'],
    ['', '', '信号与系统@11302', '信号与系统@11302', '模拟电子技术基础@16204', '模拟电子技术基础@16204', '', ''],
    ['大学体育(Ⅳ)', '大学体育(Ⅳ)', '形势与政策(Ⅳ)@15208', '形势与政策(Ⅳ)@15208', '', '', '电路、信号与系统实验', '电路、信号与系统实验'],
    ['', '', '电装实习@11301', '电装实习@11301', '', '','大学体育', '大学体育'],
    ['', '', '数据结构与算法分析', '数据结构与算法分析', '', '', '信号与系统', '信号与系统'],
      ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
  ];
  let week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五','周六','周日'] :
    ['一', '二', '三', '四', '五','六','日'];
  let day = new Date().getDay();
  const courseType = [
    [{index: '1', name: '8:00'}, 1],
    [{index: '2', name: '8:50'}, 1],
    [{index: '3', name: '10:05'}, 1],
    [{index: '4', name: '10:55'}, 1],
    [{index: '5', name: '13:40'}, 1],
    [{index: '6', name: '14:30'}, 1],
    [{index: '7', name: '15:35'}, 1],
    [{index: '8', name: '16:25'}, 1],
  ];
  let Timetable = null
  onMounted(() => {
    courseList = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ];
  const orders =  computed(() => {
        return store.ordersList.value.filter(order => order.lab?.id == 3 && order.week == weeks.value)
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
  const weeks = ref(1)
  watch(weeks, () => {
    courseList = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ];
    const orders =  computed(() => {
        return store.ordersList.value.filter(order => order.lab?.id == 3 && order.week == weeks.value)
    })
    orders.value.forEach((order) => {
        courseList[Number(order.day)-1][Number(order.lesson?.id)-1] = String(order.course?.name)
    })
    console.log('更新课表')
    // 更新课表
    
    Timetable.setOption({
      timetables: courseList,
      week: ['一', '二', '三', '四', '五', '六', '日'],
      styles: {
        palette: ['#dedcda', '#ff4081']
      },
      timetableType: courseType,
      gridOnClick: function (e) {
        console.log(e);
      }
    });
  
  })
  
</script>

<template>
    <h2>丹青903</h2>
    <select name="weeks" id="weeks" class="" v-model="weeks">
  <option value="1">第一周</option><option value="2">第二周</option><option value="3">第三周</option>
  <option value="4">第四周</option><option value="5">第五周</option><option value="6">第六周</option>
  <option value="7">第七周</option><option value="8">第八周</option><option value="9">第九周</option>
  <option value="10">第十周</option><option value="11">第十一周</option><option value="12">第十二周</option>
  <option value="13">第十三周</option><option value="14">第十四周</option><option value="15">第十五周</option>
  <option value="16">第十六周</option><option value="17">第十七周</option><option value="18">第十八周</option>
</select>
    <div id="coursesTable" style=""></div>
</template>

<style scoped>
@import "@/assets/css/timetable.css";
#weeks{
 
}

</style>
