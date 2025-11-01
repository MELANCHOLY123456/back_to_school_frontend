<template>
  <div class="set-selection-status">
    <el-card class="box-card">
      <div slot="header">
        <span>快捷设置审核中状态</span>
      </div>

      <el-upload
        class="upload-box"
        action=""
        :before-upload="handleFile"
        :show-file-list="false"
        accept=".xlsx"
      >
        <el-button type="primary">上传文件</el-button>
        <div class="file-example">文件事例：学号列表 (如：202222222222、202233333333、202214587254)</div>
      </el-upload>

      <el-table :data="studentList" v-if="studentList.length > 0" border style="margin: 20px 0;">
        <el-table-column prop="id" label="序号" width="80"></el-table-column>
        <el-table-column prop="stuID" label="学号"></el-table-column>
      </el-table>

      <el-button
        type="success"
        :disabled="studentList.length === 0"
        @click="confirmSelection"
      >
        确定更改以上的表格中的学号为审核中
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { changeSSToCheck } from '@/api/getInf'
import * as XLSX from 'xlsx' // 需先安装：npm install xlsx

export default {
  name: 'backFrameFunction',
  data () {
    return {
      studentList: [] // 学号列表
    }
  },
  methods: {
    // 解析上传的 Excel 文件
    handleFile (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(firstSheet)
            this.studentList = jsonData.map((row, index) => ({
              id: index + 1,
              stuID: row['队长学号'] // 学号列
            }))
            this.$message.success('文件上传成功！')
            resolve()
          } catch (err) {
            this.$message.error('文件解析失败，请上传正确的表格格式！')
            reject(err)
          }
        }
        reader.onerror = () => {
          this.$message.error('文件读取失败！')
          reject(new Error('File reading failed'))
        }
        reader.readAsBinaryString(file)
      })
    },
    // 提交学号列表到后台设置为审核中
    confirmSelection () {
      if (this.studentList.length === 0) {
        this.$message.warning('请先上传文件并解析出学号列表！')
        return
      }
      const studentIDs = this.studentList.map((item) => item.stuID)
      // 模拟提交接口
      const confirm = this.$confirm('确定更改以上的表格中的学号为审核中吗？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          const res = await changeSSToCheck(studentIDs)
          // 替换为实际接口请求
          if (res && res.status === 200) {
            this.$message.success(res.data.message)
          }
          console.log('提交的学号列表：', studentIDs)
        })
        .catch(() => {
          this.$message.info('已取消操作')
        })
      console.log(confirm)
    }
  }
}
</script>

  <style scoped>
  .set-selection-status {
    padding: 20px;
  }
  .upload-box {
    margin-bottom: 20px;
  }
  .file-example {
    margin-top: 10px;
    color: #999;
  }
</style>
