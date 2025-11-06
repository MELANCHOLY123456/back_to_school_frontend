<template>
  <div>
    <!-- 标题栏 -->
    <div style="background: #8F0100; background-size: cover; z-index: 10; display: flex; align-items: center; justify-content: space-between; height: 60px; padding: 0 20px;">
      <van-button icon="arrow-left" plain @click="goBack" size="small" style="font-size: 16px; color: white; border: none; background: transparent;">返回</van-button>
      <div style="font-size: 30px; font-family: 宋体; color: white;">湖南师范大学招生办</div>
      <div style="width: 60px;"></div> <!-- 占位元素，保持标题居中 -->
    </div>
    <!-- 表单开始 -->
    <van-form :model="form" ref="form" validate-first name="signupForm" style="padding: 20px;">
      <!-- 队长信息 -->
      <van-cell-group title="队长信息" inset>
        <van-cell>
          <van-field autofocus @blur="trimText('name')" v-model="form.name" name="name" label="姓名" placeholder="姓名"
            :rules="[{ pattern: namePatten, message: '姓名不能为空' }]" />
          <!-- 性别选择器 -->
          <mPopPicker :options="selectorItem.genderOptions" label="性别" :initSelected="form.gender"
            @confirm="getGender" />
          <van-field @blur="trimText('stuID')" v-model="form.stuID" label="学号" placeholder="请输入学号"
            :rules="[{ pattern: stuIDPattern, message: '学号格式不正确' }]" />
          <!-- 学院选择器 -->
          <mPopPicker :options="selectorItem.collegeOptions" label="学院" :initSelected="form.college"
            @confirm="getCollege" />
          <!-- 证件类型选择器 -->
          <mPopPicker :options="selectorItem.IDCardTypeOptions" label="证件类型" :initSelected="form.IDCardType"
            @confirm="getIDCardType" />
          <van-field @blur="trimText('IDCardNum'); upperText('IDCardNum')" v-model="form.IDCardNum" label="证件号码"
            placeholder="请输入证件号码" :rules="[{ validator: validateIDCard, message: '证件号码不正确' }]" />
          <mPopPicker :options="selectorItem.nationalityOptions" label="民族" :initSelected="form.nationality"
            @confirm="getNationality" />
          <mPopPicker :options="selectorItem.politicalStatusOptions" label="政治面貌" :initSelected="form.politicalStatus"
            @confirm="getPoliticalStatus" />
          <van-field @blur="trimText('major')" v-model="form.major" label="专业" placeholder="请输入专业全称"
            :rules="[{ pattern: majorPattern, message: '专业不能为空' }]" />
          <van-field @blur="trimText('QQNum')" v-model="form.QQNum" label="QQ号码" placeholder="请输入QQ号码"
            :rules="[{ pattern: QQNumPattern, message: 'QQ号码不正确' }]" />
          <van-field @blur="trimText('phone')" v-model="form.phone" label="手机号码" placeholder="请输入手机号码"
            :rules="[{ pattern: phonePattern, message: '手机号码不正确' }]" />
          <!-- 图片上传区域 -->
          <van-field readonly label="证件照" placeholder="请上传个人证件照">
            <template #button>
              <!-- 容器调整布局 -->
              <div
                style="display: flex; flex-direction: column; align-items: flex-start; padding-right: 5%; min-width: 30vw;">
                <!-- 显示上传图片 -->
                <van-image v-if="form.avatar" width="20%" height="auto" :src="form.avatar"
                  style="margin-bottom: 10px; border-radius: 10px;" />
                <!-- 按钮1 -->
                <van-button type="warning" plain hairline round size="small" @click="triggerHelp"
                  style="margin-bottom: 5px;">
                  如何压缩图片大小？
                </van-button>
                <!-- 按钮2 -->
                <van-button type="info" plain hairline round size="small" @click="triggerUpload">
                  上传图片
                </van-button>
                <!-- 隐藏的文件输入框 -->
                <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" style="display: none;" />
              </div>
            </template>
          </van-field>
        </van-cell>
      </van-cell-group>
      <!-- 队伍意向信息 -->
      <van-cell-group title="队伍意向信息" inset>
        <!-- 目标地区选择 -->
        <van-cell :readonly="true" :clickable="true" name="districtPicker" :value="district" title="目标地区"
          :placeholder="'点击选择目标地区'" @click="districtPicker = true" />
        <van-popup v-model="districtPicker" position="bottom" item-height="50px" round visible-item-count="10"
          :style="{ height: '60%' }">
          <van-area title="选择" :area-list="areaList" value="110101" @confirm="onDistrictConfirm" />
        </van-popup>
        <!-- 其他输入项 -->
        <van-field @blur="trimText('senior')" v-model="form.senior" label="目标高中" placeholder="请输入目标高中全称"
          :rules="[{ pattern: seniorPattern, message: '目标高中不能为空' }]" />
        <van-field @blur="trimText('teamSummary')" v-model="form.teamSummary" rows="2" autosize label="队伍简介"
          type="textarea" maxlength="400" placeholder="请输入队伍简介" show-word-limit
          :rules="[{ pattern: teamSummaryPattern, message: '队伍简介不能为空' }]" />
        <mSwitch label="是否愿意与其他队伍合并" :value="isWillingToMerge" @confirm="getIsWillingToMerge" />
        <mSwitch label="是否作为一个团队报名" :value="isTeam" @confirm="getIsTeam" />
        <!-- 团队信息，显示控制 -->
        <div v-show="isTeam === true">
          <van-field :value="form.memberCount" center clearable :readonly="true" :colon="true" label="队员人数">
            <template #button>
              <!-- 传入 members 和 selectorItem 数据，并监听 update-members 事件 -->
              <mTeamMemberTableItem :members="form.teamMembers" :selectorItem="selectorItem" :membersTotal="form.memberCount"
                @update-members="updateMembers" />
            </template>
          </van-field>
          <comTable :teamMembers="form.teamMembers" @update-teamMembers="updateTeamMembers" />
        </div>
      </van-cell-group>
    </van-form>
    <!-- 提交按钮 -->
    <van-row type="flex" justify="center">
      <van-col span="24">
        <van-button type="primary" :disabled="!canSubmit" @click="onSubmit" size="large" round color="#FF5968"
          class="commonBtn">提交</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import mPopPicker from '@/components/mob/mPopPicker.vue'
