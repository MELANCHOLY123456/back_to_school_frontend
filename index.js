import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
// import Login from '@/views/pc/login'
// import Register from '@/views/pc/register'
// import InformationFrame from '@/views/pc/informationframe'
// import FrontFrame from '@/views/pc/frontframe'
// import BackFrame from '@/views/pc/backframe'
// import BackFrameMain from '@/views/pc/backframe/main'
// import BackFrameAdmin from '@/views/pc/backframe/admin'
// import BackFrameSignupInf from '@/views/pc/backframe/signupInf'
// import BackSetting from '@/views/pc/backframe/setting'
// import BackAccount from '@/views/pc/backframe/account'
// import BackFunction from '@/views/pc/backframe/function'
// import BackHeadOfCollege from '@/views/pc/backframe/headofcollege'

// import mLogin from '@/views/mob/login'
// import mRegister from '@/views/mob/register'
// import mInformationFrame from '@/views/mob/informationframe'
// import mMofifyEmail from '@/views/mob/informationframe/modifyemail.vue'
// import mMofdifyPwd from '@/views/mob/informationframe/modifypwd.vue'
// import mFrontFrame from '@/views/mob/frontframe'
// import mFrontFrameMain from '@/views/mob/frontframe/main'
// import mFrontFrameContentFrame from '@/views/mob/frontframe/contentframe'
// import mFrontFrameCheck from '@/views/mob/frontframe/check'
// import mFrontFrameChangeTeam from '@/views/mob/frontframe/changeteam'
// import mFrontFrameSignUp from '@/views/mob/frontframe/signup'
// import mFrontFrameBeforeSignup from '@/views/mob/frontframe/beforesignup'
// import mFrontFrameAfterSignup from '@/views/mob/frontframe/aftersignup'

// import mBackFrame from '@/views/mob/backframe'

Vue.use(VueRouter)

// 统一的设备检测函数：优先使用 User-Agent，再用窗口宽度作为退路
// const isMobileDevice = () => {
//   try {
//     const ua = window && window.navigator && window.navigator.userAgent
//     const mobileRe = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
//     return mobileRe.test(ua) || (window && window.innerWidth <= 768)
//   } catch (e) {
//     return false
//   }
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/mob/main' },
    { path: '/pc/login', component: () => import('@/views/pc/login') },
    { path: '/pc/register', component: () => import('@/views/pc/register') },
    { path: '/pc/inf', component: () => import('@/views/pc/informationframe') },
    { path: '/pc/', redirect: '/mob/main' },
    { path: '/pc/main', component: () => import('@/views/pc/frontframe') },
    {
      path: '/pc/back',
      component: () => import('@/views/pc/backframe'),
      redirect: '/pc/back/main',
      children: [
        { path: 'main', component: () => import('@/views/pc/backframe/main') },
        { path: 'admin', component: () => import('@/views/pc/backframe/admin') },
        { path: 'signupinf', component: () => import('@/views/pc/backframe/signupInf') },
        { path: 'setting', component: () => import('@/views/pc/backframe/setting') },
        { path: 'account', component: () => import('@/views/pc/backframe/account') },
        { path: 'function', component: () => import('@/views/pc/backframe/function') },
        { path: 'headofcollege', component: () => import('@/views/pc/backframe/headofcollege') }
      ]
    },
    { path: '/mob/login', component: () => import('@/views/mob/login') },
    { path: '/mob/forgetpwd', component: () => import('@/views/mob/login/forgetpwd.vue') },
    { path: '/mob/register', component: () => import('@/views/mob/register') },
    { path: '/mob/information', component: () => import('@/views/mob/informationframe') },
    {
      path: '/mob/',
      name: 'mFrontFrame',
      component: () => import('@/views/mob/frontframe'),
      redirect: '/mob/main',
      children: [
        { path: 'main', component: () => import('@/views/mob/frontframe/main') }
      ]
    },
    {
      path: '/mob/f',
      component: () => import('@/views/mob/frontframe/contentframe'),
      children: [
        { path: 'signup', component: () => import('@/views/mob/frontframe/signup') },
        { path: 'check', component: () => import('@/views/mob/frontframe/check') },
        { path: 'changeteam', component: () => import('@/views/mob/frontframe/changeteam') },
        { path: 'before', component: () => import('@/views/mob/frontframe/beforesignup') }
      ]
    },
    { path: '/mob/after', component: () => import('@/views/mob/frontframe/aftersignup') },
    { path: '/mob/back', component: () => import('@/views/mob/backframe') },
    { path: '/mob/information', component: () => import('@/views/mob/informationframe') },
    { path: '/mob/modifyemail', component: () => import('@/views/mob/informationframe/modifyemail') },
    { path: '/mob/modifypwd', component: () => import('@/views/mob/informationframe/modifypwd') }
  ]
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     { path: '/', redirect: '/pc/' },

