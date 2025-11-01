<template>
  <div class="change-email">
    <van-nav-bar
      title="修改邮箱"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group class="commBox">
      <!-- 图片验证码 -->
      <van-field
        v-model="picCode"
        label="图片验证码"
        placeholder="输入图片验证码"
        clearable
        @input="convertPicCodeToUpperCase"
      >
        <template #button>
          <van-image
            width="10vw"
            fit="contain"
            :src="picCodeImg"
            @click="getPicCode"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </template>
      </van-field>

      <!-- 新邮箱 -->
      <van-field
        v-model="email"
        label="新邮箱"
        placeholder="输入新邮箱"
        type="email"
        clearable
      />

      <!-- 新邮箱验证码 -->
      <van-field
        v-model="smsCode"
        label="新邮箱验证码"
        placeholder="输入新邮箱验证码"
        clearable
      >
        <template #button>
          <van-button
            size="small"
            type="info"
            :disabled="countdown > 0 || loading"
            @click="getSmsCode"
          >
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>

    <!-- 提交按钮 -->
    <van-button
      type="info"
      round
      class="commonBtn"
      :loading="loading"
      color="linear-gradient(to right, #4facfe, #00f2fe)"
      @click="submitEmailChange"
    >
      提交
    </van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getPicCode, getSmsCode, modifyEmail } from '@/api/getInf'

export default {
  name: 'mModifyEmail',
  data () {
    return {
      email: '',
      picCodeImg: '',
      picCode: '',
      picToken: '',
      smsCode: '',
      loading: false,
      countdown: 0,
      smsToken: ''
    }
  },
  mounted () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      try {
        const res = await getPicCode()
        if (res && res.data?.image) {
          this.picCodeImg = `data:image/png;base64,${res.data.image}`
          this.picToken = res.data.token
        }
      } catch (error) {
        Toast.fail('图片验证码获取失败，请稍后重试')
      }
    },
    async getSmsCode () {
      if (!this.email) {
        Toast.fail('请先输入新邮箱')
        return
      }
      if (this.countdown > 0) return

      this.loading = true
      const res = await getSmsCode(this.picCode, this.picToken, this.email)
      this.loading = false

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
    validateForm () {
      if (!this.email || !/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
        Toast.fail('请输入正确的邮箱地址')
        return false
      }
      if (!this.smsCode) {
        Toast.fail('请输入新邮箱验证码')
        return false
      }
      return true
    },
    async submitEmailChange () {
      if (!this.validateForm()) return

      this.loading = true
      const res = await modifyEmail(this.picCode, this.picToken, this.smsCode, this.smsToken, this.email)
      this.loading = false

      if (res && res.data?.message) {
        Toast.success(res.data.message)
        this.$router.push('/mob/information/')
      }
    },
    onClickLeft () {
      this.$router.push('/mob/information/')
    },

    // 处理图片验证码输入并自动转为大写
    convertPicCodeToUpperCase () {
      this.picCode = this.picCode.toUpperCase()
    }
  }
}
</script>

<style scoped>
.change-email {
  min-height: 100vh;
  margin: 0 0;
  padding: 20px;
}
</style>
