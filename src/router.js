import Vue from 'vue'
import Router from 'vue-router'
import store from '@/stores/store';
import NProgress from 'nprogress'


import Default from "./layouts/default"

Vue.use(Router)

let router =  new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/dashboard/Admin.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: "base_component", closeForAuth: true},
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      linkActiveClass: "active",
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/dashboard/Admin.vue'),
      children: [
        {
          path: '/',
          component: () => import('./views/dashboard/OrderNumber.vue'),
        },
        {
          path: '/dashboard/services',
          component: () => import('./views/dashboard/Services.vue'),
        },
        {
          path: '/dashboard/messages',
          component: () => import('./views/dashboard/Messages.vue'),
        },
      ]
    },
    {
      path: '/search',
      name: 'search',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/search/search.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/orders/Orders.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/search/BookFlight.vue')
    },
    {
      path: '/control',
      name: 'control',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/fees/Fees.vue'),
    },
    {
      path: '/control/fees/add',
      name: 'fees-add',
      component: () => import('./views/control/fees/AddFees.vue'),
    },
    {
      path: '/control/fees/add/:id',
      name: 'fees-add',
      component: () => import('./views/control/fees/AddFees.vue'),
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: () => import('./views/placeBlocks/blocks/Blocks.vue'),
    },
    {
      path: '/blocks/add',
      name: 'blocks-add',
      component: () => import('./views/placeBlocks/blocks/BlocksAdd.vue'),
    },
    {
      path: '/blocks/add/:id',
      name: 'blocks-add',
      component: () => import('./views/placeBlocks/blocks/BlocksAdd.vue'),
    },
    {
      path: '/flights/:id',
      name: 'flights',
      props: true,
      component: () => import('./views/placeBlocks/blocks/FlightsList.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('./views/placeBlocks/schedule/Schedule.vue'),
    },
    {
      path: '/schedule/add',
      name: 'schedule-add',
      component: () => import('./views/placeBlocks/schedule/ScheduleAdd.vue'),
    },
    {
      path: '/schedule/add/:id',
      name: 'schedule-add',
      component: () => import('./views/placeBlocks/schedule/ScheduleAdd.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    },
  ]
});
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (store.state.auth.isAuthenticated == false) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.closeForAuth)) {
    if (store.state.auth.isAuthenticated != false && store.state.auth.isAuthenticated != undefined) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next();
  }
});

export default router;