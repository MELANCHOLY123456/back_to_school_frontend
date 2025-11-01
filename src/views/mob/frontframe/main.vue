<template>
  <div class="container commonBox">
    <transition-group name="slide-fade" tag="div">
      <div
        v-if="isLeader !== 2 && isInTimeRange(startTime, endTime)"
        class="commonBox pic-box-container"
        @click="firstNavigateTo()"
        key="1">
        <van-image
          loading-icon="报名入口"
          alt="报名入口"
          radius="10px"
          fit="contain"
          :src="require('@/assets/mMainBtn1.gif')"
          class="pic-box"
        >
        </van-image>
      </div>

      <div
        v-if="isLeader !== 2 && isSignuped === 1 && isInTimeRange(startTime, endTime)"
        class="commonBox pic-box-container"
        @click="navigateTo('/mob/f/check')"
        key="2">
        <van-image
          loading-icon="确认报名信息"
          alt="确认报名信息"
          radius="10px"
          fit="contain"
          :src="require('@/assets/mMainBtn2.gif')"
          class="pic-box"
        >
        <template v-slot:error>确认报名信息</template>
      </van-image>
      </div>

      <div
        v-if="isSignuped === 1"
        class="commonBox pic-box-container"
        @click="navigateTo('/mob/f/changeteam')"
        key="3">
        <van-image
          loading-icon="查看队伍信息"
          alt="查看队伍信息"
          radius="10px"
          fit="contain"
          :src="require('@/assets/mMainBtn3.gif')"
          class="pic-box"
        >
        <template v-slot:error>查看队伍信息</template>
      </van-image>

      </div>
    </transition-group>

    <!-- 如果没有任何一个div显示，输出提示信息 -->
    <el-empty v-if="!anyDivVisible" description="您没有在规定时间内报名"></el-empty>
  </div>
</template>

<script>
import { Notify, Toast } from 'vant'
import { getIsBindEmail, getIsRealName, getIsSignuped, getProps, getSelfInf, getStanding } from '@/api/getInf'
import { removeInfo, removeSelectorInfo, removeSignupInfo } from '@/utils/storage'
import { mapState } from 'vuex'

const INFO_KEY = 'cmts-user-info'
const SIGNUP_KEY = 'cmts-signup-info'
const SELECT_KEY = 'cmts-select-info'

