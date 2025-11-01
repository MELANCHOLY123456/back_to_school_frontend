<template>
  <div class="containerOuter">
    <div class="containerLeft">
      <h1 style="font-size: 40px;">湖南师范大学 优秀学子回访母校报名</h1>
      <h2 style="font-size: 30px;">账号注册</h2>
    </div>
    <div style="margin: 0 10px;" class="container">
    <el-form :model="registerForm" label-width="100px">
      <el-form-item label="学号" :rules="[{ required: true, pattern: stuIDPattern, message: '学号格式错误'}]">
        <el-input
          autofocus="true"
          maxlength="12"
          v-model="registerForm.user"
          placeholder="请输入学号"
          @blur="trimText('user')">
        </el-input>
      </el-form-item>

      <el-form-item label="密码" :rules="[{ required: true,pattern: pwdPattern, message: '密码不小于8位，包括数字、字母大小写' }]">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="请输入密码，密码不小于8位，包括数字、字母大小写"
          @blur="trimText('password')">
        </el-input>
      </el-form-item>

      <el-form-item label="确认密码" :rules="[{ required: true,validator: verifySePwd, message: '两次密码输入不同' }]">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          placeholder="请确认密码"
          @blur="trimText('confirmPassword')">
        </el-input>
      </el-form-item>

      <el-form-item label="证件类型" :rules="[{ required: true, message: '请选择证件类型'}]">
        <el-select v-model="IDCardType" label="证件类型" @change="getIDCardType" style="width: 100%;">
          <el-option
            v-for="option in IDCardTypeOptions"
            :key="option"
            :label="option"
            :value="option">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号" :rules="[{ required: true,validator: verifyIDCardNum, message: '请填写正确的身份证号' }]">
        <el-input
          v-model="registerForm.IDCardNum"
          placeholder="请输入身份证号"
          @blur="trimText('IDCardNum'); upperText('IDCardNum')">
        </el-input>
      </el-form-item>

      <el-form-item label="邮箱" :rules="[{ required: true,pattern: emailPattern, message: '邮箱格式错误' }]">
        <el-input
          v-model="registerForm.email"
          placeholder="请输入邮箱"
          @blur="trimText('email')">
        </el-input>
      </el-form-item>

      <el-form-item label="图片验证码" :rules="[{ required: true, message: '图片验证码格式错误' }]">
        <div style="display: inline-block; width: 60%; margin-right: 10px;">
          <el-input
            v-model="registerForm.picCode"
            placeholder="请输入图片验证码"
            @blur="trimText('picCode'); upperText('picCode')">
          </el-input>
        </div>
        <div style="display: inline-block; width: 35%; vertical-align: top; cursor: pointer;">
          <el-image
            :src="picSrc"
            @click="getPicCode"
            style="width: 100%; height: 40px;">
          </el-image>
        </div>
      </el-form-item>

      <el-form-item label="验证码" :rules="[{ required: true, pattern: smsCodePattern, message: '请填写6位数字验证码' }]">
        <div style="display: inline-block; width: 60%; margin-right: 5px;">
          <el-input
            v-model="registerForm.smsCode"
            placeholder="请输入验证码"
            @blur="trimText('smsCode')">
          </el-input>
        </div>
        <div style="display: inline-block; width: 35%; vertical-align: top;">
          <el-button
            type="danger"
            plain
            :disabled="!canRequestCode || second !== totalSecond"
            @click="getSmsCode"
            style="width: 100%;">
            {{ second === totalSecond ? '获取验证码' : second + 's后重发' }}
          </el-button>
        </div>
      </el-form-item>

      <el-row>
        <el-col span="24">注意事项</el-col>
      </el-row>
      <el-row class="text-secondary text-small" style="margin-top: 1vh;">
        <el-col span="1">1.</el-col>
        <el-col span="12">港澳居民来往内地通行证样例格式为 M111111(1)</el-col>
      </el-row>
      <el-row class="text-secondary text-small" style="margin-top: 5px;">
        <el-col span="1">2.</el-col>
        <el-col span="12">台湾居民来往大陆通行证样例格式为 K111111111</el-col>
      </el-row>

      <div style="margin: 16px; height: 40vh">
        <el-button
          class = "commonBtn"
          style="margin-top: 2vh;"
          type="danger"
          round
          block
          :disabled="!canRegister"
          @click="handleRegister">
          注册
        </el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>

