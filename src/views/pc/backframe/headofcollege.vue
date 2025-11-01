<template>
    <div>
      <!-- 页面头部 -->
      <div class="head-container">
        <div class="head-title">学院信息查询</div>
      </div>

      <!-- 查询区域 -->
      <el-row class="filter-section" style="margin-bottom: 20px;" :gutter="20">
        <el-col :span="6">
          <!-- 学院下拉框 -->
          <el-select style="width: 100%;" v-model="search.college" filterable clearable disabled placeholder="请选择学院" size="small" @change="handleSearch">
            <el-option
              v-for="college,index in collegeOptions"
              :key="index"
              :label="college"
              :value="college"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <!-- 下载按钮 -->
          <el-button @click="emptyToInput" type="warning" size="small" disabled>清除筛选条件</el-button>
          <el-button @click="handleDownload" type="success" size="small">下载账号对应学院数据</el-button>
        </el-col>
      </el-row>

      <!-- 数据表格 -->
      <el-table :data="signupData" stripe style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="姓名" prop="姓名" width="120"></el-table-column>
        <el-table-column label="队长学号" prop="队长学号" width="120"></el-table-column>
        <el-table-column label="队长学院" prop="学院" width="120"></el-table-column>
        <el-table-column label="队长专业" prop="专业" width="120"></el-table-column>
        <el-table-column label="队长民族" prop="民族" width="120"></el-table-column>
        <el-table-column label="队长政治面貌" prop="政治面貌" width="120"></el-table-column>
        <el-table-column label="队长身份证号" prop="身份证号" width="160"></el-table-column>
        <el-table-column label="队长QQ" prop="QQ号码" width="120"></el-table-column>
        <el-table-column label="队长手机号" prop="手机号码" width="120"></el-table-column>
        <el-table-column label="目标省" prop="目标省（市）" width="120"></el-table-column>
        <el-table-column label="目标市" prop="目标市（区）" width="120"></el-table-column>
        <el-table-column label="目标县" prop="目标县（市、区）" width="120"></el-table-column>
        <el-table-column label="目标学校" prop="目标学校" width="160"></el-table-column>
        <el-table-column label="总结" prop="总结" width="200"></el-table-column>
        <el-table-column label="头像" prop="照片" width="200">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.照片 || require('@/assets/logoW.png')"
              fit="cover"
              v-if="scope.row.照片"
            ></el-image>
            <div v-else style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; background-color: #f5f5f5;">
              无图片
            </div>
          </template>
        </el-table-column>
        <el-table-column label="活动完成状态" prop="活动完成状态" width="120"></el-table-column>
        <el-table-column label="信息修改时间" prop="信息修改时间" width="160">
        </el-table-column>
        <el-table-column label="是否愿意合并" prop="是否愿意合并" width="120"></el-table-column>
        <el-table-column label="是否团队报名" prop="是否团队报名" width="120"></el-table-column>
        <el-table-column label="队员人数" prop="队员人数" width="100"></el-table-column>
        <el-table-column
          v-for="index in Number(props.队员上限) > 0 ? Number(props.队员上限) : 0"
          :key="'队员学号' + index"
          :label="'队员学号' + index"
          :prop="'队员学号' + index"
          width="120">
        </el-table-column>

        <!-- 更多队员学号列根据实际数据列数添加 -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleViewDetails(scope.row)" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
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
import { getProps, getSignupData, getSignupDataTable } from '@/api/getInf'
import { getSelectorInfo } from '@/utils/storage'
import { Toast } from 'vant'

export default {
  name: 'backFrameHeadOfCollege',
  data () {
    return {
      search: {
        college: '' // 学院名称
      },
      collegeOptions: getSelectorInfo().collegeOptions,
      signupData: [], // 表格数据
      backupSignupData: [],
      total: 0, // 数据总数
      props: [],
      currentPage: 1, // 当前页
      pageSize: 99999 // 每页显示的数据量
    }
  },
  mounted () {
    this.getSignupData()
  },
  methods: {
    async getSignupData () {
      const res2 = await getProps()
      if (res2 && res2?.data) {
        this.props = res2.data.props
      } else {
        Toast('获取系统配置信息失败')
      }
      const res = await getSignupData(this.props.current_year)
      if (res && res?.data) {
        this.backupSignupData = this.signupData = res.data.signupData
        for (let i = 0; i < this.signupData.length; i++) {
          this.signupData[i].是否愿意合并 = this.toChiIs(this.signupData[i].是否愿意合并)
          this.signupData[i].活动完成状态 = this.toChiStatus(this.signupData[i].活动完成状态)
          this.signupData[i].是否团队报名 = this.toChiIs(this.signupData[i].是否团队报名)
        }
        this.backupSignupData = this.signupData
        this.total = res.data.total

        this.search.college = this.$store.state.selfInf.form.college
        this.handleSearch()
      } else {
        Toast('获取报名信息失败或暂时无人报名,请刷新页面重试，不要使用VPN')
      }
    },
    // 格式化日期
    formatDate (date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    },
    // 是否字段转中文
    toChiIs (val) {
      if (val === 1) {
        return '是'
      }
      return '否'
    },
    rToChiIs (val) {
      if (val === '是') {
        return 1
      }
      return 0
    },
    // 状态字段转中文
    toChiStatus (val) {
      if (val === 0) {
        return '未报名'
      } else if (val === 1) {
        return '预报名'
      } else if (val === 2) {
        return '报名成功'
      } else if (val === 3) {
        return '入选'
      } else {
        return '落选'
      }
    },
    rToChiStatus (val) {
      if (val === '未报名') {
        return 0
      } else if (val === '预报名') {
        return 1
      } else if (val === '报名成功') {
        return 2
      } else if (val === '入选') {
        return 3
      } else {
        return 4
      }
    },

    // 处理查询下拉框变化
    handleSearch () {
      console.log('搜索条件', this.search)
      const filteredData = this.backupSignupData.filter(item => {
        return (
        // 确保 item.队长学院 存在后再调用 includes 方法
          (this.search.college ? (item.学院 && item.学院.includes(this.search.college)) : true)
        )
      })
      this.signupData = filteredData
      this.total = filteredData.length
    },
    emptyToInput () {
      this.search.college = ''
      this.signupData = this.backupSignupData
      this.total = this.backupSignupData.length
    },

    // 处理下载按钮点击事件
    async handleDownload () {
      console.log('下载数据')
      // 发起下载请求，可以使用类似 `axios` 的库来获取数据并生成下载
      const college = this.$store.state.selfInf.form.college
      // 1 1 1 带学号 平铺 不分省
      await getSignupDataTable(this.props.current_year, college, 1, 1, 0)
    },

    // 分页处理
    handlePageChange (page) {
      this.currentPage = page
    },

    // 查看详情
    handleViewDetails (row) {
      console.log('查看详情:', row)
      // 你可以跳转到详情页面，或者弹出一个弹框展示更多信息
    }
  }
}
</script>

<style scoped>
.head-container {
  margin-bottom: 20px;
  background-color: #f4f4f4;
  padding: 10px;
}

.head-title {
  font-size: 24px;
  font-weight: bold;
}

.filter-section {
  margin-bottom: 20px;
}

.el-table .el-button {
  margin-right: 10px;
}

.button-section {
  margin-bottom: 20px;
}
</style>
