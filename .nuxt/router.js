import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b5488ab0 = () => interopDefault(import('../pages/error.vue' /* webpackChunkName: "pages/error" */))
const _c8958564 = () => interopDefault(import('../pages/forgotpassword.vue' /* webpackChunkName: "pages/forgotpassword" */))
const _08b044ef = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _2b3d3f89 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _ed088bcc = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _0a580a6f = () => interopDefault(import('../pages/reset.vue' /* webpackChunkName: "pages/reset" */))
const _64416276 = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _ee76c2b0 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _69a31d89 = () => interopDefault(import('../pages/verify.vue' /* webpackChunkName: "pages/verify" */))
const _2c75c875 = () => interopDefault(import('../pages/settings/update_password.vue' /* webpackChunkName: "pages/settings/update_password" */))
const _6f5b8d0a = () => interopDefault(import('../pages/movie/_id.vue' /* webpackChunkName: "pages/movie/_id" */))
const _08d239c0 = () => interopDefault(import('../pages/profile/_login.vue' /* webpackChunkName: "pages/profile/_login" */))
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
    path: "/error",
    component: _b5488ab0,
    name: "error"
  }, {
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
    path: "/logout",
    component: _ed088bcc,
    name: "logout"
  }, {
    path: "/reset",
    component: _0a580a6f,
    name: "reset"
  }, {
    path: "/settings",
    component: _64416276,
    name: "settings"
  }, {
    path: "/signup",
    component: _ee76c2b0,
    name: "signup"
  }, {
    path: "/verify",
    component: _69a31d89,
    name: "verify"
  }, {
    path: "/settings/update_password",
    component: _2c75c875,
    name: "settings-update_password"
  }, {
    path: "/movie/:id?",
    component: _6f5b8d0a,
    name: "movie-id"
  }, {
    path: "/profile/:login?",
    component: _08d239c0,
    name: "profile-login"
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
