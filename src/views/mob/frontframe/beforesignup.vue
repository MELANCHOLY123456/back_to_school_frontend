<template>

  <div>

    <!-- 中心的容器 -->
    <div class="container">
      <!-- 证件类型选择框 -->
      <van-field v-model="IDCardType" label="证件类型" placeholder="请选择证件类型" is-link :readonly="true"
        @click="showIdCardTypePicker" />

      <!-- 身份证号输入框 -->
      <van-field v-model="IDCardNum" @blur="trimText('IDCardNum'); upperText('IDCardNum')" :label="IDCardNumLabel"
        :placeholder="'请输入' + IDCardNumLabel" maxlength="18"
        :rules="[{ required: true, message: '请输入' + IDCardNumLabel }]" />

      <!-- 验证按钮 -->
      <van-button class="commonBtn" style="margin-top: 5vw;" color="linear-gradient(to right, #D32F2F, #F59600)"
        size="large" round @click="handleRealName">验证</van-button>
      <!-- 页面底部的注释 -->
      <div class="footer-note">
        <p><strong>注意事项</strong></p>
        <p>身份证号用于母校回访活动进行期间的保险购买，以及验证身份证号与学号是否匹配。</p>
      </div>

      <!-- 证件类型选择框的弹出框 -->
      <van-popup round v-model="showPicker" position="bottom"  :style="{ height: '70%' }">
        <van-picker show-toolbar :columns="IDCardTypeOptions" @confirm="onIdCardTypeConfirm"
          @cancel="showPicker = false" />
      </van-popup>
    </div>

  </div>
</template>

<script>
import { getSelfInf, realName } from '@/api/getInf'
import { Toast } from 'vant'

export default {
  name: 'mSignupBefore',
  mounted () {
    // this.getSelfInf() // 注释掉未定义的方法调用
  },
  data () {
    return {
      IDCardType: '', // 选择的证件类型
      IDCardNum: '', // 输入的身份证号
      showPicker: false, // 控制证件类型选择器的显示与隐藏
      IDCardTypeOptions: this.$store.state.selectorItem.selectorItem.IDCardTypeOptions // 证件类型
    }
  },
  computed: {
    IDCardNumLabel () {
      if (this.IDCardType === '中国大陆居民身份证' || this.IDCardType === '') {
        return '身份证号'
      } else {
        return '通行证号'
      }
    }
  },
  methods: {
    // 跳转到主页
    navigateToHome () {
      this.$router.push('/')
    },
    // 显示证件类型选择器
    showIdCardTypePicker () {
      this.showPicker = true
    },
    // 证件类型选择器确认操作
    onIdCardTypeConfirm (value) {
      this.IDCardType = value
      this.showPicker = false
    },
    // 身份证号验证
    validate () {
      if (!this.IDCardType) {
        Toast.fail('请选择证件类型')
        return false
      }
      if (!this.IDCardNum) {
        Toast.fail('请输入身份证号')
        return false
      }
      if (!this.validateIDCard(this.IDCardNum)) {
        Toast.fail('身份证号无效')
        return false
      }
      return true
    },
    // 文本格式化函数
    trimText (field) {
      if (this[field]) {
        this[field] = this[field].trim()
      }
    },
    upperText (field) {
      if (this[field]) {
        this[field] = this[field].toUpperCase()
      }
    },

    // 证件号码验证
    validateIDCard (value) {
      const IDCardType = this.IDCardType

      // 校验中国大陆居民身份证
      if (IDCardType === '中国大陆居民身份证') {
        const reg = /^[1-9]\d{5}(18|19|20|21|22)\d{2}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}([0-9Xx])$/
        if (!reg.test(value)) {
          return false // 正则校验未通过
        }
        // 计算并验证校验码
        return this.checkIDChecksum(value)
      }

      return true // 港澳台不检查
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
    async handleRealName () {
      if (this.validate() === true) {
        try {
          const realNameRes = await realName({ IDCardType: this.IDCardType, IDCardNum: this.IDCardNum })
          console.log(realNameRes)
          if (realNameRes === undefined) {
            Toast.fail('实名认证失败，身份证号可能与学号不匹配')
            return
          }
          const res = await getSelfInf()
          this.$store.commit('selfInf/setForm', res.data.form)
          this.$store.commit('selectorItem/setSelectorItem', res.data.selectorItem)

          this.$store.commit('accInfo/setIsRealName', 1)

          this.$router.push('/mob/f/signup')
        } catch (error) {
          console.error('实名认证请求失败:', error)
          Toast.fail('实名认证请求失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped>
.signup-before-page {
  background: linear-gradient(to bottom, #6a11cb, #2575fc);
  /* 渐变色背景 */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

/* 中心容器 */
.container {
  /* position: fixed; */
  width: 89%;
  /* height: 60vh; */
  margin: 5vh auto;
  padding: 3vh 3vw;
  background: white;
  border-radius: 10px;
  box-shadow: #00000037 0 0 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 按钮样式 */
.van-button {
  margin-top: 20px;
}

/* 底部注释 */
.footer-note {
  text-align: center;
  color: #070707b8;
  font-size: 13px;
  padding: 20px;
}

.footer-note p {
  margin: 5px 0;
}
</style>
