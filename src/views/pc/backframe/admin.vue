<template>
  <div class="admin-page">
    <!-- 搜索框 -->
    <el-row :gutter="20" class="search-row">
      <el-col :span="5">
        <el-input style="width: 100%;" v-model="search.学号" placeholder="请输入学号"></el-input>
      </el-col>
      <el-col :span="5">
        <!-- 查看权限下拉列表 -->
        <el-select style="width: 100%;" v-model="search.后台查看权限" placeholder="查看权限" filterable clearable>
          <el-option label="有" value=true></el-option>
          <el-option label="无" value=false></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <!-- 编辑权限下拉列表 -->
        <el-select style="width: 100%;" v-model="search.后台编辑权限" placeholder="编辑权限" filterable clearable>
          <el-option label="有" value=true></el-option>
          <el-option label="无" value=false></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="success" @click="emptyToInput">清空条件</el-button>
        <el-button type="success" @click="openAddDialog">添加</el-button>
      </el-col>
    </el-row>

    <!-- 操作按钮 -->
    <el-row :gutter="10" class="search-row">
      <el-col :span="4">
        <el-button style="width:100%;" type="danger" @click="removeSelectedPermissions" :disabled="selectedRows.length === 0">移除选中账户权限</el-button>
      </el-col>
      <el-col :span="4">
        <el-button style="width:100%;" type="primary" @click="setSelectedAsView" :disabled="selectedRows.length === 0">设置选中账户权限为查看</el-button>
      </el-col>
      <el-col :span="4">
        <el-button style="width:100%;" type="success" @click="setSelectedAsEdit" :disabled="selectedRows.length === 0">设置选中账户权限为编辑</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="adminAccount"
    @selection-change="handleSelectionChange"
    v-model="selectedRows" border style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column label="学号" prop="学号"></el-table-column>
      <el-table-column label="查看权限" prop="后台查看权限">
        <template slot-scope="scope">
          <el-checkbox :value="scope.row.后台查看权限" disabled></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="编辑权限" prop="后台编辑权限">
        <template slot-scope="scope">
          <el-checkbox :value="scope.row.后台编辑权限" disabled></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="modifyPermissions(scope.row)">修改权限</el-button> -->
          <el-button size="mini" type="danger" @click="deleteRow(scope.row)">清除权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :hide-on-single-page=true
      @current-change="handlePageChange"
      layout="prev, pager, next, jumper"
    ></el-pagination>

    <!-- 添加权限弹窗 -->
    <el-dialog title="添加权限" :visible.sync="dialogVisible" width="400px">
      <el-form :model="newPermission">
        <el-form-item label="账号">
          <el-input v-model="newPermission.学号" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="权限 (赋予编辑权限请同时勾选上查看权限)">
          <el-checkbox-group v-model="newPermission.permissions">
            <el-checkbox label="view">查看权限</el-checkbox>
            <el-checkbox label="edit" @change="syncEditPermission">编辑权限</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminAccount, updateAdminAccount } from '@/api/getInf'

