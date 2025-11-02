<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      class="custom-nav-bar"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-tabbar v-model="activeTab" class="custom-tabbar">
      <van-tabbar-item
        icon="home-o"
        v-bind="tabBarProps.accountInfo"
        @click="activeTab = 0"
      >
        账号信息
      </van-tabbar-item>
      <van-tabbar-item
        icon="setting-o"
        v-bind="tabBarProps.modifyBinding"
        @click="activeTab = 1"
      >
        修改绑定
      </van-tabbar-item>
    </van-tabbar>

    <div v-if="activeTab === 0" class="account-info">
      <van-cell-group title="个人信息(创建账号时与填写报名信息时自动更新)">
        <van-cell title="头像">
          <template #right-icon>
            <van-image
            round
            width="10vw"
            height="10vw"
            :src="form.avatar"
            fit="cover"
          />

          </template>
        </van-cell>
        <van-cell title="姓名" :value="form.name" />
        <van-cell title="性别" :value="form.gender" />
        <van-cell title="高中毕业学校" :value="form.senior" />
        <van-cell title="账号（学号）" :value="form.stuID" />
        <van-cell title="学院" :value="form.college" />
        <van-cell title="专业" :value="form.major" />
      </van-cell-group>
    </div>

    <div v-if="activeTab === 1" class="modify-binding">
      <van-cell-group>
        <van-cell title="绑定邮箱" :value="form.email">
          <template #right-icon>
            <div>
              <span style="margin-right: 10px">{{ email }}</span>
              <van-button size="small" type="info" @click="onModifyEmail">修改绑定邮箱</van-button>
            </div>
          </template>
        </van-cell >
        <van-cell title="修改密码">
          <van-button size="small" type="info" @click="onModifyPassword">&nbsp;&nbsp;修&nbsp;改&nbsp;密&nbsp;码&nbsp;&nbsp;</van-button>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getBindEmail } from '@/api/getInf'
export default {
  name: 'mInformationFrameIndex',
  data () {
    return {
      form: {},
      activeTab: 0,
      email: ''
    }
  },
  computed: {
    tabBarProps () {
      return {
        accountInfo: { icon: 'home-o' },
        modifyBinding: { icon: 'setting-o' }
      }
    }
  },
  created () {
    this.getSelfInf()
    this.getBindEmail()
  },
  methods: {
    // getInf中接包到了最里层字典层
    async getSelfInf () {
      this.form = this.$store.state.selfInf.form
    },
    async getBindEmail () {
      const res = await getBindEmail()
      this.email = res.data.email
    },
    onClickLeft () {
      // 返回逻辑
      this.$router.push('/mob/main')
    },
    onClickRight () {
      // 右侧点击逻辑
    },
    onModifyEmail () {
      // 修改绑定邮箱逻辑
      this.$router.push('/mob/modifyemail')
    },
    onModifyPassword () {
      // 修改密码逻辑
      this.$router.push('/mob/modifypwd')
    }
  }
}
</script>

<style scoped>
.custom-nav-bar {
  background-color: #f7f7f7;
}
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
