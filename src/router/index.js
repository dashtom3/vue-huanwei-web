import Vue from 'vue'

import Router from 'vue-router'
import Layout from '@/components/layout/Layout'

import ConfigCar from '@/components/admin/ConfigCar'
import ManageCar from '@/components/admin/ManageCar'
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
          path:'/admin/manageCar',
          component: ManageCar,
          name:'ManageCar'
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
