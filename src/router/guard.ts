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
