import Vue from 'vue'

import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Main from '@/components/Main'
import Index from '@/components/Index'
import Car from '@/components/admin/Car'
import Lot from '@/components/admin/Lot'
import LotState from '@/components/admin/LotState'
import WaitState from '@/components/admin/WaitState'
import OrderState from '@/components/admin/OrderState'
import Pic from '@/components/admin/Pic'
import Lock from '@/components/admin/Lock'
import Wait from '@/components/admin/Wait'
import Demo from '@/components/admin/Demo'

import CarInfo from '@/components/CarInfo'
import ParkDetails from '@/components/ParkDetails'
import Park2 from '@/components/Park'
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
      path: '/parkdetails',
      name: 'ParkDetails',
      component: ParkDetails
    },
    {
      path: '/park',
      name: 'Park2',
      component: Park2
    },
    {
      path: '/carinfo',
      name: 'CarInfo',
      component: CarInfo
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Layout,
      children:[
        {
          path:'/admin/car',
          component: Car,
          name:'Car'
        },
        {
          path:'/admin/lot',
          component: Lot,
          name:'Lot'
        },
        {
          path:'/admin/wait',
          component: Wait,
          name:'Wait'
        },
        {
          path:'/admin/lock',
          component: Lock,
          name:'Lock'
        },
        {
          path:'/admin/lotState',
          component: LotState,
          name:'LotState'
        },
        {
          path:'/admin/waitState',
          component: WaitState,
          name:'WaitState'
        },
        {
          path:'/admin/orderState',
          component: OrderState,
          name:'OrderState'
        },
        {
          path:'/admin/pic',
          component: Pic,
          name:'Pic'
        },
        {
          path:'/admin/test',
          component: Test,
          name:'Test'
        },
        {
          path:'/admin/demo',
          component:Demo,
          name:'Demo'
        }
      ]
    }
  ]
})
