const INFO_KEY = 'cmts-user-info'
// 获取个人信息
export const getInfo = () => {
  const defaultObj = {
    token: '',
    user: ''
  }
  const rst = localStorage.getItem(INFO_KEY)
  console.log(rst)
  return rst ? JSON.parse(rst) : defaultObj
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
// 设置报名信息
const SIGNUP_KEY = 'cmts-signup-info'
const SELECT_KEY = 'cmts-select-info'
export const getSignupInfo = () => {
  const defaultObj = {
    name: '',
    gender: '',
    stuID: '',
    college: '',
    IDCardType: '',
    IDCardNum: '',
    nationality: '',
    major: '',
    QQNum: '',
    phone: '',
    politicalOptions: '',
    province: '',
    city: '',
    county: '',
    senior: '',
    isTeam: 0,
    isWillingToMerge: 0,
    teamMembers: [],
    memberCount: 0,
    teamSummary: '',
    avatar: '',
    activityStatus: '',
    editDate: ''
  }
  const rst = localStorage.getItem(SIGNUP_KEY)
  return rst ? JSON.parse(rst) : defaultObj
}
export const setSignupInfo = (obj) => {
  localStorage.setItem(SIGNUP_KEY, JSON.stringify(obj))
}
export const removeSignupInfo = () => {
  localStorage.removeItem(SIGNUP_KEY)
}
// 设置选项
export const getSelectorInfo = () => {
  const defaultObj = {
    genderOptions: [],
    collegeOptions: [],
    nationlityOptions: [],
    IdcardTypeOptions: [],
    politicalOptions: []
  }
  const rst = localStorage.getItem(SELECT_KEY)
  return rst ? JSON.parse(rst) : defaultObj
}
export const setSelectorInfo = (obj) => {
  localStorage.setItem(SELECT_KEY, JSON.stringify(obj))
}
export const removeSelectorInfo = () => {
  localStorage.removeItem(SELECT_KEY)
}
