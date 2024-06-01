import type { Course, User } from '@/type'
import { useExample11Store } from './Example11Store.ts'
import { useGet, usePost } from '@/fetch/index.ts'



// example11-2
export const loginService = async (user: { username: string; password: string }) => {
  const resp = await usePost<{ user: User }>('login', user)
  const token = resp.response.value?.headers.get('token')
  token && sessionStorage.setItem('token', token)
  //放token
  const userS = useExample11Store().userS
  resp.data.value?.data && (userS.value = resp.data.value?.data.user)
  // 存user
}
// example11-2
export const getHomeService = async () => {
  const resp = await useGet<{ courses: Course[] }>('home')
  useExample11Store().coursesS.value = resp.data.value?.data.courses ?? []
}
