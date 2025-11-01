<template>
  <div>
    <van-button type="info" plain @click="showAddModal = true" :disabled="membersTotal >= props.队员上限">添加成员</van-button>

    <van-popup round closeable close-icon="close" v-model="showAddModal" position="bottom" :style="{ height: '45%' }">
      <div class="popup-content">
        <van-field v-model="member.name" label="姓名" placeholder="请输入姓名" />
        <mPopPicker  :initSelected="member.IDCardType" :options="selectorItem.IDCardTypeOptions" label="证件类型" @confirm="getIDCardType" />
        <van-field v-model="member.IDCardNum" :label="IDCardNumLabel" :placeholder="'请输入' +  IDCardNumLabel" />
        <van-field v-model="member.stuID" label="学号" placeholder="请输入学号" />
        <mPopPicker  :initSelected="member.college" :options="selectorItem.collegeOptions" label="学院" @confirm="getCollege" />
        <van-field v-model="member.major" label="专业" placeholder="请输入专业" />

        <!-- 自定义的按钮区域 -->
        <div class="button-container">
          <div class="half-button" @click="showAddModal = false">取消</div>
          <div class="half-button confirm" @click="addMember">确认添加</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getProps } from '@/api/getInf'
import mPopPicker from './mPopPicker.vue'
import { Toast } from 'vant'

export default {
  name: 'mTeamMemberTableItem',
  props: {
    members: {
      type: Array,
      required: true
    },
    selectorItem: {
      type: Object,
      required: true
    },
    membersTotal: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      showAddModal: false,
      member: {
        name: '',
        IDCardType: '',
        IDCardNum: '',
        stuID: '',
        college: '',
        major: ''
      },
      props: this.$store.state.sysProps.props
    }
  },
  computed: {
    IDCardNumLabel () {
      if (this.member.IDCardType === '') {
        return '身份证号'
      }
      return (this.member.IDCardType === '中国大陆居民身份证') ? '身份证号' : '通行证号'
    },
    canAdd () {
      return !(this.member.name && this.member.IDCardType && this.member.IDCardNum && this.member.stuID && this.member.college && this.member.major)
    }
  },
  methods: {
    async getProps () {
      const res = await getProps()
      if (res && res?.data) {
        this.props = res.data.props
        this.$store.commit('sysProps/setProps', this.props)
      }
    },
    addMember () {
      if (this.canAdd) {
        Toast('请填写完整信息')
        return
      }
      const newMember = {
        ...this.member
      }

      const index = this.members.findIndex(member => member.stuID === newMember.stuID)
      if (index !== -1) {
        this.$emit('update-members', [
          ...this.members.slice(0, index),
          newMember,
          ...this.members.slice(index + 1)
        ])
      } else {
        this.$emit('update-members', [newMember, ...this.members])
      }

      this.resetForm()
      this.showAddModal = false
    },
    resetForm () {
      this.member = {
        name: '',
        IDCardType: '',
        IDCardNum: '',
        stuID: '',
        college: '',
        major: ''
      }
    },
    getIDCardType (val) {
      this.member.IDCardType = val
    },
    getCollege (val) {
      this.member.college = val
    }
  },
  components: {
    mPopPicker
  }
}
</script>

<style scoped>
.popup-content {
  padding: 16px;
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  width: 80%; /* 宽度占屏幕的80% */
  margin: 0 auto;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.half-button {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  background-color: #f2f2f2;
  color: #333;
  cursor: pointer;
}

.half-button.confirm {
  background-color: #409eff;
  color: #fff;
}

.half-button:not(:last-child) {
  border-right: 1px solid #e5e5e5;
}

.half-button:hover {
  opacity: 0.9;
  transition: opacity 0.2s;
}
</style>
