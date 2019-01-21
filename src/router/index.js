import Vue from 'vue'

import Router from 'vue-router'
import Layout from '@/components/layout/Layout'

import ConfigCar from '@/components/admin/ConfigCar'
import ConfigCan from '@/components/admin/ConfigCan'
import ConfigCard from '@/components/admin/ConfigCard'
import ConfigWrist from '@/components/admin/ConfigWrist'
import ManageCar from '@/components/admin/ManageCar'
import ManageCan from '@/components/admin/ManageCan'
import ManageUser from '@/components/admin/ManageUser'
import ManageDepartment from '@/components/admin/ManageDepartment'

import Test from '@/components/admin/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Layout,
      children:[
        {
          path:'/admin/configCar',
          component: ConfigCar,
          name:'ConfigCar'
        },
        {
          path:'/admin/configCan',
          component: ConfigCan,
          name:'ConfigCan'
        },
        {
          path:'/admin/configWrist',
          component: ConfigWrist,
          name:'ConfigWrist'
        },
        {
          path:'/admin/configCard',
          component: ConfigCard,
          name:'ConfigCard'
        },
        {
          path:'/admin/manageCar',
          component: ManageCar,
          name:'ManageCar'
        },
        {
          path:'/admin/manageCan',
          component: ManageCan,
          name:'ManageCan'
        },
        {
          path:'/admin/manageUser',
          component: ManageUser,
          name:'ManageUser'
        },
        {
          path:'/admin/manageDepartment',
          component: ManageDepartment,
          name:'ManageDepartment'
        },
        {
          path:'/admin/test',
          component: Test,
          name:'Test'
        }
      ]
    }
  ]
})
