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

export default routesList