//     { path: '/pc/login', component: Login },
//     { path: '/pc/register', component: Register },
//     { path: '/pc/inf', component: InformationFrame },
//     { path: '/pc/', redirect: '/mob/main', component: FrontFrame },
//     {
//       path: '/pc/back',
//       component: BackFrame,
//       redirect: '/pc/back/main',
//       children: [
//         { path: '/pc/back/main', component: BackFrameMain },
//         { path: '/pc/back/admin', component: BackFrameAdmin },
//         { path: '/pc/back/signupinf', component: BackFrameSignupInf },
//         { path: '/pc/back/setting', component: BackSetting },
//         { path: '/pc/back/account', component: BackAccount },
//         { path: '/pc/back/function', component: BackFunction },
//         { path: '/pc/back/headofcollege', component: BackHeadOfCollege }
//       ]
//     },

//     { path: '/mob/login', component: mLogin },
//     { path: '/mob/register', component: mRegister },
//     { path: '/mob/information', component: mInformationFrame },
//     {
//       path: '/mob/',
//       name: 'mFrontFrame',
//       component: mFrontFrame,
//       redirect: '/mob/main',
//       children: [
//         { path: 'main', component: mFrontFrameMain } // 使用相对路径
//       ]
//     },
//     {
//       path: '/mob/f',
//       component: mFrontFrameContentFrame,
//       children: [
//         { path: 'signup', component: mFrontFrameSignUp }, // 使用相对路径
//         { path: 'check', component: mFrontFrameCheck }, // 使用相对路径
//         { path: 'changeteam', component: mFrontFrameChangeTeam }, // 使用相对路径
//         { path: 'before', component: mFrontFrameBeforeSignup }
//       ]
//     },
//     { path: '/mob/after', component: mFrontFrameAfterSignup },
//     { path: '/mob/back', component: mBackFrame },
//     { path: '/mob/information', component: mInformationFrame },
//     { path: '/mob/modifyemail', component: mMofifyEmail },
//     { path: '/mob/modifypwd', component: mMofdifyPwd }
//   ]
// })

const unAutherUrls = ['/mob/login', '/mob/forgetpwd', '/mob/register', '/pc/login', '/pc/register']
// const unAutherUrls = []
// 注意参数的顺序 所有路由在被解析之前，都会进过全局前置守卫，守卫放行，才能到对应的页面
// 1. to 往哪里去， 到哪去的路由信息对象（路径、参数）
// 2. from 从哪里来， 从哪来的路由信息对象（路径、参数）
// 3. next() 是否放行
//  a.next() 直接放行
//  b.next(路径) 拦截到配置的路径
router.beforeEach((to, from, next) => {
  // path不带查询参数，fullpath带查询参数
  if (unAutherUrls.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  console.log('卫士：')
  console.log(token)

  // token不存在，拦截到登录页
  if (token === '' || token === undefined) {
    // 不管在移动端还是PC端访问，都重定向到移动端登录页
    const loginPath = '/mob/login'

    // 避免无限重定向循环
    if (to.path === loginPath) {
      next()
    } else {
      next(loginPath)
    }
  } else {
    // 简化/main页面的访问限制，只限制未授权访问
    // 修复 /main 路径跳转问题，根据设备类型跳转到对应的 main 页面

    if (to.path === '/main') {
      next('/mob/main')
    // eslint-disable-next-line brace-style
    }

    // 避免循环重定向
    else if (to.path === '/pc/main' || to.path === '/mob/main' || to.path === '/pc/' || to.path === '/mob/') {
      next()
    } else {
      next() // 其他路径正常跳转
    }
  }
})

export default router
