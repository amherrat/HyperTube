import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _93bb835c = () => interopDefault(import('../pages/error.vue' /* webpackChunkName: "pages/error" */))
const _51518e38 = () => interopDefault(import('../pages/forgotpassword.vue' /* webpackChunkName: "pages/forgotpassword" */))
const _7495a405 = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _3c03c333 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _dcf4a8a0 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _1b1e8e19 = () => interopDefault(import('../pages/reset.vue' /* webpackChunkName: "pages/reset" */))
const _c03943e8 = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _de62df84 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _71ad0f1f = () => interopDefault(import('../pages/verify.vue' /* webpackChunkName: "pages/verify" */))
const _e7ca7eea = () => interopDefault(import('../pages/settings/update_password.vue' /* webpackChunkName: "pages/settings/update_password" */))
const _457ad825 = () => interopDefault(import('../pages/movie/_id.vue' /* webpackChunkName: "pages/movie/_id" */))
const _3738deb6 = () => interopDefault(import('../pages/profile/_login.vue' /* webpackChunkName: "pages/profile/_login" */))
const _0ae099a3 = () => interopDefault(import('../pages/video/_hash.vue' /* webpackChunkName: "pages/video/_hash" */))
const _725c201c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/error",
    component: _93bb835c,
    name: "error"
  }, {
    path: "/forgotpassword",
    component: _51518e38,
    name: "forgotpassword"
  }, {
    path: "/home",
    component: _7495a405,
    name: "home"
  }, {
    path: "/login",
    component: _3c03c333,
    name: "login"
  }, {
    path: "/logout",
    component: _dcf4a8a0,
    name: "logout"
  }, {
    path: "/reset",
    component: _1b1e8e19,
    name: "reset"
  }, {
    path: "/settings",
    component: _c03943e8,
    name: "settings"
  }, {
    path: "/signup",
    component: _de62df84,
    name: "signup"
  }, {
    path: "/verify",
    component: _71ad0f1f,
    name: "verify"
  }, {
    path: "/settings/update_password",
    component: _e7ca7eea,
    name: "settings-update_password"
  }, {
    path: "/movie/:id?",
    component: _457ad825,
    name: "movie-id"
  }, {
    path: "/profile/:login?",
    component: _3738deb6,
    name: "profile-login"
  }, {
    path: "/video/:hash?",
    component: _0ae099a3,
    name: "video-hash"
  }, {
    path: "/",
    component: _725c201c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
