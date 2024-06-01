import { getOrders, getLessons, getLabs, getCourses, type Order, type Course, type Lab, type Lesson } from '@/type'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const InitStore = createGlobalState(() => {
    const ordersList = ref<Order[]>(getOrders())
    const coursesList = ref<Course[]>(getCourses())
    const labsList = ref<Lab[]>(getLabs())
    const lessonsList = ref<Lesson[]>(getLessons())

    return{ 
        ordersList,
        coursesList,
        labsList,
        lessonsList
    }
})