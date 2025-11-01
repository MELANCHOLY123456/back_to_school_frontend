<template>
  <div class="change-password">
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group class="commBox">
      <!-- 旧密码 -->
      <van-field
        v-model="oldPassword"
        label="旧密码"
        placeholder="输入旧密码"
        clearable
        type="password"
        :error-message="oldPasswordErrorMessage"
      />

      <!-- 新密码 -->
      <van-field
        v-model="newPassword"
        label="新密码"
        placeholder="输入新密码"
        clearable
        type="password"
        :error-message="passwordErrorMessage"
        @input="checkPasswordStrength"
      />
      <!-- 密码强度提示 -->
      <div class="password-strength">{{ passwordStrength }}</div>

      <!-- 确认新密码 -->
      <van-field
        v-model="confirmPassword"
        label="确认新密码"
        placeholder="确认新密码"
        clearable
        type="password"
        :error-message="confirmPasswordErrorMessage"
      />
    </van-cell-group>

    <!-- 提交按钮 -->
    <van-button
      type="info"
      round
      class="commonBtn"
      @click="submitPasswordChange"
      :loading="loading"
    >
      确认
    </van-button>
  </div>
</template>

<script>
import { modifyPwd } from '@/api/getInf'
import { removeInfo } from '@/utils/storage'
import { Toast } from 'vant'

export default {
  name: 'mModifyPwd',
  data () {
    return {
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      confirmPassword: '', // 确认新密码
      loading: false, // 控制按钮加载状态
      passwordStrength: '' // 密码强度提示
    }
  },
  computed: {
    // 提示旧密码格式错误信息
    oldPasswordErrorMessage () {
      if (!this.oldPassword) {
        return '请输入旧密码'
      }
      return ''
    },
    // 提示新密码格式错误信息
    passwordErrorMessage () {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (this.newPassword && !pattern.test(this.newPassword)) {
        return '密码需包含数字、大写和小写字母，且至少8位'
      }
      return ''
    },
    // 提示确认密码格式错误信息
    confirmPasswordErrorMessage () {
      if (this.confirmPassword && this.confirmPassword !== this.newPassword) {
        return '两次输入的密码不一致'
      }
      return ''
    }
  },
  methods: {
    // 检查密码强度
    checkPasswordStrength () {
      const length = this.newPassword.length
      if (length >= 8 && length <= 12) {
        this.passwordStrength = '密码强度：弱'
      } else if (length > 12 && length <= 16) {
        this.passwordStrength = '密码强度：中'
      } else if (length > 16) {
        this.passwordStrength = '密码强度：强'
      } else {
        this.passwordStrength = ''
      }
    },

    // 提交密码更改请求
    async submitPasswordChange () {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!pattern.test(this.newPassword)) {
        Toast.fail('请检查新密码格式')
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        Toast.fail('两次输入的密码不一致')
        return
      }

      this.loading = true
      const res = await modifyPwd(this.oldPassword, this.newPassword)
      if (res && res.status === 200) {
        Toast.success('密码修改成功')
        removeInfo()
        this.$router.push('/mob/login')
        return
      }
      // else Toast.fail('密码修改失败,可能是旧密码输入错误或登录信息失效')

      this.loading = false
    },
    onClickLeft () {
      this.$router.push('/mob/information/')
    }
  }
}
</script>

<style scoped>
.change-password {
  max-width: 100%;
  margin: auto;
  padding: 20px;
}

.password-strength {
  color: #888;
  font-size: 14px;
  margin-top: 1px;
  margin-bottom: 16px;
}

.submit-button {
  margin-top: 16px;
}
</style>
