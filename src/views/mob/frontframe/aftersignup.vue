<template>
    <div class="signup-after-page">
      <!-- 页面中心内容 -->
      <div class="container">
        <!-- 完成图像 -->
        <img class="completion-image" :src="require('@/assets/mMainBtn1 copy.gif')" alt="完成" />

        <!-- 倒计时和按钮 -->
        <div v-if="countdown > 0">
          <p class="countdown-text">倒计时：{{ countdown }}秒</p>
        </div>
        <div v-else>
          <van-button type="primary" block @click="navigateToReview">复核报名信息</van-button>
        </div>
      </div>

      <!-- 页面底部的返回主页按钮 -->
      <van-button type="info" block @click="navigateToHome">返回主页</van-button>
    </div>
  </template>

<script>
export default {
  name: 'mSignupAfter',
  data () {
    return {
      countdown: 5, // 倒计时时间
      countdownTimer: null // 倒计时定时器
    }
  },
  created () {
    this.startCountdown() // 创建页面时开始倒计时
  },
  beforeDestroy () {
    // 在页面销毁时清除定时器，避免内存泄漏
    clearInterval(this.countdownTimer)
  },
  methods: {
    // 倒计时逻辑
    startCountdown () {
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown-- // 每秒减 1
        } else {
          clearInterval(this.countdownTimer) // 倒计时结束后清除定时器
        }
      }, 1000)
    },
    // 跳转到复核报名信息页面
    navigateToReview () {
      this.$router.push('/mob/f/check')
    },
    // 跳转到主页
    navigateToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.signup-after-page {
background: #F7F8FA;  /* 背景色 */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
}

/* 中心容器 */
.container {
text-align: center;
margin-top: 20px;
}

/* 完成图像样式 */
.completion-image {
width: 150px;
height: 150px;
margin-bottom: 30px;
}

/* 倒计时文本样式 */
.countdown-text {
font-size: 20px;
color: #333;
margin-bottom: 20px;
}

/* 底部按钮样式 */
.van-button {
margin-top: 20px;
}
</style>
