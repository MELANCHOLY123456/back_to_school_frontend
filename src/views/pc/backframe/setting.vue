<template>
  <div>
    <el-row class="setting-section" style="margin-bottom: 20px;">
      <el-col :span="8">
        <h1>基础设置</h1>
      </el-col>
    </el-row>

    <!-- 允许报名时间设置 -->
    <el-row class="setting-section" style="margin-bottom: 20px;">
      <el-col :span="6">
        <span>允许报名时间设置</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker v-model="curProp.start_time" type="datetime" placeholder="选择起始时间" size="small"
          :picker-options="datePickerOptions" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col :span="5" class="text-center">
        <span class="text-small" style="text-align: center; margin: 20px 6.4vw;"> 到 </span>
      </el-col>
      <el-col :span="5">
        <el-date-picker v-model="curProp.end_time" type="datetime" placeholder="选择结束时间" size="small"
          :picker-options="datePickerOptions" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-row>

    <!-- 系统执行年份设置 -->
    <el-row class="setting-section" style="margin-bottom: 20px;">
      <el-col :span="6">
        <span>当前设置的活动年份</span>
      </el-col>
      <el-col :span="8">
        <el-input v-model="curProp.current_year" type="number"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="text-small" style="text-align: center; margin: 20px 2vw;">曾经设置的最早年份：{{ curProp.start_year }}</span>
      </el-col>
    </el-row>

    <!-- 设置队员上限 -->
    <el-row class="setting-section">
      <el-col :span="6">
        <span>当前设置的队员上限</span>
      </el-col>
      <el-col :span="8">
        <el-input v-model="curProp.队员上限" type="number" placeholder="队员上限" size="small"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="text-small" style="text-align: center; margin: 20px 2vw;">曾经设置的最高队员上限：{{ curProp.max_队员上限 }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col class="setting-section" :span="24">
        <el-button type="primary" @click="handleModifyProps" size="large">保存以上设置</el-button>
      </el-col>
    </el-row>

    <el-row class="setting-section" style="margin-bottom: 20px;">
      <el-col :span="8">
        <h1>报名信息设置</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="setting-section" :span="24">
        <el-button type="primary" @click="showConfirmation('reset')" size="large">
          清空所有账号的队伍表绑定、队长队员身份信息（开启新一轮报名，不会删除队伍报名表）
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="setting-section" :span="24">
        <el-button type="primary" @click="showConfirmation('endTest')" size="large">
          清空本年度新注册的所有账号、账号信息、报名表
        </el-button>
      </el-col>
    </el-row>

    <!-- 选项设置 -->
    <el-row class="setting-section" style="margin-bottom: 20px;">
      <el-col :span="8">
        <h1>选项设置</h1>
      </el-col>
    </el-row>

    <!-- 遍历二级字典创建表格 -->
    <div v-for="(options, title) in selectorItem" :key="options" class="table-container setting-section">
      <div class="table-header">
        <h3>{{ title }}</h3>
        <el-input v-model="inputValues[title]" placeholder="请输入值" size="small"
          style="width: 200px; margin-right: 10px;"></el-input>
        <el-button type="primary" size="small" @click="addValue(title)">添加值</el-button>
      </div>
      <table border="1" class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>值</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in options" :key="value">
            <td>{{ index + 1 }}</td>
            <td>{{ value }}</td>
            <td>
              <el-button type="danger" size="small" @click="deleteValue(value, title)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getProps, getSelfInf, reset, resetSignupForm, setProps, updateSelectorItem } from '@/api/getInf'
// import moment from 'moment-timezone'

export default {
  name: 'backFrameSetting',
  data () {
    return {
      curProp: {},
      datePickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() // 禁止选择当前时间之前的日期
        }
      },
      selectorItem: {
        学院选项: ['计算机学院', '电子学院'],
        性别选项: ['男', '女'],
        民族选项: ['汉族', '回族']
      },
      inputValues: {} // 用于存储每个选项对应的输入值
    }
  },
  computed () { },
  mounted () {
    this.getProps()
  },
  methods: {
    async getProps () {
      const res = await getProps()

      // // 将 UTC 时间转换为本地时间，并手动减去 8 小时
      // res.data.props.start_time = moment.utc(res.data.props.start_time)
      //   .local()
      //   .subtract(8, 'hours') // 手动减去 8 小时
      //   .format('YYYY-MM-DDTHH:mm:ss')

      // res.data.props.end_time = moment.utc(res.data.props.end_time)
      //   .local()
      //   .subtract(8, 'hours') // 手动减去 8 小时
      //   .format('YYYY-MM-DDTHH:mm:ss')

      this.curProp = res.data.props
      this.getSelfInf()
    },
    async getSelfInf () {
      const res = await getSelfInf()
      this.$store.commit('selectorItem/setSelectorItem', res.data.selectorItem)
      this.selectorItem = res.data.selectorItem
    },
    async deleteValue (value, title) {
      // this.selectorItem[title].splice(value, 1) //删除对应索引
      this.selectorItem[title] = this.selectorItem[title].filter(item => item !== value) // 删除对应值
      // value: 值 title: 标题
      const res = await updateSelectorItem(title, value, '', 1)
      this.$store.commit('selectorItem/setSelectorItem', this.selectorItem)
      this.$message.success(`${res.data.message}`)
    },
    async addValue (title) {
      const newValue = this.inputValues[title]?.trim()
      if (newValue) {
        this.selectorItem[title].push(newValue) // 添加新值
        const res = await updateSelectorItem(title, '', newValue, 0)
        this.$message.success(`${res.data.message}`)
        this.inputValues[title] = '' // 清空输入框
        this.$store.commit('selectorItem/setSelectorItem', this.selectorItem)
      } else {
        this.$message.error('请输入有效值')
      }
    },
    async handleModifyProps () {
      // this.curProp.start_time = moment.utc(this.curProp.start_time)
      //   .local()
      //   .format('YYYY-MM-DDTHH:mm:ss')

      // this.curProp.end_time = moment.utc(this.curProp.end_time)
      //   .local()
      //   .format('YYYY-MM-DDTHH:mm:ss')
      const res = await setProps(this.curProp)
      this.$message.success(`${res.data.message}`)
      this.curProp = (await getProps()).data.props

      // // 将 UTC 时间转换为本地时间，并手动减去 8 小时
      // res.data.props.start_time = moment.utc(res.data.props.start_time)
      //   .local()
      //   .subtract(8, 'hours') // 手动减去 8 小时
      //   .format('YYYY-MM-DDTHH:mm:ss')

      // res.data.props.end_time = moment.utc(res.data.props.end_time)
      //   .local()
      //   .subtract(8, 'hours') // 手动减去 8 小时
      //   .format('YYYY-MM-DDTHH:mm:ss')
    },
    showConfirmation (field) {
      switch (field) {
        case 'reset': // 如果 field 为 'reset'，执行 handleReset
          this.$confirm(
            '此操作将清空所有账号的队伍表绑定和队长身份信息，是否继续？',
            '警告',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.handleReset() // 调用实际的操作方法
              this.$message({
                type: 'success',
                message: '操作成功！'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
          break

        case 'endTest': // 如果 field 为 'endTest'，执行 handleResetAll
          this.$confirm(
            '建议在操作前进行数据库备份，是否继续？',
            '警告',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.handleResetAll() // 调用 handleResetAll 方法
              this.$message({
                type: 'success',
                message: '清空完毕！'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
          break

        default:
          // 默认的处理方式，若 field 不符合上述情况，可以做一些默认操作
          this.$message({
            type: 'warning',
            message: '未知操作'
          })
          break
      }
    },
    async handleReset () {
      const res = await reset()
      this.$message.success(`${res.data.message}`)
    },

    async handleResetAll () {
      const res = await resetSignupForm()
      this.$message.success(`${res.data.message}`)
    }
  }
}
</script>

<style scoped>
.setting-section {
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  text-align: center;
  padding: 8px;
}

.data-table th {
  background-color: #f5f7fa;
}

.data-table td {
  background-color: #fff;
}

.el-button {
  margin-left: 10px;
}
</style>
