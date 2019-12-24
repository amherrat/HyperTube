import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c8958564 = () => interopDefault(import('../pages/forgotpassword.vue' /* webpackChunkName: "pages/forgotpassword" */))
const _08b044ef = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _2b3d3f89 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0a580a6f = () => interopDefault(import('../pages/reset.vue' /* webpackChunkName: "pages/reset" */))
const _ee76c2b0 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _dab11228 = () => interopDefault(import('../pages/signupd.vue' /* webpackChunkName: "pages/signupd" */))
const _4f4a7850 = () => interopDefault(import('../pages/trash.vue' /* webpackChunkName: "pages/trash" */))
const _69a31d89 = () => interopDefault(import('../pages/verify.vue' /* webpackChunkName: "pages/verify" */))
const _6f5b8d0a = () => interopDefault(import('../pages/movie/_id.vue' /* webpackChunkName: "pages/movie/_id" */))
const _3564fd79 = () => interopDefault(import('../pages/video/_hash.vue' /* webpackChunkName: "pages/video/_hash" */))
const _61959c72 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/forgotpassword",
    component: _c8958564,
    name: "forgotpassword"
  }, {
    path: "/home",
    component: _08b044ef,
    name: "home"
  }, {
    path: "/login",
    component: _2b3d3f89,
    name: "login"
  }, {
    path: "/reset",
    component: _0a580a6f,
    name: "reset"
  }, {
    path: "/signup",
    component: _ee76c2b0,
    name: "signup"
  }, {
    path: "/signupd",
    component: _dab11228,
    name: "signupd"
  }, {
    path: "/trash",
    component: _4f4a7850,
    name: "trash"
  }, {
    path: "/verify",
    component: _69a31d89,
    name: "verify"
  }, {
    path: "/movie/:id?",
    component: _6f5b8d0a,
    name: "movie-id"
  }, {
    path: "/video/:hash?",
    component: _3564fd79,
    name: "video-hash"
  }, {
    path: "/",
    component: _61959c72,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
