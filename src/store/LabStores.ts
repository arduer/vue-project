import type { Course, User, Lesson, Lab, Order, LabOrders } from '@/type'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const LabStore = createGlobalState(() => {
    const laborders = ref<LabOrders>();
    
})