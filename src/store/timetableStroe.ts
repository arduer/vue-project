import Timetables from 'timetables'
import { ref, onMounted, watch, computed} from "vue"
import { InitStore } from '@/store/inidex.ts'
const store = InitStore()

let Timetable = null
let courseList = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ];
const week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五','周六','周日'] :
['一', '二', '三', '四', '五','六','日'];
const day = new Date().getDay();
export const courseType = [
    [{index: '1', name: '8:00'}, 1],
    [{index: '2', name: '8:50'}, 1],
    [{index: '3', name: '10:05'}, 1],
    [{index: '4', name: '10:55'}, 1],
    [{index: '5', name: '13:40'}, 1],
    [{index: '6', name: '14:30'}, 1],
    [{index: '7', name: '15:35'}, 1],
    [{index: '8', name: '16:25'}, 1],
  ];
  export function updatetable(lab:number, weekR:number,Timetable){
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
        return store.ordersList.value.filter(order => order.lab?.id == lab && order.week == weekR)
    })
    orders.value.forEach((order) => {
        courseList[Number(order.day)-1][Number(order.lesson?.id)-1] = String(order.course?.name)
    })
      // 实例化(初始化课表)
      Timetable.setOption({
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

  }