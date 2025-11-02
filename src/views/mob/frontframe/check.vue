<template>
  <div>
    <van-nav-bar title="报名信息确认" />
    <van-cell-group>
      <van-cell title="姓名" :value="form.name" />
      <van-cell title="性别" :value="form.gender" />
      <van-cell title="学号" :value="form.stuID" />
      <van-cell title="学院" :value="form.college" />
      <van-cell title="证件类型" :value="form.IDCardType" />
      <van-cell title="证件号码" :value="form.IDCardNum" />
      <van-cell title="民族" :value="form.nationality" />
      <van-cell title="政治面貌" :value="form.politicalStatus" />
      <van-cell title="专业" :value="form.major" />
      <van-cell title="QQ号码" :value="form.QQNum" />
      <van-cell title="手机号码" :value="form.phone" />
      <van-cell title="目标省（市）" :value="form.province" />
      <van-cell title="目标市（区）" :value="form.city" />
      <van-cell title="目标县（县级市、区）" :value="form.county" />
      <van-cell title="目标高中" :value="form.senior" />
      <van-cell title="队伍简介" :value="form.teamSummary" />
      <van-cell title="是否愿意合并" :value="form.isWillingToMerge ? '是' : '否'" />
      <van-cell title="是否作为团队报名" :value="form.isTeam ? '是' : '否'" />
      <template v-if="form.isTeam">
        <van-cell title="队员人数" :value="form.memberCount + '人'" />
      </template>
    </van-cell-group>

    <template v-if="form.isTeam">
      <comTableNoEdit
      :members="form.teamMembers"
    />
    </template>

    <van-row type="flex" justify="center" style="margin-top: 20px;" class="commonBtn">
      <van-col span="24" style="padding: 0; border-radius: 50px; overflow: hidden;">
        <div style="display: flex; width: 100%; border-radius: 50px; background-color: #f0f0f0;">
          <!-- 第一个按钮 -->
          <van-button
            type="primary"
            @click="getSignupPdf"
            size="large"
            round
            style="flex: 1; border: none; border-radius: 50px 0 0 50px; background-color: #FF5968;">
            下载报名表
          </van-button>
          <!-- 第二个按钮 -->
          <van-button
            type="default"
            @click="goToSignupAgain"
            size="large"
            round
            style="flex: 1; border: none; border-radius: 0 50px 50px 0; background-color: #fff; border-left: 1px solid #ccc;">
            修改信息
          </van-button>
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import comTableNoEdit from '@/components/comTableNoEdit.vue'
import { getSignupPdf } from '@/api/getInf'
import { getSignupInfo, getSelectorInfo } from '@/utils/storage'

export default {
  name: 'mFrontFrameCheck',
  components: {
    comTableNoEdit
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.getSelfInf()
  },
  methods: {
    // getInf中接包到了最里层字典层
    async getSelfInf () {
      this.form = getSignupInfo()
      this.selectorItem = getSelectorInfo()
    },
    async getSignupPdf () {
      try {
        console.log('准备下载报名表...')
        await getSignupPdf(this.form)
        console.log('报名表下载完成')
      } catch (error) {
        console.error('下载报名表失败:', error)
        // 提供更详细的错误信息
        if (error.response) {
          this.$toast.fail(`下载失败: ${error.response.status} ${error.response.statusText}`)
        } else {
          this.$toast.fail('下载报名表失败，请检查网络连接或稍后重试')
        }
      }
    },
    goToSignupAgain () {
      this.$router.push('/mob/f/signup')
    }
  }
}
</script>

<style scoped>
/* 样式可以在这里添加 */
</style>
