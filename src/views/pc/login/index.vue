<template>
  <div>
    <!-- 顶栏部分 -->
    <el-header style="background: #333; color: white; padding: 10px 20px; min-height: 4vh; display: flex; align-items: center;">
      <el-image
        style="height: 100%; display: inline-block; margin-right: 10px;"
        :src="logoSrc"
        fit="fit">
      </el-image>
      <h2 style="margin: 0; font-weight: bold; text-align: left;">优秀学子回访母校报名系统</h2>
    </el-header>

    <!-- 主体部分，背景渐变色 -->
    <div style="background: linear-gradient(to right, #D32F2F, #F59600); height: 100vh; display: flex; justify-content: center; align-items: center;">
      <!-- 登录框所在容器 -->
      <div style="width: 60vh; background-color: white; padding: 3vh; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; font-weight: bold; margin-bottom: 1vh;">登录</h2>

        <!-- 表单部分 -->
        <el-form :model="form" label-width="5.5vh">
          <!-- 学号输入框 -->
          <el-form-item style="width: 95%;" label="学号" :rules="[{ pattern: stuPattern, message: '学号格式不正确' }]">
            <el-input
              maxlength="12"
              v-model="form.username"
              placeholder="请输入学号，未注册用户请先注册"
            ></el-input>
          </el-form-item>

          <!-- 密码输入框 -->
          <el-form-item style="width: 95%;" label="密码" :rules="[{ pattern: pwdPattern, message: '密码格式不正确' }]">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码，队员账号默认Hnsd+学号"
              @keyup.enter.native="handleLogin"
            ></el-input>
          </el-form-item>
        </el-form>

        <!-- 登录按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="16">
            <el-button
              type="danger"
              @click="handleLogin"
              size="large"
              style="background: linear-gradient(to right, #D32F2F, #F59600);"
              round
            >
              登    录
            </el-button>
          </el-col>
        </el-row>

        <!-- 注册提示 -->
        <div style="text-align: center; margin-top: 20px;">
          没有账号，<router-link to="/pc/register" style="color: #A4D3E2;">点击注册</router-link> |
          <router-link to="/mob/forgetPwd" style="color: #A4D3E2;">忘记密码</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant' // 如果你仍然需要使用 Vant 进行弹窗提示
import { acLogin } from '@/api/getInf'

export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      stuPattern: /^2\d{11}$/, // 学号格式正则
      pwdPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 密码格式正则
      logoSrc: require('@/assets/logoW.png')
    }
  },
  methods: {
    async handleLogin () {
      try {
        // 校验学号和密码格式
        if (!this.stuPattern.test(this.form.username) || !this.pwdPattern.test(this.form.password)) {
          Toast('学号或密码格式错误，学号为12位，密码不小于8位')
          return
        }
        // 调用 API 进行登录
        const res = await acLogin(this.form.username, this.form.password)
        this.$store.commit('account/setUserInfo', res.data) // 存储用户信息到 Vuex
        Toast('登录成功')
        this.$router.push('/pc/') // 登录成功后跳转到PC端首页
      } catch (error) {
        console.error('请求错误:', error || '未知错误')
      }
    }
  }
}
</script>

<style scoped>
/* 顶栏样式 */
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

/* 登录框容器样式 */
.el-form {
  padding: 20px;
}

.el-button {
  width: 100%;
}

</style>
