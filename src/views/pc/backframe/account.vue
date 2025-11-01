<template>
    <div>
      <!-- 筛选区域 -->
      <el-row class="filter-section" style="margin-bottom: 20px;" :gutter="20">
        <el-col :span="6">
          <el-input  @keyup.enter.native="handleFilter" style="width: 100%;" v-model="filters.学号" placeholder="学号" size="small"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input  @keyup.enter.native="handleFilter" style="width: 100%;" v-model="filters.队伍表编号" placeholder="队伍表编号" size="small"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select style="width: 100%;" v-model="filters.是否队长" placeholder="是否队长" size="small" filterable clearable >
            <el-option label="未报名" value="未报名"></el-option>
            <el-option label="队长" value="队长"></el-option>
            <el-option label="队员" value="队员"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleFilter" size="small">筛选</el-button>
          <el-button type="primary" @click="resetFilter" size="small">清空筛选</el-button>
          <el-button type="success" @click="resetFilter" size="small" disabled>添加账号</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="accountData" style="width: 100%" stripe>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="学号" prop="学号" width="120"></el-table-column>
        <el-table-column label="邮箱" prop="邮箱" width="180"></el-table-column>
        <el-table-column label="信息表编号" prop="信息表编号" width="180"></el-table-column>
        <el-table-column label="队伍表编号" prop="队伍表编号" width="180"></el-table-column>
        <el-table-column label="注册时间" prop="注册时间" width="160">
        </el-table-column>
        <el-table-column label="密码修改时间" prop="密码修改时间" width="160">
        </el-table-column>
        <el-table-column label="是否队长" prop="是否队长" width="120"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button @click="clearTeamID(scope.row)" type="danger" size="mini" round>删除队伍表</el-button>
            <el-button @click="resetPassword(scope.row)" type="warning" size="mini" round>重置密码</el-button>
            <el-button @click="clearEmail(scope.row)" type="primary" size="mini" round>清空邮箱</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper"
        style="margin-top: 20px; text-align: center;"
      ></el-pagination>
    </div>
  </template>

<script>
import { getAccount, updateAccountInfo } from '@/api/getInf'

export default {
  name: 'backFrameAccount',
  data () {
    return {
      filters: {
        学号: '',
        队伍表编号: '',
        是否队长: ''
      },
      accountData: [], // 表格数据
      backupAccountData: [],
      total: 0, // 数据总数
      currentPage: 1, // 当前页
      pageSize: 99999 // 每页显示的数据量
    }
  },
  mounted () {
    // 初始化数据
    this.getAccountData()
  },
  methods: {
    async getAccountData () {
      const res = await getAccount()
      this.backupAccountData = this.accountData = res.data.accounts
      for (let i = 0; i < this.backupAccountData.length; i++) {
        this.backupAccountData[i].是否队长 = this.toChiCaptian(this.backupAccountData[i].是否队长)
      }
      this.backupAccountData = this.accountData
      this.total = res.data.total
    },
    // 格式化日期
    formatDate (date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    },
    toChiCaptian (val) {
      if (val === 0) {
        return '未报名'
      } else if (val === 1) {
        return '队长'
      } else {
        return '队员'
      }
    },
    rToChiCaptian (val) {
      if (val === '未报名') {
        return 0
      } else if (val === '队长') {
        return 1
      } else {
        return 2
      }
    },
    // 处理筛选
    handleFilter () {
      console.log('搜索条件', this.filters)
      const filteredData = this.backupAccountData.filter(item => {
        return (
        // 检查 item.学号 是否是有效的字符串
          (this.filters.学号 ? (item.学号 && item.学号.includes(this.filters.学号)) : true) &&
      (this.filters.队伍表编号 ? (item.队伍表编号 && item.队伍表编号.includes(this.filters.队伍表编号)) : true) &&
      (this.filters.是否队长 ? String(item.是否队长) === String(this.filters.是否队长) : true)
        )
      })
      this.accountData = filteredData
    },
    async resetFilter () {
      if (this.filters.学号 !== '' && this.filters.队伍表编号 !== '' && this.filters.是否队长 !== '') {
        await this.getAccountData()
      }
      this.filters = {
        学号: '',
        队伍表编号: '',
        是否队长: ''
      }
    },

    // 处理分页
    handlePageChange (page) {
      this.currentPage = page
    // 根据当前页数更新表格数据
    // 调用 API 获取当前页的数据
    },

    // 删除账号
    deleteAccount (row) {
      console.log('删除账号:', row)
    // 调用 API 删除账号
    },

    // 清除信息表
    clearInfoID (row) {
      console.log('清除信息表:', row)
    // 调用 API 清除信息表
    },

    // 清除队伍表
    async clearTeamID (row) {
      console.log('清除队伍表:', row)
      if (this.rToChiCaptian(row.是否队长) === 1) {
        const res = await updateAccountInfo(row.学号, 1, 0, 0)
        row.队伍表编号 = ''
        row.是否队长 = '未报名'
        this.$message.success(`${res.data.message}`)
      } else {
        this.$message.error('队长才能清空队伍表')
      }
    },

    // 重置密码
    async resetPassword (row) {
      console.log('重置密码:', row)
      const res = await updateAccountInfo(row.学号, 0, 1, 0)
      this.$message.success(`${res.data.message}`)
    },

    // 清空邮箱
    async clearEmail (row) {
      console.log('清空邮箱:', row)
      const res = await updateAccountInfo(row.学号, 0, 0, 1)
      row.邮箱 = ''
      this.$message.success(`${res.data.message}`)
    }
  }
}

</script>

  <style scoped>
  .filter-section {
    margin-bottom: 20px;
  }
  .el-table .el-button {
    margin-right: 10px;
  }
  </style>
