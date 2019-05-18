import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: About
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/oauth',
      name: 'oauth',
      component: () => import(/* webpackChunkName: "about" */ './views/Oauth.vue')
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import(/* webpackChunkName: "about" */ './views/Callback.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import(/* webpackChunkName: "about" */ './views/Timeline.vue')
    }
  ]
})
