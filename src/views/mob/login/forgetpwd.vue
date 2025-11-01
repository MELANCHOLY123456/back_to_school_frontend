<template>
  <div class="forget-password">
    <van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" />
    <van-form>
      <van-cell-group class="commBox">
        <!-- 学号 -->
        <van-field v-model="stuID" type="digit" label="学号" placeholder="请输入学号" clearable @blur="handleBlur('stuID')"
        maxlength="12"
        :rules="[ { validator: validateStuID, message: '学号必须为12位数字' }]" />

        <!-- 图片验证码 -->
        <van-field v-model="picCode" label="图片验证码" placeholder="输入图片验证码" clearable maxlength="4" @blur="handleBlur('picCode')">
          <template #button>
            <van-image width="10vw" fit="contain" :src="picCodeImg" @click="getPicCode">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </template>
        </van-field>

        <!-- 绑定邮箱 -->
        <van-field v-model="email" label="绑定邮箱" placeholder="请输入绑定邮箱" type="email" clearable @blur="handleBlur('email')"
          :rules="[ { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '请输入有效的邮箱地址' }]" />

        <!-- 邮箱验证码 -->
        <van-field v-model="smsCode" label="邮箱验证码" type="digit" placeholder="请输入邮箱验证码" clearable @blur="handleBlur('smsCode')"
          :rules="[ { pattern: /^[0-9]{6}$/, message: '验证码必须为6位数字' }]" >
          <template #button>
            <van-button size="small" type="info" :disabled="countdown > 0 || loading || !isEmailValid" @click="getSmsCode">
              {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
            </van-button>
          </template>
        </van-field>

        <!-- 新密码 -->
        <van-field v-model="password" label="新密码" placeholder="请输入新密码" type="password" clearable @blur="handleBlur('password')"
          :rules="[ { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, message: '密码必须至少8位，包含大小写字母和数字' }]" />

        <!-- 确认新密码 -->
        <van-field v-model="passwordConfirm" label="确认新密码" placeholder="请再次输入新密码" type="password" clearable
          @blur="handleBlur('passwordConfirm')" :rules="[ { validator: validatePasswordConfirm, message: '两次密码输入不一致' }]" />
      </van-cell-group>
    </van-form>

    <van-button type="info" round class="commonBtn" :loading="loading"
      color="linear-gradient(to right, #4facfe, #00f2fe)" :disabled="!isFormValid" @click="submitForgetPassword">
      提交
    </van-button>
  </div>
</template>

<script>
import { getPicCode, getSmsCode, verifyForgetPassword } from '@/api/getInf'
import { Toast } from 'vant'

export default {
  name: 'mForgetPwd',
  data () {
    return {
      stuID: '',
      email: '',
      picCodeImg: '',
      picCode: '',
      picToken: '',
      smsCode: '',
      loading: false,
      countdown: 0,
      smsToken: '',
      password: '',
      passwordConfirm: ''
    }
  },
  mounted () {
    this.getPicCode()
  },
  computed: {
    // 邮箱验证
    isEmailValid () {
      return this.email && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.email)
    },
    // 表单是否有效
    isFormValid () {
      return this.isEmailValid &&
        this.stuID && this.validateStuID() &&
        this.picCode && this.picToken &&
        this.smsCode && /^[0-9]{6}$/.test(this.smsCode) &&
        this.password && this.passwordConfirm && this.validatePasswordConfirm()
    }
  },
  methods: {
    // 去空格
    trimInput (field) {
      if (this[field]) this[field] = this[field].trim()
    },

    // 转大写
    toUpper (field) {
      if (this[field]) this[field] = this[field].toUpperCase()
    },

    // 统一处理去空格和转大写
    handleBlur (field) {
      this.trimInput(field)
      if (field === 'picCode') {
        this.toUpper(field) // 图片验证码要转大写
      }
    },

    validateStuID () {
      const currentYear = new Date().getFullYear()
      if (/^[0-9]{12}$/.test(this.stuID)) {
        if (this.stuID && this.stuID.length === 12) {
          const year = parseInt(this.stuID.substring(0, 4), 10)
          return year <= currentYear
        }
      }
      return false
    },

    validatePasswordConfirm () {
      return this.passwordConfirm === this.password
    },

    async getPicCode () {
      const res = await getPicCode()
      if (res && res.data?.image) {
        this.picCodeImg = `data:image/png;base64,${res.data.image}`
        this.picToken = res.data.token
      }
    },

    async getSmsCode () {
      const res = await getSmsCode(this.picCode, this.picToken, this.email)
      if (res && res.data?.data?.token) {
        this.smsToken = res.data.data.token
        this.startCountdown(60)
      }
    },

    startCountdown (seconds) {
      this.countdown = seconds
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(timer)
        }
      }, 1000)
    },

    async submitForgetPassword () {
      const res = await verifyForgetPassword(
        this.stuID,
        this.picCode,
        this.picToken,
        this.smsCode,
        this.smsToken,
        this.email,
        this.password
      )
      if (res && res.data?.message) {
        Toast.success(res.data.message)
        this.$router.push('/mob/login/')
      }
    },

    onClickLeft () {
      this.$router.push('/mob/login/')
    }
  }
}
</script>

<style scoped>
.forget-password {
  min-height: 100vh;
  padding: 20px;
}
</style>