import mSwitch from '@/components/mob/mSwitch.vue'
import mTeamMemberTableItem from '@/components/mob/mTeamMemberTableItem.vue'
import comTable from '@/components/comTable.vue'
import { submitForm } from '@/api/getInf'
import { Toast, Notify } from 'vant'
import { areaList } from '@vant/area-data'
import { getSelectorInfo, getSignupInfo } from '@/utils/storage'

export default {
  name: 'InformationFrameIndex',
  data () {
    return {
      isTeam: false, // 是否为团队报名
      isWillingToMerge: false, // 是否愿意合并团队
      form: {
        avatar: '',
        memberCount: 0,
        teamMembers: []
      }, // 表单数据初始化
      districtPicker: false, // 地区选择弹窗的状态
      selectorItem: {}, // 下拉选择项
      areaList, // 地区数据
      namePatten: /\S+/,
      stuIDPattern: /^2\d{11}$/,
      majorPattern: /\S+/,
      QQNumPattern: /^\d{5,}$/,
      phonePattern: /^1[3456789]\d{9}$/,
      seniorPattern: /\S+/,
      teamSummaryPattern: /\S+/
    }
  },
  created () {
    this.getSelfInf()
    Notify({ type: 'primary', message: '已根据实名信息匹配部分信息，请仔细检查。' })
  },
  computed: {
    district () { // 拼接显示地区
      if (!this.form.province || !this.form.city || !this.form.county) {
        return '请点击这里选择地区!请选择地区'
      }
      return `${this.form.province}-${this.form.city}-${this.form.county}`
    },
    memberCount () {
      return Array.isArray(this.form.teamMembers) ? this.form.teamMembers.length : 0
    },
    canSubmit () {
      return this.form.name && this.form.gender && this.form.stuID && this.form.college && this.form.IDCardType && this.form.IDCardNum && this.form.nationality && this.form.major && this.form.QQNum && this.form.phone && this.form.avatar && this.form.politicalStatus && this.form.province && this.form.city && this.form.county && this.form.senior && this.form.teamSummary && (this.form.isTeam === 0 || this.form.isTeam === 1) && (this.form.isWillingToMerge === 0 || this.form.isWillingToMerge === 1) && this.form.memberCount >= 0
    }
  },
  methods: {
    getSelfInf () {
      this.form = getSignupInfo()
      this.selectorItem = getSelectorInfo()

      // 在这里设置 isWillingToMerge 和 isTeam
      this.isWillingToMerge = this.form.isWillingToMerge !== 0
      this.isTeam = this.form.isTeam !== 0
    },
    triggerHelp () {
      window.open('https://blog.csdn.net/Lucian_Chau/article/details/143977463', '_blank')
    },

    // 触发图片上传
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    // 处理文件上传
    async handleFileChange (event) {
      const file = event.target.files[0]

      if (file && file.type === 'image/jpeg' && file.size <= 100 * 1024) {
        const reader = new FileReader()
        reader.onload = (e) => { this.form.avatar = e.target.result }
        reader.readAsDataURL(file)
      } else {
        Toast('图片大小应小于 100 KB，且仅支持 JPG 格式')
      }
    },

    // 文本格式化函数
    trimText (field) {
      if (this.form[field]) {
        this.form[field] = this.form[field].trim()
      }
    },
    upperText (field) {
      if (this.form[field]) {
        this.form[field] = this.form[field].toUpperCase()
      }
    },
    // 证件号码验证
    validateIDCard (value) {
      const IDCardType = this.form.IDCardType
      // 校验中国大陆居民身份证
      if (IDCardType === '中国大陆居民身份证') {
        const reg = /^[1-9]\d{5}(18|19|20|21|22)\d{2}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}([0-9Xx])$/
        if (!reg.test(value)) {
          return false // 正则校验未通过
        }
        // 计算并验证校验码
        return this.checkIDChecksum(value)
      } else if (IDCardType === '港澳居民来往内地通行证（香港）' || IDCardType === '港澳居民来往内地通行证（澳门）') {
        // 校验港澳居民来往内地通行证（香港/澳门）
        const reg = /^[A-Z]\d{6}\(\d\)$/
        return reg.test(value)
      } else if (IDCardType === '台湾居民来往大陆通行证') {
        // 校验台湾居民来往大陆通行证
        const reg = /^[A-Z]\d{8}$/
        return reg.test(value)
      }

      return false // 无效的证件类型
    },

    // 检查身份证号码的校验码
    checkIDChecksum (id) {
      const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      const checksumChars = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      let sum = 0

      // 计算加权和
      for (let i = 0; i < 17; i++) {
        sum += id[i] * weights[i]
      }

      // 计算校验码
      const checkIndex = sum % 11
      const checkChar = checksumChars[checkIndex]

      // 校验最后一位
      return checkChar === id[17].toUpperCase()
    },
    // 更新成员列表的触发函数
    updateMembers (newMembers) {
      this.form.teamMembers = newMembers
    },
    // 底部展示表格的触发函数
    updateTeamMembers (newTeamMembers) {
      this.form.teamMembers = newTeamMembers
    },
    // 表单选择更新
    getGender (val) { this.form.gender = val },
    getCollege (val) { this.form.college = val },
    getIDCardType (val) { this.form.IDCardType = val },
    getNationality (val) { this.form.nationality = val },
    getPoliticalStatus (val) { this.form.politicalStatus = val },
    getIsWillingToMerge (val) { this.isWillingToMerge = val; this.form.isWillingToMerge = val ? 1 : 0 },
    getIsTeam (val) { this.isTeam = val; this.form.isTeam = val ? 1 : 0 },
    onDistrictConfirm (val) { // 确认地区选择
      this.form.province = val[0].name
      this.form.city = val[1].name
      this.form.county = val[2].name
      this.districtPicker = false
    },
    goBack () {
      this.$router.push('/pc/main')
    },
    async onSubmit () { // 提交表单
      if (this.form.isTeam === 1) {
        this.form.memberCount = this.memberCount
      } else {
        this.form.memberCount = 0
        this.form.teamMembers = []
      }

      if (this.form.teamMembers.length === 0) {
        this.form.memberCount = 0
        this.form.isTeam = 0
      }

      const res = await submitForm(this.form)

      if (res) {
        Toast.success('提交成功')
        this.$store.commit('selfInf/setForm', this.form)
        this.$store.commit('accInfo/setIsSignuped', 1)
        this.$store.commit('accInfo/setIsLeader', 1)
        // 提交成功后不跳转页面，留在当前页面
      }
    }
  },
  watch: {
    memberCount: {
      handler (newVal) {
        this.form.memberCount = newVal
      },
      immediate: true
    }
  },
  components: {
    mPopPicker,
    mSwitch,
    mTeamMemberTableItem,
    comTable
  }
}
</script>

<style lang="less" scoped>
/* 可以在这里添加一些PC端特有的样式 */
</style>
