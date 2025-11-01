<template>
  <div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr class="header" :class="{ 'odd-row': true }">
            <th>序号</th>
            <th>姓名</th>
            <th>证件类型</th>
            <th>身份证号</th>
            <th>学号</th>
            <th>学院</th>
            <th>专业</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in members"
            :key="index"
            class="data-row"
            :class="{ 'odd-row': index % 2 === 1 }">
            <td>{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.IDCardType }}</td>
            <td>{{ row.IDCardNum }}</td>
            <td>{{ row.stuID }}</td>
            <td>{{ row.college }}</td>
            <td>{{ row.major }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comTableNoEdit',
  props: {
    members: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 如果需要修改成员信息，可以通过事件通知父组件
    updateMembers (newMembers) {
      this.$emit('update:members', newMembers)
    }
  }
}
</script>

<style scoped>
.table-scroll {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
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

.header th,
.data-row td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}

/* 斑马纹效果 */
.odd-row {
  background-color: #ece9e9a8;
}
</style>
