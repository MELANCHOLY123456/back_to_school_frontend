<template>
  <div>
    <van-nav-bar title="队伍详情" />
    <van-cell-group>
      <van-cell title="队长姓名" :value="form.name" />
      <van-cell title="队长学院" :value="form.college" />
      <van-cell title="目标高中" :value="form.senior" />
      <van-cell title="队伍人数" :value="form.memberCount + 1 + '人'" />
      <van-cell title="活动进行状态" :value="activityStatus" />
      <van-cell title="队伍信息最后修改时间" :value="form.editDate" />
      <van-cell title="快捷操作">
        <van-button size="small" type="warning" @click="centerDialogVisible = true">撤销报名（仅队长可用）</van-button>
      </van-cell>
    </van-cell-group>

    <!-- 替换为 el-dialog 对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="80vw"
      center>
      <span>确定要撤销报名吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmExit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTeamInfo, withdrawSignup } from '@/api/getInf'
import { removeInfo, removeSelectorInfo, removeSignupInfo } from '@/utils/storage'
export default {
  name: 'mFrontFrameChangeTeam',
  data () {
    return {
      form: {},
      activityStatus: '',
      centerDialogVisible: false // 控制对话框显示状态
    }
  },
  created () {
    this.getTeamInfo()
  },
  methods: {
    async getTeamInfo () {
      const res = await getTeamInfo()
      if (res && res.data) {
        this.form = res.data.data
      } else {
        this.form.memberCount = 0
        setTimeout(() => {
          this.$router.push('/')
        }, 1000) // 延迟3秒后跳转到主页
      }

      if (this.form.activityStatus === 1) {
        this.activityStatus = '预报名'
      } else if (this.form.activityStatus === 2) {
        this.activityStatus = '报名成功'
      } else if (this.form.activityStatus === 3) {
        this.activityStatus = '审核材料中'
      } else if (this.form.activityStatus === 4) {
        this.activityStatus = '入选'
      } else if (this.form.activityStatus === 5) {
        this.activityStatus = '落选'
      } else {
        this.activityStatus = '未报名'
      }
    },
    async handleConfirmExit () {
      const res = await withdrawSignup()
      if (res && res.data) {
        this.$message.success(res.data.message)
        setTimeout(() => {
          removeInfo()
          removeSelectorInfo()
          removeSignupInfo()
          this.$router.push('/')
          window.location.reload()
        }, 1000)
      }
      this.centerDialogVisible = false // 关闭对话框
    }
  }
}
</script>

<style>
.page-title {
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
  color: #333;
}
</style>
