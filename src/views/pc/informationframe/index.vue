<template>
  <el-container>
  <el-header><div style="font-size: 30px;font-family: 宋体;color: white;">湖南师范大学招生办</div></el-header>
  <el-main>
    <div style="height: 50px;">
      <p style="font-size: 25px;padding-top: 10px">报名信息填写</p>
    </div>
    <form>
    <el-table :data="tableData" style="width: 100%;font-family: 宋体;" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
    <!-- 关键字列1 -->
    <el-table-column prop="key1" width="180"></el-table-column>
    <!-- 输入列1 -->
    <el-table-column >
      <template slot-scope="scope">
        <el-select v-if="scope.row.key1 === '性别' || scope.row.key1 === '学院' || scope.row.key1 === '证件类型' || scope.row.key1 === '民族'" v-model="scope.row.value1" :placeholder="'请选择' + scope.row.key1" style="width: 100%;">
          <el-option
            v-for="item in getOptions(scope.row.key1)"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <!-- 政治面貌使用下拉单选框 -->
        <el-select v-else-if="scope.row.key1 === '政治面貌'" v-model="scope.row.value1" filterable :placeholder="'请选择政治面貌'" style="width: 100%;">
          <el-option v-for="item in getOptions(scope.row.key1)" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-input v-else v-model="scope.row.value1" :placeholder="'请输入' + scope.row.key1"></el-input>
      </template>
    </el-table-column>
    <!-- 关键字列2 -->
    <el-table-column prop="key2" width="180"></el-table-column>
    <!-- 输入列2 -->
    <el-table-column>
      <template slot-scope="scope">
        <el-select v-if="scope.row.key2 === '性别' || scope.row.key2 === '学院' || scope.row.key2 === '证件类型' || scope.row.key2 === '民族'" v-model="scope.row.value2" :placeholder="'请选择' + scope.row.key2" style="width: 100%;">
          <el-option
            v-for="item in getOptions(scope.row.key2)"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <!-- 如果第二列是政治面貌，也用下拉单选框 -->
        <el-select v-else-if="scope.row.key2 === '政治面貌'" v-model="scope.row.value2" filterable :placeholder="'请选择政治面貌'" style="width: 100%;">
          <el-option v-for="item in getOptions(scope.row.key2)" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-input v-else v-model="scope.row.value2" :placeholder="'请输入' + scope.row.key2"></el-input>
      </template>
    </el-table-column>
  </el-table>
  <div style="height: 60px;padding-top: 20px;">
  <el-row >
    <el-col :span="12">
      <el-switch
        active-color="#13ce66"
        inactive-color="blue"
        v-model="value1"
        active-text="个人报名"
        inactive-text="团队报名"
        >
      </el-switch>
    </el-col>
    <el-col :span="12">
      <el-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="bule"
        active-text="拒绝合并"
        inactive-text="接受队伍合并">
      </el-switch>
    </el-col>
  </el-row>
</div>
  <div style="margin-top: 20px;display: flex; align-items: flex-start;">
    <el-button type="primary" @click="addTeamMember" :disabled="value1">添加队员</el-button>
    <el-table :data="teamMembers" style="width: 30%;" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
      <el-table-column prop="name" label="队员姓名" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入姓名"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="studentId" label="队员学号" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.studentId" placeholder="请输入学号"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="college" label="学院" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.college" placeholder="请输入学院"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.major" placeholder="请输入专业"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div id="app">
  <div class="upload-container" @click="selectImage">
    <div v-if="imageUrls.length === 0" class="plus-sign">+</div>
    <div v-else class="images">
      <img
        v-for="(url, index) in imageUrls"
        :key="index"
        :src="url"
        alt="上传的图片"
        class="uploaded-image"
      />
    </div>
  </div>
  <input
    type="file"
    style="display: none;"
    ref="fileInput"
    @change="onFileChange"
    multiple
  />
</div>
  <div style="height: 60px;margin-top: 30px;">
  <el-button type="primary" @click="onSubmit">提交</el-button>
</div>
  </form>
  </el-main>
</el-container>
</template>

