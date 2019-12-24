import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0cc3b8ea = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _580b346d = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _3725ff53 = () => interopDefault(import('../pages/reset.vue' /* webpackChunkName: "pages/reset" */))
const _14957378 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _78687a60 = () => interopDefault(import('../pages/signupd.vue' /* webpackChunkName: "pages/signupd" */))
const _0528b8bc = () => interopDefault(import('../pages/trash.vue' /* webpackChunkName: "pages/trash" */))
const _52d875b6 = () => interopDefault(import('../pages/verify.vue' /* webpackChunkName: "pages/verify" */))
const _41931c5f = () => interopDefault(import('../pages/movie/_id.vue' /* webpackChunkName: "pages/movie/_id" */))
const _61f8b75d = () => interopDefault(import('../pages/video/_hash.vue' /* webpackChunkName: "pages/video/_hash" */))
const _e338dd54 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _0cc3b8ea,
    name: "home"
  }, {
    path: "/login",
    component: _580b346d,
    name: "login"
  }, {
    path: "/reset",
    component: _3725ff53,
    name: "reset"
  }, {
    path: "/signup",
    component: _14957378,
    name: "signup"
  }, {
    path: "/signupd",
    component: _78687a60,
    name: "signupd"
  }, {
    path: "/trash",
    component: _0528b8bc,
    name: "trash"
  }, {
    path: "/verify",
    component: _52d875b6,
    name: "verify"
  }, {
    path: "/movie/:id?",
    component: _41931c5f,
    name: "movie-id"
  }, {
    path: "/video/:hash?",
    component: _61f8b75d,
    name: "video-hash"
  }, {
    path: "/",
    component: _e338dd54,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