export default {
  name: 'backFrameAdmin',
  data () {
    return {
      search: {
        学号: '',
        后台查看权限: '',
        后台编辑权限: ''
      },
      adminAccount: [],
      backAdminAccount: [],
      total: 0, // 内容总数
      currentPage: 1, // 默认页数
      pageSize: 99999, // 每页条目数
      dialogVisible: false,
      newPermission: {
        学号: '',
        permissions: []
      },
      selectedRows: [] // 存储选中的行
    }
  },
  mounted () {
    this.getAdminAccount()
  },
  methods: {
    async getAdminAccount () {
      const res = await getAdminAccount()
      this.adminAccount = res.data.adminAccount
      for (let i = 0; i < this.adminAccount.length; i++) {
        this.adminAccount[i].后台查看权限 = this.adminAccount[i].后台查看权限 === 1
        this.adminAccount[i].后台编辑权限 = this.adminAccount[i].后台编辑权限 === 1
      }
      this.backAdminAccount = this.adminAccount
      this.total = res.data.total
    },
    handleSearch () {
      console.log('搜索条件', this.search)
      const filteredData = this.backAdminAccount.filter(item => {
        // console.log('item', item)
        // console.log('item.后台编辑权限', item.后台编辑权限)
        // console.log('item.后台编辑权限', Boolean(item.后台编辑权限))
        // console.log('item.后台编辑权限', item.后台编辑权限)
        return (
        // 提取学号条件
          (this.search.学号 ? item.学号.includes(this.search.学号) : true) &&
        // 将后台查看权限转换为布尔值
        (this.search.后台查看权限 ? String(item.后台查看权限) === String(this.search.后台查看权限) : true) &&
        // 将后台编辑权限转换为布尔值
        (this.search.后台编辑权限 ? String(item.后台编辑权限) === String(this.search.后台编辑权限) : true)
        )
      })
      this.adminAccount = filteredData
    },
    // 分页处理
    handlePageChange (page) {
      this.currentPage = page
      console.log('当前页:', page)
      // 根据当前页更新表格数据
    },
    // 筛选相关操作
    emptyToInput () {
      this.search.学号 = ''
      this.search.后台查看权限 = ''
      this.search.后台编辑权限 = ''
      this.adminAccount = this.backAdminAccount
    },
    // 打开添加权限弹窗
    openAddDialog () {
      this.dialogVisible = true
      this.newPermission = { 学号: '', permissions: [] }
    },
    // 删除表格一行
    async deleteRow (row) {
      this.backAdminAccount = this.adminAccount = this.backAdminAccount.filter(item => item.学号 !== row.学号)
      await updateAdminAccount(row.学号, 0, 0)
      this.total -= 1
      this.$message.success('删除成功')
    },
    // 同步编辑权限，选择了编辑权限时，查看权限自动选中
    syncEditPermission (isChecked) {
      if (isChecked) {
        this.newPermission.permissions.push('view')
      } else {
        this.newPermission.permissions = this.newPermission.permissions.filter(item => item !== 'view')
      }
    },
    // 添加权限
    async handleAdd () {
      if (this.newPermission.学号 && this.newPermission.permissions.length) {
        // 模拟添加数据
        this.adminAccount.push({
          学号: this.newPermission.学号,
          后台查看权限: !!this.newPermission.permissions.includes('view'),
          后台编辑权限: !!this.newPermission.permissions.includes('edit')
        })
        try {
          await updateAdminAccount(this.newPermission.学号, this.newPermission.permissions.includes('view') ? 1 : 0, this.newPermission.permissions.includes('edit') ? 1 : 0)
        } catch (e) {
          this.$message.error(`添加失败:${e.response.data.message}`)
          return
        }
        this.$message.success('添加成功')
        this.total += 1
        this.dialogVisible = false
      } else {
        this.$message.error('请输入学号和权限')
      }
    },

    // 表格相关操作
    // 移除选中账户权限
    async removeSelectedPermissions () {
      this.selectedRows.forEach(async row => {
        row.后台查看权限 = false
        row.后台编辑权限 = false
        await updateAdminAccount(row.学号, 0, 0)
      })
      this.$message.success('选中账户权限已移除')
    },

    // 设置选中账户权限为查看
    async setSelectedAsView () {
      this.selectedRows.forEach(async row => {
        row.后台查看权限 = true
        row.后台编辑权限 = false // 确保设置查看权限时，编辑权限不被选中
        await updateAdminAccount(row.学号, 1, 0)
      })
      this.$message.success('选中账户权限已设置为查看')
    },

    // 设置选中账户权限为编辑
    async setSelectedAsEdit () {
      this.selectedRows.forEach(async row => {
        row.后台查看权限 = true // 编辑权限时，确保查看权限也为选中
        row.后台编辑权限 = true
        await updateAdminAccount(row.学号, 1, 1)
      })
      this.$message.success('选中账户权限已设置为编辑')
    },
    handleSelectionChange (val) {
      this.selectedRows = val
    }
  }
}
</script>

<style scoped>
.search-row {
  margin-bottom: 20px;
}
.dialog-footer {
  text-align: right;
}
</style>
