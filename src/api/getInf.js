import request from '@/utils/request'
import store from '@/store'
import { getMD5 } from '@/utils/md5'

export const getSelfInf = async () => {
  const res = await request({
    url: '/signup/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
  return res.data
}

// 登录
export const acLogin = async (user, password) => {
  password = getMD5(password)
  return await request({
    url: '/auth/login/',
    method: 'post',
    data: {
      user: user,
      password: password
    }
  })
}

export const register = async (register) => {
  register.password = getMD5(register.password)
  return await request.post('/register/',

    // 如果要直接传递对象属性而不嵌套在一个字段下，
    // 可以直接将该对象作为 data 参数传递
    register
  )
}

export const submitForm = async (form) => {
  return await request({
    url: '/submitSignupInf/',
    method: 'post',
    data: {
      form: form,
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      }
    }
  })
}

// 获取图片验证码
export const getPicCode = async () => {
  return await request({
    url: '/captcha/picCode/',
    method: 'get'
  })
}

// 获取邮箱验证码
export const getSmsCode = async (piccode, picToken, email) => {
  return await request({
    url: '/captcha/smsCode/',
    method: 'get',
    params: {
      picCode: piccode,
      picToken: picToken,
      email: email
    }
  })
}

export const getSignupPdf = async (form) => {
  const response = await request({
    url: '/signup/getSignupPdf/',
    method: 'post',
    responseType: 'blob', // 处理为二进制流
    data: {
      form: form,
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      }
    }
  })

  const blob = new Blob([response.data], { type: 'application/zip' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)

  // 获取当前日期和时间
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  // 格式化为 20241109164406 格式
  const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`

  // 设置下载链接的文件名
  link.download = `报名表-${formattedDateTime}.zip`
  link.click()
}

// 获取绑定的邮箱
export const getBindEmail = async () => {
  return await request({
    url: '/auth/getBindEmail/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

export const getCardSummary = async () => {
  return await request({
    url: '/admin/cardsummary/',
    method: 'get'
  })
}

export const getChartData = async () => {
  return await request({
    url: '/admin/get/chartdata/',
    method: 'get'
  })
}

export const getStatisticalDataTable = async () => {
  const res = await request({
    url: '/admin/get/statisticalDataTable/',
    method: 'post',
    responseType: 'blob',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
  const blobS = new Blob([res.data], { type: 'application/zip' })
  const linkS = document.createElement('a')
  linkS.href = URL.createObjectURL(blobS)

  // 获取当前日期和时间
  const now = new Date()
  const yearS = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const formattedDateTime = `${yearS}${month}${day}${hours}${minutes}${seconds}`

  // 设置下载链接的文件名
  linkS.download = `数据统计表-${formattedDateTime}.zip`
  linkS.click()
}

export const getIsSignuped = async () => {
  return await request({
    url: '/signup/get/issignuped/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

export const getIsRealName = async () => {
  return await request({
    url: '/signup/get/isrealname/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

export const realName = async (realnameRes) => {
  return await request({
    url: '/realname/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      realnameRes
    }
  })
}

// 系统基本设置属性
export const getProps = async () => {
  return await request({
    url: '/system/get/props/',
    method: 'get'
  })
}

export const setProps = async (props) => {
  return await request({
    url: '/set/props/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      props: props
    }
  })
}

// 重置报名
export const reset = async () => {
  return await request({
    url: '/reset/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 设置选项
export const updateSelectorItem = async (key, oldV, newV, op) => {
  return await request({
    url: '/update/selectorItem/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      updateBody: {
        key: key,
        oldV: oldV,
        newV: newV,
        op: op
      }
    }
  })
}

// 获取管理员表
export const getAdminAccount = async () => {
  return await request({
    url: '/admin/get/adminAccount/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}
// 更改管理员权限
export const updateAdminAccount = async (user, authority1, authority2) => {
  return await request({
    url: '/update/adminAccount/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      adminAccountRes: {
        user: user,
        authority1: authority1,
        authority2: authority2
      }
    }
  })
}
// 获取账号表
export const getAccount = async () => {
  return await request({
    url: '/admin/get/accountInfo/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 队长撤销报名
export const withdrawSignup = async () => {
  return await request({
    url: '/delete/teamTable/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 账号页面的相关操作
export const updateAccountInfo = async (user, resetTeam, resetPwd, resetEmail) => {
  return await request({
    url: '/update/accountInfo/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      accountInfo: {
        user: user,
        resetTeam: resetTeam,
        resetPwd: resetPwd,
        resetEmail: resetEmail
      }
    }
  })
}

// 获取报名信息表
export const getSignupData = async (year) => {
  return await request({
    url: `/signup/get/signupInfo/${year}`,
    method: 'post',
    timeout: 0, // 设置为0表示不设置超时限制，直到请求完成
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 下载报名信息表
export const getSignupDataTable = async (year, college, isHavingMemberID, isMemberIDTiled, isSplitByProvince) => {
  const res = await request({
    url: '/signup/get/signupInfoTable/',
    method: 'post',
    responseType: 'blob',
    timeout: 0, // 设置为0表示不设置超时限制，直到请求完成
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      downloadRes: {
        year: year,
        college: college,
        isHavingMemberID: isHavingMemberID,
        isMemberIDTiled: isMemberIDTiled,
        isSplitByProvince: isSplitByProvince
      }
    }
  })

  const blobALL = new Blob([res.data], { type: 'application/zip' })
  const linkAll = document.createElement('a')
  linkAll.href = URL.createObjectURL(blobALL)

  // 获取当前日期和时间
  const now = new Date()
  const yearALL = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const formattedDateTime = `${yearALL}${month}${day}${hours}${minutes}${seconds}`

  // 设置下载链接的文件名
  linkAll.download = `报名统计表-${formattedDateTime}.zip`
  linkAll.click()
}

// 获取权限等级
export const getAu = async () => {
  return await request({
    url: '/auth/get/authority/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 获取已报名队伍信息
export const getTeamInfo = async () => {
  return await request({
    url: '/signup/get/teamInfo/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

export const getStanding = async () => {
  return await request({
    url: '/signup/get/standing/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 修改密码
export const modifyPwd = async (lastPwd, newPwd) => {
  lastPwd = getMD5(lastPwd)
  newPwd = getMD5(newPwd)
  return await request({
    url: '/auth/modify/pwd/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      modifyPwdRes: {
        lastPwd: lastPwd,
        newPwd: newPwd
      }
    }
  })
}

export const getIsBindEmail = async () => {
  return await request({
    url: '/auth/get/isBindEmail/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

// 修改邮箱
export const modifyEmail = async (picCode, picToken, smsCode, smsToken, email) => {
  return await request({
    url: '/auth/modify/email/',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      modifyEmailRes: {
        piccode: picCode,
        pictoken: picToken,
        smscode: smsCode,
        smstoken: smsToken,
        email: email
      }

    }
  })
}

export const verifyForgetPassword = async (user, piccode, pictoken, smscode, smstoken, email, password) => {
  password = getMD5(password)
  return await request({
    url: '/forget/pwd/',
    method: 'post',
    data: {
      user: user,
      piccode: piccode,
      pictoken: pictoken,
      smscode: smscode,
      smstoken: smstoken,
      email: email,
      password: password
    }
  })
}

export const resetSignupForm = async () => {
  return await request({
    url: '/reset/signupForm/',
    method: 'post',
    data: {
      user: store.getters.user,
      token: store.getters.token
    }
  })
}

export const changeSSToCheck = async (data) => {
  return await request({
    url: '/change/signupStatus/toCheck',
    method: 'post',
    data: {
      tokenRes: {
        user: store.getters.user,
        token: store.getters.token
      },
      changeStatusRes: {
        data: data
      }
    }
  })
}