<script>
import { submitForm } from '@/api/getInf'
import { getSelectorInfo } from '@/utils/storage'
export default {
  name: 'InformationFrameIndex',
  data () {
    return {
      imageUrls: [],
      value1: true,
      value2: true,
      tableData: [
        { key1: '姓名', value1: '', key2: '性别', value2: '' },
        { key1: '学号', value1: '', key2: '学院', value2: '' },
        { key1: '证件类型', value1: '', key2: '证件号码', value2: '' },
        { key1: '民族', value1: '', key2: '专业', value2: '' },
        { key1: 'QQ号码', value1: '', key2: '手机号码', value2: '' },
        { key1: '政治面貌', value1: '', key2: '目标省（市）', value2: '' },
        { key1: '目标市（区）', value1: '', key2: '目标县（县）', value2: '' },
        { key1: '目标高中', value1: '', key2: '团队总结', value2: '' }
      ],
      teamMembers: [],
      // 选项数据
      optionsData: {
        性别: ['男', '女'],
        学院: ['计算机学院', '电子学院'], // 默认选项
        证件类型: ['身份证', '护照', '其他证件'],
        民族: ['汉族', '回族'],
        政治面貌: ['党员', '预备党员', '共青团员', '群众'],
        '目标省（市）': [],
        '目标市（区）': [],
        '目标县（县）': []
      },
      selectorItem: {} // 从后端获取的选项数据
    }
  },
  created () {
    this.getSelfInf()
  },
  methods: {
    headerCellStyle () {
      return {
        'text-align': 'center',
        'line-height': '0px' // 设置表头行高
      }
    },
    cellStyle () {
      return {
        'font-family': '黑体',
        'font-size': '14px'
      }
    },
    // 获取个人信息和选项数据
    getSelfInf () {
      // 从本地存储获取选项信息
      this.selectorItem = getSelectorInfo()
      // 调试信息
      console.log('selectorItem:', this.selectorItem)
      // 更新选项数据
      // 如果 selectorItem 中有学院选项，则更新 optionsData 中的学院选项
      if (this.selectorItem.collegeOptions) {
        this.optionsData.学院 = this.selectorItem.collegeOptions
        console.log('学院选项:', this.selectorItem.collegeOptions)
      }
      // 如果 selectorItem 中有民族选项，则更新 optionsData 中的民族选项
      if (this.selectorItem.nationalityOptions) {
        this.optionsData.民族 = this.selectorItem.nationalityOptions
        console.log('民族选项:', this.selectorItem.nationalityOptions)
      }
      // 如果 selectorItem 中有证件类型选项，则更新 optionsData 中的证件类型选项
      if (this.selectorItem.IDCardTypeOptions) {
        this.optionsData.证件类型 = this.selectorItem.IDCardTypeOptions
        console.log('证件类型选项:', this.selectorItem.IDCardTypeOptions)
      }
      // 如果 selectorItem 中有性别选项，则更新 optionsData 中的性别选项
      if (this.selectorItem.genderOptions) {
        this.optionsData.性别 = this.selectorItem.genderOptions
        console.log('性别选项:', this.selectorItem.genderOptions)
      }
      // 如果 selectorItem 中有政治面貌选项，则更新 optionsData 中的政治面貌选项
      if (this.selectorItem.politicalStatusOptions) {
        this.optionsData.政治面貌 = this.selectorItem.politicalStatusOptions
        console.log('政治面貌选项:', this.selectorItem.politicalStatusOptions)
      }
    },
    // 获取选项数据

    getOptions (key) {
      let result = []
      // 根据不同的键名映射到对应的选项数据
      switch (key) {
        case '性别':
          result = (this.selectorItem.genderOptions && this.selectorItem.genderOptions.length > 0)
            ? this.selectorItem.genderOptions
            : this.optionsData.性别
          break
        case '学院':
          result = (this.selectorItem.collegeOptions && this.selectorItem.collegeOptions.length > 0)
            ? this.selectorItem.collegeOptions
            : this.optionsData.学院
          break
        case '证件类型':
          result = (this.selectorItem.IDCardTypeOptions && this.selectorItem.IDCardTypeOptions.length > 0)
            ? this.selectorItem.IDCardTypeOptions
            : this.optionsData.证件类型
          break
        case '民族':
          result = (this.selectorItem.nationalityOptions && this.selectorItem.nationalityOptions.length > 0)
            ? this.selectorItem.nationalityOptions
            : this.optionsData.民族
          break
        case '政治面貌':
          result = (this.selectorItem.politicalStatusOptions && this.selectorItem.politicalStatusOptions.length > 0)
            ? this.selectorItem.politicalStatusOptions
            : this.optionsData.政治面貌
          break
        default:
          // 对于其他键，尝试从 selectorItem 获取或使用本地的 optionsData
          if (this.selectorItem && this.selectorItem[key + 'Options'] && this.selectorItem[key + 'Options'].length > 0) {
            result = this.selectorItem[key + 'Options']
          } else {
            result = this.optionsData[key] || []
          }
      }
      // 确保返回的是数组
      result = Array.isArray(result) ? result : []
      // 调试信息
      console.log(`获取选项数据 for ${key}:`, result)
      return result
    },
    // 获取选择器选项数据
    getSelectorItem () {
      this.selectorItem = getSelectorInfo()
      // 如果 selectorItem 中有学院选项，则更新 optionsData 中的学院选项
      if (this.selectorItem.collegeOptions) {
        this.optionsData.学院 = this.selectorItem.collegeOptions
      }
      // 如果 selectorItem 中有民族选项，则更新 optionsData 中的民族选项
      if (this.selectorItem.nationalityOptions) {
        this.optionsData.民族 = this.selectorItem.nationalityOptions
      }
      // 如果 selectorItem 中有证件类型选项，则更新 optionsData 中的证件类型选项
      if (this.selectorItem.IDCardTypeOptions) {
        this.optionsData.证件类型 = this.selectorItem.IDCardTypeOptions
      }
      // 如果 selectorItem 中有性别选项，则更新 optionsData 中的性别选项
      if (this.selectorItem.genderOptions) {
        this.optionsData.性别 = this.selectorItem.genderOptions
      }
      // 如果 selectorItem 中有政治面貌选项，则更新 optionsData 中的政治面貌选项
      if (this.selectorItem.politicalStatusOptions) {
        this.optionsData.政治面貌 = this.selectorItem.politicalStatusOptions
      }
    },
    addTeamMember () {
    // 添加新队员信息
      if (!this.value1) {
        this.teamMembers.push({
          name: '',
          studentId: '',
          college: '',
          major: ''
        })
      }
    },
    selectImage () {
      this.$refs.fileInput.click() // 触发隐藏的文件输入点击事件
    },
    onFileChange (e) {
      const files = e.target.files // 获取选中的文件列表
      if (files) {
        // 清空现有的图片URL数组
        this.imageUrls = []
        // 遍历文件列表，为每个文件创建URL
        for (let i = 0; i < files.length; i++) {
          this.imageUrls.push(URL.createObjectURL(files[i]))
        }
      }
    },
    // 提交表单
    async onSubmit () {
      // 将表格数据转换为表单对象
      const form = {}
      // 遍历表格数据，将键值对添加到表单对象中
      this.tableData.forEach(row => {
        form[row.key1] = row.value1
        form[row.key2] = row.value2
      })
      // 添加团队相关信息
      form.isTeam = this.value1 ? 0 : 1 // 0表示个人报名，1表示团队报名
      form.isWillingToMerge = this.value2 ? 0 : 1 // 0表示拒绝合并，1表示接受合并
      form.teamMembers = this.teamMembers
      form.memberCount = this.teamMembers.length
      // 添加图片信息（如果有）
      if (this.imageUrls.length > 0) {
        form.avatar = this.imageUrls[0] // 这里简化处理，只取第一张图片
      }
      // 添加默认值
      form.activityStatus = 0 // 0 表示预报名状态
      form.editDate = new Date().toISOString()
      // 政治面貌使用单选，直接赋值
      form.politicalOptions = form['政治面貌'] || ''
      form.province = form['目标省（市）'] || ''
      form.city = form['目标市（区）'] || ''
      form.county = form['目标县（县）'] || ''
      form.senior = form['目标高中'] || ''
      form.teamSummary = form['团队总结'] || ''
      // 验证必填字段
      if (!this.canSubmit(form)) {
        this.$message.error('请填写所有必填信息')
        return
      }
      try {
        const res = await submitForm(form)
        if (res) {
          this.$message.success('提交成功')
          // 可以在这里添加跳转到其他页面的逻辑
          // this.$router.push('/pc/')
        }
      } catch (error) {
        this.$message.error('提交失败，请重试')
        console.error('提交失败:', error)
      }
    },
    // 验证表单是否可以提交
    canSubmit (form) {
      // 检查字段是否为非空字符串
      const isNotEmpty = value => typeof value === 'string' && value.trim() !== ''
      // 检查必填字段
      const requiredFields = [
        '姓名', '性别', '学号', '学院', '证件类型', '证件号码',
        '民族', '专业', 'QQ号码', '手机号码', '政治面貌',
        '目标省（市）', '目标市（区）', '目标县（县）', '目标高中'
      ]
      // 验证所有必填字段
      const hasAllRequired = requiredFields.every(field => isNotEmpty(form[field]))
      // 检查头像是否已上传
      const hasAvatar = this.imageUrls && this.imageUrls.length > 0
      // 检查团队相关字段
      const hasTeamFields =
        typeof form.isTeam === 'number' &&
        typeof form.isWillingToMerge === 'number' &&
        typeof form.memberCount === 'number'
      // 输出调试信息
      console.log('Form validation:', {
        hasAllRequired,
        hasAvatar,
        hasTeamFields,
        formFields: form
      })
      return hasAllRequired && hasAvatar && hasTeamFields
    }
  }
}
</script>

<style scoped>
   .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
    padding: 0;
  }
  .el-header {
  background: #8F0100; /* 使用线性渐变，颜色从左到右变化 */
  background-size: cover;
  z-index: 10; /* 确保顶栏在上方 */
  display: flex;
  align-items: center;
  justify-content: center;
}
  .el-switch{
    margin-bottom: 0;
    padding: 0;
  }

  .upload-container {
  width: 100%; /* 根据需要调整大小 */
  min-height: 200px; /* 根据需要调整大小 */
  border: 2px dashed #ccc; /* 边框样式 */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.plus-sign {
  font-size: 40px; /* ＋号大小 */
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.uploaded-image {
  max-width: 200px; /* 根据需要调整图片大小 */
  margin: 5px;
}
</style>
