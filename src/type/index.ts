export interface Course {
  id?: number
  name?: string
  teacher?: string
  start_time?: Date
  end_time?: Date
  point?: number
  hour?: number
  content?: string
}
export interface Lab {
  id?: number
  name?: string
}

export interface Lesson{
  id: number
  start_time: string
  end_time: string
}

export interface Order{
  course?: Course
  lab?: Lab
  week?: number
  day?: number
  lesson?: Lesson
}
export interface CourseOrders {
  course?: Course
  orders?: Order[]
}
export interface LabOrders {
  lab?: Lab
  orders?: Order[]
}

export interface User {
  id?: number
  level?: number
  name?: string
  address?: string
  insertTime?: string
  sex?: string
  title?: Title
  courses?: Course[]
}

export interface Title {
  id?: number
  name?: string
}  


export interface ResultVO<T> {
  code: number
  message?: string
  data: T
}

const lessons: Lesson[] = [
  {
    id: 1,
    start_time: '08:00',
    end_time: '08:45',
  },
  {
    id: 2,
    start_time: '08:50',
    end_time: '09:35',
  },
  {
    id:3,
    start_time: '10:05',
    end_time: '10:50',
  },
  {
    id: 4,
    start_time: '10:55',
    end_time: '11:40',
  },
  {
    id: 5,
    start_time: '13:40',
    end_time: '14:25',
  },
  {
    id: 6,
    start_time: '14:30',
    end_time: '15:15',
  },
  {
    id: 7,
    start_time: '15:35',
    end_time: '16:20',
  },
  {
    id: 8,
    start_time: '16:25',
    end_time: '17:10',
  },
]

export function getLessons() {
  return lessons;
}

const labs:Lab[] = [
  {
    id: 1,
    name:'丹青901'
  },
  {
    id: 2,
    name:'丹青902'
  },
  {
    id: 3,
    name:'丹青903'
  },
  {
    id: 4,
    name:'丹青904'
  }
]
export function getLabs() {
  return labs
}
export function findLabs(lid: number) {
  return labs.find((la) => la.id == lid)
}

const courses:Course[] = [
  {
    id:1,name:'软件工程导论', point:3, hour:48,teacher: '李莉'
  },
  {
    id:2,name:'企业资源管理', point:2, hour:32,teacher: '李琰'
  },
  {
    id:3,name:'软件项目管理', point:2, hour:32,teacher: '刘丹'
  }
]
export function getCourses() {
  return courses
}


const orders:Order[] = [
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:1, day:2, lesson:lessons.find((le) => le.id == 3),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:1, day:2, lesson:lessons.find((le) => le.id == 4),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:1, day:5, lesson:lessons.find((le) => le.id == 1),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:1, day:5, lesson:lessons.find((le) => le.id == 2),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:2, day:2, lesson:lessons.find((le) => le.id == 5),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:2, day:2, lesson:lessons.find((le) => le.id == 6),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:2, day:5, lesson:lessons.find((le) => le.id == 3),
  },
  {
    course:courses.find((c) => c.name =='软件工程导论'), lab:labs.find((la) => la.name == '丹青901'), week:2, day:5, lesson:lessons.find((le) => le.id == 4),
  },
]
export function getOrders() {
  return orders;
}
