## 博客

## 1.创建vite项目

```js
1.npm init vue@latest
2.pnpm install
3.pnpm run dev
4.清空无用的文件
5.重置css样式: noramlize.css
```

## 2.项目路由配置

### 2.1 创建页面与注册路由

```js
这里我将路由配置拆分为了三个ts文件
gurad.ts // 路由守卫部分
routes.ts // 动态路由部分
index.ts // 路由主文件,包含静态路由,路由模式
```

### 2.2 guard.ts

```js
import { getAuth } from '@/utils/auth' // 获取本地存储数据
import { Auth } from '@/enums/auth' // 本地存储数据枚举类型
import routesList from './routes' // 动态路由列表
import { useSettingStore } from '@/stores/setting' // pinia
import pinia from '@/stores/pinia' // 坑: 在ts中使用pinia,必须要这样操作,否则会报错

const settingStore = useSettingStore(pinia) // 初始化设置仓库

// 前置路由守卫
const beforeEachGuard = async (router: any) => { // router: index.ts中的router实例
  router.beforeEach((to: any, from: any, next: any) => {
    
    // 1.从本地取出token
    const token = getAuth(Auth.TOKEN)
    
    // 2.如果存在token,并且想去的页面是登录页,直接跳转到首页
    if (token && to.path === '/login') {
      next('/home')
    } else {
      
      // 3.如果没有token,并且想去的页面不是登录页,直接跳转到登录页
      if (!token && to.path !== '/login') {
        next('/login')
      } else {
        
        // 坑: 必须要记录下来是不是第一次进到守卫,如果不记录则会报错: router栈溢出
        // 4.settingStore.isFirstEnterBeforeEach默认为false
        if (!settingStore.isFirstEnterBeforeEach) {
          
          // 5.将isFirstEnterBeforeEach设置为true
          settingStore.enterBeforeEach
          
          // 6.注册动态路由,传入index.ts中的路由实例
          buildRoutes(router)
          
          // 7.动态路由注册完毕后,跳转页面
          next(to.path)
        } else {
          // 8.如果isFirstEnterBeforeEach为true,直接放行,不再重新注册动态路由
          next()
        }
      }
    }
  })
}

// 注册动态路由到Layout组件下
const buildRoutes = (router: any) => {
  routesList.forEach((routers) => {
    router.addRoute('Layout', routers)
  })
}

// 导出前置守卫
export { beforeEachGuard }

```

### 2.3 routes.ts

```js
import Home from '@/views/home/index.vue'
import UserCreate from '@/views/user/create.vue'
import UserHandle from '@/views/user/handle.vue'
import ArticleCreate from '@/views/article/create.vue'
import ArticleHandle from '@/views/article/handle.vue'
import StackManageCreate from '@/views/stackManage/create.vue'
import StackManageHandle from '@/views/stackManage/handle.vue'

const routesList = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },

  {
    path: '/user',
    redirect: '/user/create',
    children: [
      { path: 'create', component: UserCreate },
      { path: 'handle', component: UserHandle }
    ]
  },

  {
    path: '/article',
    redirect: '/article/create',
    children: [
      { path: '/article/create', component: ArticleCreate },
      { path: '/article/handle', component: ArticleHandle }
    ]
  },

  {
    path: '/stackManage',
    redirect: '/stackManage/create',
    children: [
      { path: '/stackManage/create', component: StackManageCreate },
      { path: '/stackManage/handle', component: StackManageHandle }
    ]
  }
]

// 导出动态路由数组
export default routesList
```

### 2.4 index.ts

```js
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { beforeEachGuard } from './guard' // 引入前置守卫
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import NotFound from '@/views/notFound/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    name: 'Layout'
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 调用前置守卫,传入router实例
beforeEachGuard(router)

export default router
```

## 记录坑

## 1.在ts文件中使用pinia

```js
// stores/setting.ts
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isFirstEnterBeforeEach: false
  }),

  getters: {
    enterBeforeEach: (state) => (state.isFirstEnterBeforeEach = true)
  }
})
```

```js
// demo.ts
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore() // 此时会报错 getStore()未注册
```

```js
// 解决方案:
// 在stores下创建一个pinia.ts文件,并写入以下代码:
import { createPinia } from 'pinia'
const pinia = createPinia() // 创建pinia
export default pinia // 导出pinia
```

```js
// 再次返回demo.ts,添加如下代码:
// demo.ts
import pinia from "@/stores/pinia" // 引入创建后的pinia实例
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore(pinia) // 将pinia实例传入,此时setting仓库可以正常使用了
```

## 2.beforeEach重定向栈溢出

```js
import { getAuth } from '@/utils/auth'
import { Auth } from '@/enums/auth'
import routesList from './routes'
import { useSettingStore } from '@/stores/setting'
import pinia from '@/stores/pinia'

const settingStore = useSettingStore(pinia)

const beforeEachGuard = async (router: any) => {
  router.beforeEach((to: any, from: any, next: any) => {
    const token = getAuth(Auth.TOKEN)
    if (token && to.path === '/login') {
      next('/home')
    } else {
      if (!token && to.path !== '/login') {
        next('/login')
      } else {
        // 如果不加这个条件,会提示重定向栈溢出
        if (!settingStore.isFirstEnterBeforeEach) {
          settingStore.enterBeforeEach
          buildRoutes(router)
          next(to.path)
        } else {
          next()
        }
      }
    }
  })
}

const buildRoutes = (router: any) => {
  routesList.forEach((routers) => {
    router.addRoute('Layout', routers)
  })
}

export { beforeEachGuard }
```

