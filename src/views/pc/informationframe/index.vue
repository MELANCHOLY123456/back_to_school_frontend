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
        <el-input v-model="scope.row.value1" :placeholder="'请输入' + scope.row.key1"></el-input>
      </template>
    </el-table-column>
    <!-- 关键字列2 -->
    <el-table-column prop="key2" width="180"></el-table-column>
    <!-- 输入列2 -->
    <el-table-column>
      <template slot-scope="scope">
        <el-input v-model="scope.row.value2" :placeholder="'请输入' + scope.row.key1"></el-input>
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
  <el-button type="primary">提交</el-button>
</div>
  </form>
  </el-main>
</el-container>
</template>

<script>
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
        { key1: '目标省（市）', value1: '', key2: '目标市（区）', value2: '' },
        { key1: '目标县（县）', value1: '', key2: '目标高中', value2: '' }
      ],
      teamMembers: []
    }
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
