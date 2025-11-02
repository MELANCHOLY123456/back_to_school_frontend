<template>
  <div style="height: 100vh; padding: 3vh;"> <!-- 设置左右边距 -->
    <div style="margin: 0 10px; padding-top: 30px;">
      <van-image fit="fill" width="60vw" :src="logoSrc" style="max-width: 360px;"></van-image>
      <div class="text-medium" style="text-align: left; margin-top: 0.5vh; letter-spacing: 0.5vw;">
        优秀学子回访母校报名系统
      </div>
    </div>
    <!-- 学号输入框上面加40px间距 -->
    <van-form>
      <van-cell-group style="margin: 5vh 0;" inset>
        <van-cell>
          <van-field v-model="username" label="学号" name="学号" type="digit" maxlength="12" placeholder="未注册用户请先注册"
            :rules="[{ pattern: stuPattern, message: '学号格式不正确' }]" ></van-field>

          <van-field v-model="password" label="密码" name="密码" type="password" placeholder="请输入密码，队员账号默认Hnsd+学号"
            @keyup.enter="handleLogin"
            :rules="[{ pattern: pwdPattern, message: '密码格式不正确' }]"></van-field>
        </van-cell>
      </van-cell-group>
    </van-form>

    <!-- 登录和注册拼成一个胶囊按钮 -->
    <div style="margin-top: 30px; display: flex; justify-content: center;" class="commonBtn">
      <van-button style="width: 50%; border-radius: 20px 0 0 20px; font-size: 14px; background: #E0E0E0; color: #000;"
        @click="goToRegister" plain>
        注册
      </van-button>
      <van-button
        style="width: 50%; border-radius: 0 20px 20px 0; font-size: 14px; background: linear-gradient(to right, #D32F2F, #F59600); color: white;"
        @click="handleLogin">
        登录
      </van-button>
    </div>
    <!-- 注册提示居中 -->
    <div style="text-align: center; height: 25vh;">
      <div style="margin-top: 2vh;"><router-link to="/mob/forgetPwd" style="color: #A4D3E2;">忘记密码？</router-link></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { acLogin } from '@/api/getInf'

export default {
  name: 'mLoginIndex',
  data () {
    return {
      username: '',
      password: '',
      stuPattern: /^2\d{11}$/, // 学号格式正则
      pwdPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 密码格式正则
      logoSrc: require('@/assets/logoChiB.png')
    }
  },
  methods: {
    // 登录处理
    async handleLogin () {
      try {
        if (!this.stuPattern.test(this.username) || !this.pwdPattern.test(this.password)) {
          Toast('学号或密码格式错误，学号为12位，密码不小于8位')
          return
        }
        const res = await acLogin(this.username, this.password)
        this.$store.commit('account/setUserInfo', res.data)
        Toast('登录成功')
        // 确保登录后跳转到移动端主页
        this.$router.push('/mob/main')
      } catch (error) {
        console.error('请求错误:', error || '未知错误')
      }
    },
    // 跳转到注册页面
    goToRegister () {
      this.$router.push('/mob/register')
    }
  }
}
</script>

<style>
/* 可以在这里添加其他样式 */
</style>
