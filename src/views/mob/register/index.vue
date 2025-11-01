<template>
  <div style="margin: 0 10px; min-height: 100vh;">
    <h2 style="text-align: left; padding-top: 5vh;">账号注册</h2>
    <van-form>
      <van-cell-group style="text-align: left; margin: 5vh 0;" inset>
        <van-cell>
          <van-field autofocus v-model="registerForm.user" name="学号" label="学号" type="digit" placeholder="请输入学号"
            @blur="trimText('user')" :rules="[{ pattern: stuIDPattern, message: '学号格式错误' }]">
          </van-field>

          <van-field v-model="registerForm.password" type="password" name="密码" label="密码" placeholder="请输入密码"
            @blur="trimText('password')" :rules="[{ pattern: pwdPattern, message: '密码不小于8位，包括数字、字母大小写' }]">
          </van-field>

          <van-field v-model="registerForm.confirmPassword" type="password" name="确认密码" label="确认密码" placeholder="请确认密码"
            @blur="trimText('confirmPassword')" :rules="[{ validator: verifySePwd, message: '两次密码输入不同' }]">
          </van-field>

          <van-field v-model="registerForm.picCode" name="验证码" label="验证码" placeholder="请输入验证码"
            @blur="trimText('picCode'); upperText('picCode')" :rules="[{ required: true, message: '验证码格式错误' }]">
            <template #extra>
              <van-image style="width: 30%; height: 40px;" :src="picSrc" @click="getPicCode" />
            </template>
          </van-field>
        </van-cell>
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button color="linear-gradient(to right, #D32F2F, #F59600)" round block :disabled="!canRegister"
          @click="handleRegister">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getPicCode, register } from '@/api/getInf'
import { Toast } from 'vant'

export default {
  name: 'mRegisterIndex',
  data () {
    return {
      registerForm: {
        user: '', // 学号
        password: '',
        confirmPassword: '',
        picCode: '',
        picToken: '',
        smsCode: '',
        smsToken: ''
      },
      second: 60,
      totalSecond: 60,
      timer: null,
      picSrc: '',
      stuIDPattern: /^2\d{11}$/, // 学号格式
      pwdPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 密码格式
      picCodePattern: /^[0-9a-zA-Z]{4}$/ // 图片验证码格式
    }
  },
  computed: {
    canRegister () {
      return (
        this.registerForm.user &&
        this.registerForm.password &&
        this.registerForm.confirmPassword &&
        this.registerForm.picCode
      )
    }
  },
  methods: {
    async getPicCode () {
      try {
        const res = await getPicCode()
        if (res && res.data.image) {
          this.picSrc = `data:image/png;base64,${res.data.image}`
          this.registerForm.picToken = res.data.token
          Toast('图片验证码已刷新')
        } else {
          Toast.fail('图片验证码加载失败')
        }
      } catch (error) {
        console.error('获取图片验证码时发生错误:', error)
        Toast.fail(`加载图片验证码时出错: ${error.response.data.message}`)
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
    async handleRegister () {
      if (this.verifyFn()) {
        const res = await register(this.registerForm)
        if (res && res.status === 200) {
          this.$store.commit('account/setUserInfo', res.data)
          Toast.success('注册成功')
          this.$router.push('/mob/main')
        }
      }
    },

    verifyFn () {
      if (this.registerForm.user && this.registerForm.password && this.registerForm.confirmPassword) {
        return true
      }
      Toast.fail('请填写完整的注册信息')
      return false
    }
  },
  created () {
    this.getPicCode()
  }
}
</script>

<style scoped>
/* 样式根据需要调整 */
</style>