export default {
  name: 'mFrontFrameMain',
  async mounted () {
    console.log(this.$store.state.account.userInfo)
    console.log(this.$store.state.selectorItem.selectorItem)
    console.log(this.$store.state.selfInf.form)
    console.log(this.$store.state.sysProps.props)
    console.log(this.isLeader)
    console.log(this.isBindEmail)
    console.log(this.isRealName)
    console.log(this.isSignuped)

    if (
      typeof this.$store.state.accInfo.isLeader !== 'number' ||
  typeof this.$store.state.accInfo.isSignuped !== 'number' ||
  typeof this.$store.state.accInfo.isBindEmail !== 'number' ||
  typeof this.$store.state.accInfo.isRealName !== 'number'
    ) {
      await Promise.all([
        this.getStanding(),
        this.getIsSignuped(),
        this.getIsBindEmail(),
        this.getIsRealName()
      ]).catch(error => {
        console.error('获取用户信息失败:', error)
      })
    }

    this.getProps()
    this.getSelfInf()

    // this.checkAndRedirect()
  },
  data () {
    return {
      startTime: '', // 初始化 start_time
      endTime: '' // 初始化 end_time
    }
  },
  computed: {
    ...mapState({
      isLeader: state => state.accInfo.isLeader,
      isSignuped: state => state.accInfo.isSignuped,
      isBindEmail: state => state.accInfo.isBindEmail,
      isRealName: state => state.accInfo.isRealName
    }),
    userInfo () {
      return JSON.parse(localStorage.getItem(INFO_KEY) || 'null')
    },
    signupInfo () {
      return JSON.parse(localStorage.getItem(SIGNUP_KEY) || 'null')
    },
    selectInfo () {
      return JSON.parse(localStorage.getItem(SELECT_KEY) || 'null')
    },
    // 判断是否有任何一个div显示
    anyDivVisible () {
      return (
        (this.isLeader !== 2 && this.isInTimeRange(this.startTime, this.endTime)) ||
        (this.isLeader !== 2 && this.isSignuped === 1 && this.isInTimeRange(this.startTime, this.endTime)) ||
        (this.isSignuped === 1)
      )
    }
  },
  methods: {
    // 判断是否进行实名认证
    firstNavigateTo () {
      if (this.isRealName === 0) {
        this.$router.push('/mob/f/before')
        return
      }
      this.$router.push('/mob/f/signup')
    },
    // 判断是否进行绑定邮箱
    async getIsBindEmail () {
      try {
        let isBind = await getIsBindEmail()
        console.log(isBind)
        console.log(isBind.data)
        if (isBind && isBind?.data) {
          this.$store.commit('accInfo/setIsBindEmail', isBind.data?.isBindEmail)
          isBind = isBind.data.isBindEmail
        }
        if (isBind === 0) {
          // this.$router.push('/mob/f/bindemail')
          Notify({ type: 'warning', message: '建议前往个人信息页绑定邮箱，防止忘记密码' })
        }
      } catch (error) {
        console.error('获取绑定邮箱状态失败:', error)
      }
    },
    async getIsRealName () {
      try {
        const isReal = await getIsRealName()
        if (isReal && isReal?.data) {
          this.$store.commit('accInfo/setIsRealName', isReal.data?.isRealName)
        }
      } catch (error) {
        console.error('获取实名认证状态失败:', error)
      }
    },
    // 判断是否已报名
    async getIsSignuped () {
      try {
        const res = await getIsSignuped()
        if (res && res?.data) {
          this.$store.commit('accInfo/setIsSignuped', res?.data?.isSignuped)
        }
      } catch (error) {
        console.error('获取报名状态失败:', error)
      }
    },
    async getStanding () {
      try {
        const res = await getStanding()
        if (res && res?.data) {
          this.$store.commit('accInfo/setIsLeader', res?.data?.isLeader)
        }
      } catch (error) {
        console.error('获取队长状态失败:', error)
      }
    },
    // 进入主页和提交信息时重新获取信息
    async getSelfInf () {
      try {
        const res = await getSelfInf()
        if (res && res?.data) {
          this.$store.commit('selfInf/setForm', res?.data?.form)
          this.$store.commit('selectorItem/setSelectorItem', res?.data?.selectorItem)
        }
      } catch (error) {
        console.error('获取个人信息失败:', error)
      }
    },
    async getProps () {
      try {
        const res = await getProps()
        if (res && res?.data) {
          this.$store.commit('sysProps/setProps', res?.data?.props)
          this.startTime = res?.data?.props?.start_time // 获取 start_time
          this.endTime = res?.data?.props?.end_time // 获取 end_time
        }
      } catch (error) {
        console.error('获取系统属性失败:', error)
      }
    },

    // 判断当前时间是否在 start_time 和 end_time 范围内
    isInTimeRange (startTime, endTime) {
      const now = new Date()
      const start = new Date(startTime)
      const end = new Date(endTime)
      return now >= start && now <= end
    },

    checkAndRedirect () {
      if (!this.userInfo || !this.signupInfo || !this.selectInfo) {
        // 如果任一缓存为空，清理数据并跳转登录页
        Toast('登录信息已失效，请重新登录')
        removeInfo()
        removeSelectorInfo()
        removeSignupInfo()
        this.$router.push('/mob/login') // 跳转到登录页
      }
    },
    navigateTo (page) {
      this.$router.push(page)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F7F8FA;
}

.pic-box-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pic-box {
  width: 95%;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* 滑动进入动画 */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(50px);  /* 初始偏移位置为下方 */
  opacity: 0;
}

/* 动画结束时恢复默认 */
.slide-fade-enter-to, .slide-fade-leave {
  transform: translateY(0);  /* 动画结束位置 */
  opacity: 1;
}

/* 如果没有报名时间，显示提示 */
.no-signup-message {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: red;
}
</style>
