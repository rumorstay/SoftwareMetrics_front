import { createRouter, createWebHistory } from 'vue-router'
import Main_windows from '@/views/Main_Window.vue'
import Home from '@/views/main.vue'
import Cyclo from '@/views/CyclomaticComplexity.vue'
import Function from '@/views/FunctionPoint.vue'
import Loc from '@/views/LOC.vue'
import oock from '@/views/OO-CK.vue'
import oolk from '@/views/OO-LK.vue'
import oolk_new from '@/views/OO-LK_NEW.vue'
import UseCase from '@/views/UseCasePoint.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Main_windows',
      name: 'Main_windows',
      component: Main_windows,
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: Home,
        },
        {
          path: 'Function',
          name: 'Function',
          component: Function,
        },
        {
          path: 'UseCase',
          name: 'UseCase',
          component: UseCase,
        },
        {
          path: 'Cyclo',
          name: 'Cyclo',
          component: Cyclo,
        },
        {
          path: 'oock',
          name: 'oock',
          component: oock,
        },
        {
          path: 'oolk',
          name: 'oolk',
          component: oolk,
        },
        {
          path: 'oolk_new',
          name: 'oolk_new',
          component: oolk_new,
        },
        {
          path: 'Loc',
          name: 'Loc',
          component: Loc,
        },
      ]
    },
    {
      path:"/",
      redirect:'/Main_windows/Home'
    }
  ],
})

export default router
