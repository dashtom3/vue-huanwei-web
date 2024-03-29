import Vue from 'vue'

import Router from 'vue-router'
import Layout from '@/components/layout/Layout'

import ConfigCar from '@/components/admin/ConfigCar'
import ConfigCan from '@/components/admin/ConfigCan'
import ConfigCard from '@/components/admin/ConfigCard'
import ConfigWrist from '@/components/admin/ConfigWrist'
import ConfigApp from '@/components/admin/ConfigApp'
import ConfigWork from '@/components/admin/ConfigWork'
import ManageCar from '@/components/admin/ManageCar'
import ManageCan from '@/components/admin/ManageCan'
import ManageUser from '@/components/admin/ManageUser'
import ManageDepartment from '@/components/admin/ManageDepartment'
import ManageWork from '@/components/admin/ManageWork'
import Index from '@/components/Index'
import Work from '@/components/Work'
import Business from '@/components/Business'
import Alert from '@/components/Alert'
import Login from '@/components/Login'
import Test from '@/components/admin/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/work',
      name: 'Work',
      component: Work
    },
    {
      path: '/alert',
      name: 'Alert',
      component: Alert
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
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
          path:'/admin/configApp',
          component: ConfigApp,
          name:'ConfigApp'
        },
        {
          path:'/admin/configCard',
          component: ConfigCard,
          name:'ConfigCard'
        },
        {
          path:'/admin/configWork',
          component: ConfigWork,
          name:'ConfigWork'
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
          path:'/admin/manageWork',
          component: ManageWork,
          name:'ManageWork'
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
