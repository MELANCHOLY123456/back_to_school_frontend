<template>
  <div>
    <!-- 筛选区域 -->
    <el-row class="Search-section" style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <el-select filterable clearable style="width:100%;" v-model="year" placeholder="年份" size="small" @change="handleYearChange">
          <el-option v-for="year in years" :key="year" :label="year" :value="year"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input style="width:100%;" v-model="search.队长学号" placeholder="队长学号" size="small"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input style="width:100%;" v-model="search.目标学校" placeholder="目标学校" size="small"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select filterable clearable style="width:100%;" v-model="search.是否团队报名" placeholder="是否团队报名" size="small">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="Search-section" style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <el-input style="width:100%;" v-model="search.目标省" placeholder="目标省" size="small"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input style="width:100%;" v-model="search.目标市" placeholder="目标市" size="small"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select filterable clearable  style="width:100%;" v-model="search.学院" placeholder="请选择学院" size="small">
          <el-option v-for="college in collegeOptions" :key="college" :label="college" :value="college"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select filterable clearable style="width:100%;" v-model="search.是否愿意合并" placeholder="是否愿意合并" size="small">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="Search-section" style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <el-select filterable clearable style="width:100%;" v-model="search.队员人数" placeholder="队员人数" size="small">
          <el-option v-for="num in memberCounts" :key="num" :label="num" :value="num"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select filterable clearable style="width:100%;" v-model="search.活动完成状态" placeholder="活动完成状态" size="small">
          <el-option label="未报名" value="未报名"></el-option>
          <el-option label="预报名" value="预报名"></el-option>
          <el-option label="报名成功" value="报名成功"></el-option>
          <el-option label="入选" value="入选"></el-option>
          <el-option label="落选" value="落选"></el-option>
        </el-select>
      </el-col>

      <!-- 日期选择器 -->
      <el-col :span="6">
        <el-date-picker
          style="width:100%;"
          v-model="search.start_time"
          type="datetime"
          placeholder="选择开始时间"
          size="small"
          :picker-options="datePickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          style="width:100%;"
          v-model="search.end_time"
          type="datetime"
          placeholder="选择结束时间"
          size="small"
          :picker-options="datePickerOptions"
        ></el-date-picker>
      </el-col>
    </el-row>

    <!-- 按钮区域 -->

    <el-row class="button-section" :gutter="20">

      <el-col :span="4">

        <el-button type="primary" @click="handleSearch" size="small">筛选</el-button>

        <el-button type="warning" @click="emptyToInput" size="small">清空筛选条件</el-button>

        <el-button type="success" @click="refreshData" size="small">刷新数据</el-button>

      </el-col>
      <el-col :span="3">
        <el-button style="width:100%;" type="info" @click="downloadSignupInfo" size="small">下载报名信息</el-button>
      </el-col>
      <el-col :span="2">
        <span class="text-small text-secondary" style="width:100%;height:100%; margin: 2.5vw; text-align: right;" >下载选项：</span>
      </el-col>
      <el-col :span="5">
        <el-switch style="margin: 1vw;" v-model="downloadWithStuID" active-text="带队员信息" inactive-text="无队员信息" size="small"></el-switch>
      </el-col>
      <el-col :span="5">
        <el-switch style="margin: 1vw;" v-model="tiledDownload" active-text="队员信息平铺" inactive-text="队员信息堆叠" size="small"></el-switch>
      </el-col>
      <el-col :span="5">
        <el-switch style="margin: 1vw;" v-model="spiltByProvince" active-text="按省分表" inactive-text="不分表" size="small"></el-switch>
      </el-col>
    </el-row>

      <!-- 数据表格 -->
      <el-table :data="signupData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe style="width: 100%">
        <el-table-column label="序号" type="index" :index="indexMethod" width="80"></el-table-column>
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
          <el-table-column label="总结" prop="总结" width="200">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.总结" placement="top-start">
                <div class="summary-content">{{ scope.row.总结 ? scope.row.总结.slice(0, 50) + (scope.row.总结.length > 50 ? '...' : '') : '' }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
        <el-table-column label="头像" prop="照片" width="200">
          <template #default="scope">

            <span><a href="https://www.example.com" target="_blank">

              如何压缩图片大小？

            </a></span>

            <el-image

              style="width: 100px; height: 100px"

              :src="scope.row.照片 || require('@/assets/logoW.png')"

              fit="cover"

            ></el-image>
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
            <el-button @click="handleViewDetails(scope.row)" size="small">查看报名表</el-button>
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

    <!-- 查看报名表详情弹窗 -->

    <el-dialog title="报名表详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">

      <el-form :model="currentDetail" label-width="120px" v-if="currentDetail">

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="姓名:">

              <span>{{ currentDetail.姓名 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="队长学号:">

              <span>{{ currentDetail.队长学号 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="学院:">

              <span>{{ currentDetail.学院 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="专业:">

              <span>{{ currentDetail.专业 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="民族:">

              <span>{{ currentDetail.民族 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="政治面貌:">

              <span>{{ currentDetail.政治面貌 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="身份证号:">

              <span>{{ currentDetail.身份证号 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="QQ号码:">

              <span>{{ currentDetail.QQ号码 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="手机号码:">

              <span>{{ currentDetail.手机号码 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="目标省:">

              <span>{{ currentDetail['目标省（市）'] }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="目标市:">

              <span>{{ currentDetail['目标市（区）'] }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="目标县:">

              <span>{{ currentDetail['目标县（市、区）'] }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="目标学校:">

              <span>{{ currentDetail.目标学校 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="是否团队报名:">

              <span>{{ currentDetail.是否团队报名 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="队员人数:">

              <span>{{ currentDetail.队员人数 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="是否愿意合并:">

              <span>{{ currentDetail.是否愿意合并 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">

            <el-form-item label="活动完成状态:">

              <span>{{ currentDetail.活动完成状态 }}</span>

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="信息修改时间:">

              <span>{{ currentDetail.信息修改时间 }}</span>

            </el-form-item>

          </el-col>

        </el-row>

        <el-form-item label="总结:">

          <span>{{ currentDetail.总结 }}</span>

        </el-form-item>

        <el-form-item label="头像:">

          <el-image

            style="width: 100px; height: 100px"

            :src="currentDetail.照片 || require('@/assets/logoW.png')"

            fit="cover"

          ></el-image>

        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">

        <el-button @click="dialogVisible = false">关 闭</el-button>

      </span>

    </el-dialog>

  </div>

</template>

<script>
import { getProps, getSelfInf, getSignupData, getSignupDataTable } from '@/api/getInf'
import { Toast } from 'vant'

export default {
  name: 'backFrameSignupInf',
  data () {
    return {
      search: {
        year: '',
        队长学号: '',
        目标学校: '',
        是否团队报名: '',
        目标省: '',
        目标市: '',
        学院: '',
        是否愿意合并: '',
        队员人数: '',
        活动完成状态: '',
        start_time: '',
        end_time: ''
      },
      props: [],
      downloadWithStuID: false, // 控制下载是否包含队员学号
      tiledDownload: false, // 控制是否使用学号堆叠显示
      spiltByProvince: false, // 控制是否按省份分
      year: '',
      years: [],
      collegeOptions: [],
      memberCounts: [], // 队员人数序列
      signupData: [], // 表格数据
      backupSignupData: [],
      total: 0, // 数据总数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示的数据量
      datePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() // 禁止选择未来的日期
        }
      },
      // 弹窗相关数据
      dialogVisible: false,
      currentDetail: null
    }
  },
  mounted () {
    this.getSignupData()
  },
  methods: {
    async getSignupData () {
      // 获取配置属性
      const res2 = await getProps()
      if (res2 && res2?.data) {
        this.props = res2.data.props
        // 设置当前年份 即选择框默认选中的年份
        this.year = this.props.current_year
        // 生成年份列表
        this.generateYears(this.props.start_year, this.props.current_year)
        this.generateMemberCounts(this.props.max_队员上限)
      } else {
        Toast('获取系统配置信息失败，请刷新页面重试，不要使用VPN')
      }

      // 获取报名数据

      const res = await getSignupData(this.year)

      if (res && res?.data) {
        this.total = res.data.total

        this.signupData = res.data.signupData

        for (let i = 0; i < this.signupData.length; i++) {
          this.signupData[i].是否愿意合并 = this.toChiIs(this.signupData[i].是否愿意合并)

          this.signupData[i].活动完成状态 = this.toChiStatus(this.signupData[i].活动完成状态)

          this.signupData[i].是否团队报名 = this.toChiIs(this.signupData[i].是否团队报名)
        }

        this.backupSignupData = this.signupData

        // 初始化分页

        this.currentPage = 1

        this.updatePageData()
      } else {
        Toast('获取报名数据失败，请刷新页面重试，不要使用VPN')
      }

      if (this.$store.state.selectorItem.selectorItem !== '' || this.$store.state.selectorItem.selectorItem !== undefined) {
        this.collegeOptions = this.$store.state.selectorItem.selectorItem.collegeOptions
      } else {
        const res = await this.getSelfInf()
        this.$store.commit('selectorItem/setSelfInf', res.data.selectorItem)
        this.$store.commit('selectorItem/setSelectorItem', res.data.selectorItem)
        this.collegeOptions = res.data.selectorItem.collegeOptions
      }
    },
    async getSelfInf () {
      const res = await getSelfInf()
      this.$store.commit('selectorItem/setSelectorItem', res.data.selectorItem)
      this.collegeOptions = res.data.selectorItem.collegeOptions
    },
    // 动态生成年份范围
    generateYears (startYear, endYear) {
      const years = []
      for (let year = startYear - 1; year <= endYear; year++) {
        years.push(year)
      }
      this.years = years
    },
    generateMemberCounts (max) {
      const counts = []
      for (let i = 0; i <= max; i++) {
        counts.push(i)
      }
      this.memberCounts = counts
    },
    async getSignupDataYear (year) {
      // 获取配置属性

      const res2 = await getProps()

      if (res2 && res2?.data) {
        this.props = res2.data.props
      } else {
        Toast('获取系统配置信息失败')
      }

      // year 与下拉框绑定 不用赋值

      let res = 0

      // 获取报名数据

      res = await getSignupData(year)

      if (res && res?.data) {
        this.total = res.data.total

        this.signupData = res.data.signupData

        for (let i = 0; i < this.signupData.length; i++) {
          this.signupData[i].是否愿意合并 = this.toChiIs(this.signupData[i].是否愿意合并)
          this.signupData[i].活动完成状态 = this.toChiStatus(this.signupData[i].活动完成状态)
          this.signupData[i].是否团队报名 = this.toChiIs(this.signupData[i].是否团队报名)
        }

        this.backupSignupData = this.signupData

        // 初始化分页

        this.currentPage = 1

        this.updatePageData()
      } else {
        Toast('获取报名数据失败，请刷新页面重试，不要使用VPN')
      }
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
    // 格式化日期
    formatDate (date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    },

    // 筛选函数

    handleSearch () {
      // 先将筛选后的数据初始化为原始数据

      let filtered = this.backupSignupData

      // 遍历 search 对象，根据条件进行筛选

      Object.keys(this.search).forEach(key => {
        const value = this.search[key]

        if (value) { // 如果筛选条件不为空
          filtered = filtered.filter(item => {
            // 根据字段名进行相应的匹配

            if (key === '队长学号' && item['队长学号']) {
              return item['队长学号'].includes(value)
            }

            if (key === '目标学校' && item['目标学校']) {
              return item['目标学校'].includes(value)
            }

            if (key === '是否团队报名' && item['是否团队报名'] !== undefined) {
              return item['是否团队报名'].toString().includes(value)
            }

            if (key === '目标省' && item['目标省（市）']) {
              return item['目标省（市）'].includes(value)
            }

            if (key === '目标市' && item['目标市（区）']) {
              return item['目标市（区）'].includes(value)
            }

            if (key === '学院' && item['学院']) {
              return item['学院'].includes(value)
            }

            if (key === '是否愿意合并' && item['是否愿意合并'] !== undefined) {
              return item['是否愿意合并'].toString().includes(value)
            }

            if (key === '队员人数' && item['队员人数'] !== undefined) {
              // 确保 value 和 item['队员人数'] 都为整数

              return parseInt(item['队员人数'], 10) === parseInt(value, 10)
            }

            if (key === '活动完成状态' && item['活动完成状态'] !== undefined) {
              return item['活动完成状态'].toString().includes(value)
            }

            if (key === 'start_time' && item['信息修改时间']) {
              return new Date(item['信息修改时间']).getTime() >= new Date(value).getTime()
            }

            if (key === 'end_time' && item['信息修改时间']) {
              return new Date(item['信息修改时间']).getTime() <= new Date(value).getTime()
            }

            return true // 默认返回 true，保持原始数据
          })
        }
      })

      // 更新筛选后的数据

      this.total = filtered.length

      this.signupData = filtered

      // 重置到第一页

      this.currentPage = 1

      // 更新分页数据

      this.updatePageData()
    },
    handleYearChange () {
      // 重新加载数据
      this.getSignupDataYear(this.year)
    },

    emptyToInput () {
      // 遍历 search 的所有键并赋值为空
      Object.keys(this.search).forEach(key => {
        this.search[key] = ''
      })
      // 恢复数据

      this.signupData = this.backupSignupData

      this.total = this.backupSignupData.length

      // 重置到第一页

      this.currentPage = 1

      // 更新分页数据

      this.updatePageData()
    },

    // 分页处理

    handlePageChange (page) {
      this.currentPage = page

      this.updatePageData()
    },
    // 更新当前页数据

    updatePageData () {
      // 如果是筛选后的数据，则对筛选后的数据进行分页
      const data = this.signupData || []

      // 这里我们不需要截取数据，因为表格会自动根据数据进行显示
      // 但我们需要确保 currentPage 不超过最大页数
      const maxPage = Math.ceil(data.length / this.pageSize) || 1

      if (this.currentPage > maxPage) {
        this.currentPage = maxPage
      }
    },

    // 下载报名信息
    async downloadSignupInfo () {
    // 根据 downloadWithStuID 和 tiledDownload 生成下载链接
      // const params = {
      //   withStuID: this.downloadWithStuID,
      //   tiled: this.tiledDownload
      // }
    // 发起下载请求
      await getSignupDataTable(this.year, this.search.学院, this.downloadWithStuID === true ? 1 : 0, this.tiledDownload === true ? 1 : 0, this.spiltByProvince === true ? 1 : 0)
    },

    // 获取数据
    fetchSignupData () {
      // 根据 search 和分页参数获取数据
      // 更新 signupData 和 total
    },

    // 显示弹窗
    handleViewDetails (row) {
      this.currentDetail = row
      this.dialogVisible = true
    },

    // 关闭弹窗
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 处理表格序号

    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },

    // 刷新数据

    async refreshData () {
      await this.getSignupData()
      this.$message.success('数据已刷新')
    }
  }
}
</script>

<style scoped>
.Search-section {
  margin-bottom: 20px;
}
.el-table .el-button {
  margin-right: 10px;
}
.button-section {
  margin-bottom: 40px;
}
.summary-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
  max-height: 3em;
}

</style>
