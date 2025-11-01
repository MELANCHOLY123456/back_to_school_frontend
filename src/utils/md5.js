import CryptoJS from 'crypto-js'

export const getMD5 = (password) => {
  // 对密码进行 MD5 加密 3 次
  let encryptedPassword = CryptoJS.MD5(password).toString()
  encryptedPassword = CryptoJS.MD5(encryptedPassword).toString()
  encryptedPassword = CryptoJS.MD5(encryptedPassword).toString()

  return encryptedPassword
}
