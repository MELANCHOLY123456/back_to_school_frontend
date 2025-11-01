<template>
  <div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr class="header" :class="{ 'odd-row': true }">
            <th>序号</th>
            <th>姓名</th>
            <th>学号</th>
            <th>学院</th>
            <th>专业</th>
            <th>证件类型</th>
            <th>身份证号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in localTeamMembers" :key="index" class="data-row" :class="{ 'odd-row': index % 2 === 1 }">
            <td>{{ index + 1 }}</td>
            <td>
              <span v-if="!item.editingName" @click="editName(index)">{{ item.name }}</span>
              <input v-else v-model="item.name" @blur="saveName(index)" @keyup.enter="saveName(index)" placeholder="请输入姓名" />
            </td>
            <td>
              <span v-if="!item.editingStudentId" @click="editStudentId(index)">{{ item.stuID }}</span>
              <input v-else v-model="item.stuID" @blur="saveStudentId(index)" @keyup.enter="saveStudentId(index)" placeholder="请输入学号" />
            </td>
            <td>
              <span v-if="!item.editingCollege" @click="editCollege(index)">{{ item.college }}</span>
              <select v-else v-model="item.college" @blur="saveCollege(index)">
                <option v-for="college in selectorItem.collegeOptions" :key="college" :value="college">{{ college }}</option>
              </select>
            </td>
            <td>
              <span v-if="!item.editingMajor" @click="editMajor(index)">{{ item.major }}</span>
              <input v-else v-model="item.major" @blur="saveMajor(index)" @keyup.enter="saveMajor(index)" placeholder="请输入专业" />
            </td>
            <td>
              <span v-if="!item.editingIDCardType" @click="editIDCardType(index)">{{ item.IDCardType }}</span>
              <select v-else v-model="item.IDCardType" @blur="saveIDCardType(index)">
                <option v-for="type in selectorItem.IDCardTypeOptions" :key="type" :value="type">{{ type }}</option>
              </select>
            </td>
            <td>
              <span v-if="!item.editingIDCard" @click="editIDCard(index)">{{ item.IDCardNum }}</span>
              <input v-else v-model="item.IDCardNum" @blur="saveIDCard(index)" @keyup.enter="saveIDCard(index)" placeholder="请输入身份证号" />
            </td>
            <td>
              <van-button type="danger" size="small" @click="deleteRow(index)">删除</van-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'comTable',
  props: {
    teamMembers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      localTeamMembers: JSON.parse(JSON.stringify(this.teamMembers)), // 使用深拷贝
      selectorItem: this.$store.state.selectorItem.selectorItem
      // collegeOptions: ['学院A', '学院B', '学院C'],
      // IDCardOptions: ['身份证', '护照', '其他证件类型']
    }
  },
  watch: {
    teamMembers: {
      handler (newVal) {
        this.localTeamMembers = JSON.parse(JSON.stringify(newVal)) // 当 teamMembers 更新时更新本地副本
      },
      deep: true
    }
  },
  methods: {
    editName (index) {
      this.$set(this.localTeamMembers[index], 'editingName', true)
    },
    saveName (index) {
      this.$set(this.localTeamMembers[index], 'editingName', false)
      this.updateTeamMembers()
    },
    editStudentId (index) {
      this.$set(this.localTeamMembers[index], 'editingStudentId', true)
    },
    saveStudentId (index) {
      this.$set(this.localTeamMembers[index], 'editingStudentId', false)
      this.updateTeamMembers()
    },
    editCollege (index) {
      this.$set(this.localTeamMembers[index], 'editingCollege', true)
    },
    saveCollege (index) {
      this.$set(this.localTeamMembers[index], 'editingCollege', false)
      this.updateTeamMembers()
    },
    editMajor (index) {
      this.$set(this.localTeamMembers[index], 'editingMajor', true)
    },
    saveMajor (index) {
      this.$set(this.localTeamMembers[index], 'editingMajor', false)
      this.updateTeamMembers()
    },
    editIDCardType (index) {
      this.$set(this.localTeamMembers[index], 'editingIDCardType', true)
    },
    saveIDCardType (index) {
      this.$set(this.localTeamMembers[index], 'editingIDCardType', false)
      this.updateTeamMembers()
    },
    editIDCard (index) {
      this.$set(this.localTeamMembers[index], 'editingIDCard', true)
    },
    saveIDCard (index) {
      this.$set(this.localTeamMembers[index], 'editingIDCard', false)
      this.updateTeamMembers()
    },
    deleteRow (index) {
      this.localTeamMembers.splice(index, 1)
      this.updateTeamMembers()
    },
    updateTeamMembers () {
      this.$emit('update-teamMembers', JSON.parse(JSON.stringify(this.localTeamMembers)))
    }
  }
}
</script>

<style scoped>
.table-scroll {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 204px;
  padding: 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: auto;
  white-space: nowrap;
}
table {
  width: 100%;
  border-collapse: collapse;
}
.header {
  background-color: #f7f7f7;
}
.header th, .data-row td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}
.data-row td {
  cursor: pointer;
}
.odd-row {
  background-color: #ece9e9a8;
}
</style>
