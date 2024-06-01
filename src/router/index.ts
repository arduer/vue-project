import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      redirect: '/home', 
      meta: {        //是路由的原数据
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      // redirect: '/home', 
      meta: {        //是路由的原数据
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '',
          name: 'home1',
          component: () => import('@/views/home/home.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/lab',
          name: 'lab',
          redirect: '/lab/901',
        },
        {
          path: '/lab/901',
          name: '901',
          component: () => import('@/views/lab/901.vue'),
          meta: {
            requireAuth: true,
          },
        },{
          path: '/lab/902',
          name: '902',
          component: () => import('@/views/lab/902.vue'),
          meta: {
            requireAuth: true,
          },
        },{
          path: '/lab/903',
          name: '903',
          component: () => import('@/views/lab/903.vue'),
          meta: {
            requireAuth: true,
          },
        },{
          path: '/lab/904',
          name: '904',
          component: () => import('@/views/lab/904.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course/index.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/course/add',
          name: 'addcourse',
          component: () => import('@/views/course/add.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/course/order',
          name: 'OrderCourse',
          component: () => import('@/views/course/OrderCourse.vue'),
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue'),
    },

  ]
})


router.beforeEach((to, from, next) =>{
  const token = sessionStorage.getItem('token'); // 从sessionStorage获取token

  if (!token && to.meta.requireAuth) {
    next('/login'); // 如果没有token并且试图访问受保护的页面，重定向到登录页面
  } else {
    next(); // 否则，允许导航
  }
});

export default router