<script>
import { getPicCode, getSmsCode, register } from '@/api/getInf'
import { Message } from 'element-ui'

export default {
  name: 'mRegisterIndex',
  data () {
    return {
      registerForm: {
        user: '', // 学号
        password: '',
        confirmPassword: '',
        IDCardNum: '',
        email: '',
        picCode: '',
        picToken: '',
        smsCode: '',
        smsToken: ''
      },
      IDCardType: '中国大陆居民身份证',
      second: 60,
      totalSecond: 60,
      timer: null,
      picSrc: '',
      stuIDPattern: /^2\d{11}$/, // 学号格式
      pwdPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 密码格式
      emailPattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 邮箱格式
      smsCodePattern: /^\d{6}$/, // 短信验证码格式
      picCodePattern: /^[0-9a-zA-Z]{4}$/, // 图片验证码格式
      IDCardTypeOptions: ['中国大陆居民身份证', '港澳居民来往内地通行证（香港）', '港澳居民来往内地通行证（澳门）', '台湾居民来往大陆通行证']
    }
  },
  created () {
    this.getPicCode()
  },
  computed: {
    canRequestCode () {
      return (
        this.registerForm.user &&
        this.registerForm.password &&
        this.registerForm.confirmPassword &&
        this.registerForm.email &&
        this.registerForm.picCode
      )
    },
    canRegister () {
      return (
        this.registerForm.user &&
        this.registerForm.password &&
        this.registerForm.confirmPassword &&
        this.registerForm.email &&
        this.registerForm.picCode &&
        this.registerForm.smsCode
      )
    }
  },
  methods: {
    getIDCardType (val) {
      this.IDCardType = val
    },
    async getPicCode () {
      try {
        const res = await getPicCode()
        if (res && res.data.image) {
          this.picSrc = `data:image/png;base64,${res.data.image}`
          this.registerForm.picToken = res.data.token
          Message.success('图片验证码已刷新')
        } else {
          Message.error('图片验证码加载失败')
        }
      } catch (error) {
        console.error('获取图片验证码时发生错误:', error)
        Message.error(`加载图片验证码时出错: ${error.response.data.message}`)
      }
    },
    trimText (field) {
      if (this.registerForm[field]) this.registerForm[field] = this.registerForm[field].trim()
    },
    upperText (field) {
      if (this.registerForm[field]) this.registerForm[field] = this.registerForm[field].toUpperCase()
    },
    verifySePwd () {
      return this.registerForm.password === this.registerForm.confirmPassword
    },
    verifyIDCardNum (value) {
      const IDCardType = this.IDCardType

      // 校验中国大陆居民身份证
      if (IDCardType === '中国大陆居民身份证') {
        const reg = /^[1-9]\d{5}(18|19|20|21|22)\d{2}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}([0-9Xx])$/
        if (!reg.test(value)) {
          return false // 正则校验未通过
        }
        // 计算并验证校验码
        return this.checkIDChecksum(value)
      } else if (IDCardType === '港澳居民来往内地通行证（香港）' || IDCardType === '港澳居民来往内地通行证（澳门）') {
        // 校验港澳居民来往内地通行证（香港/澳门）
        return /^[A-Za-z0-9]{1,10}$/.test(value)
      } else if (IDCardType === '台湾居民来往大陆通行证') {
        // 校验台湾居民来往大陆通行证
        return /^[A-Za-z0-9]{1,12}$/.test(value)
      } else {
        return true
      }
    },
    checkIDChecksum (value) {
      const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      const checksumMap = {
        0: '1',
        1: '0',
        2: 'X',
        3: '9',
        4: '8',
        5: '7',
        6: '6',
        7: '5',
        8: '4',
        9: '3',
        10: '2'
      }
      const checkcode = value.substr(0, 17)
      let sum = 0
      for (let i = 0; i < 17; i++) {
        sum += parseInt(checkcode[i], 10) * factors[i]
      }
      const remainder = sum % 11
      const checkdigit = checksumMap[remainder]
      return checkdigit === value[17].toUpperCase()
    },
    async getSmsCode () {
      if (!this.timer && this.second === this.totalSecond) {
        try {
          const res = await getSmsCode(this.registerForm.picCode, this.registerForm.picToken, this.registerForm.email)
          if (res && res.data) {
            this.registerForm.smsToken = res.data.data.token
            Message.success('验证码已发送，请注意查收')
            this.startTimer()
          } else {
            Message.fail('网络错误，验证码获取失败')
          }
        } catch (error) {
          console.error('获取短信验证码时发生错误:', error)
          Message.fail(error.response.data.message || '网络错误')
        }
      }
    },
    startTimer () {
      this.timer = setInterval(() => {
        if (this.second > 0) {
          this.second--
        } else {
          this.second = this.totalSecond
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    async handleRegister () {
      if (this.verifyFn()) {
        try {
          const res = await register(this.registerForm)
          if (res && res.status === 200) {
            this.$store.commit('account/setUserInfo', res.data)
            Message.success('注册成功')
            this.$router.push('/mob/main')
          } else {
            Message.error(res.message)
          }
        } catch (error) {
          console.error('注册时发生错误:', error)
          Message.error(`注册失败，请重试: ${error.response.data.message}`)
        }
      }
    },
    verifyFn () {
      // 学号验证
      if (!this.registerForm.user) {
        Message.error('请填写学号')
        return false
      } else if (!this.stuIDPattern.test(this.registerForm.user)) {
        Message.error('学号格式错误')
        return false
      }

      // 密码验证
      if (!this.registerForm.password) {
        Message.error('请填写密码')
        return false
      } else if (!this.pwdPattern.test(this.registerForm.password)) {
        Message.error('密码不小于8位，包括数字、字母大小写')
        return false
      }

      // 确认密码验证
      if (!this.registerForm.confirmPassword) {
        Message.error('请确认密码')
        return false
      } else if (this.registerForm.password !== this.registerForm.confirmPassword) {
        Message.error('两次密码输入不同')
        return false
      }

      // 身份证号验证
      if (!this.registerForm.IDCardNum) {
        Message.error('请填写身份证号')
        return false
      } else if (!this.verifyIDCardNum(this.registerForm.IDCardNum)) {
        Message.error('身份证号格式错误')
        return false
      }

      // 邮箱验证
      if (!this.registerForm.email) {
        Message.error('请填写邮箱')
        return false
      } else if (!this.emailPattern.test(this.registerForm.email)) {
        Message.error('邮箱格式错误')
        return false
      }

      // 图片验证码验证
      if (!this.registerForm.picCode) {
        Message.error('请填写图片验证码')
        return false
      } else if (!this.picCodePattern.test(this.registerForm.picCode)) {
        Message.error('图片验证码格式错误')
        return false
      }

      // 短信验证码验证
      if (!this.registerForm.smsCode) {
        Message.error('请填写验证码')
        return false
      } else if (!this.smsCodePattern.test(this.registerForm.smsCode)) {
        Message.error('验证码格式错误')
        return false
      }

      // 如果所有字段都通过验证，返回 true
      return true
    }

  }
}
</script>

<style scoped>
.container{
  padding: 5vh 1vh;

  position: fixed;
  width: 70vh;
  height: 90vh;

  right: 15vh;
  bottom: 5vh;

  background: #f7f7f7;
  border-radius: 20px;

}

.containerOuter{
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #D32F2F, #F59600);
}

.containerLeft{
  color: #f7f7f7;
  position: fixed;
  left: 15vh;
  bottom: 50vh;
}

</style>
