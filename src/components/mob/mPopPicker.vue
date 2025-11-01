<template>
  <div>
    <van-field
      :readonly="true"
      :clickable="true"
      name="genderPicker"
      :value="selected"
      :label="label"
      :placeholder="`点击选择${label}`"
      @click="showPicker = true"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
      item-height="50px"
      round
      visible-item-count="13"
      :style="{ height: '60%' }"
    >
      <van-picker
        show-toolbar
        :columns="options"
        @confirm="onSelectorConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'mPopPicker',
  props: {
    options: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    initSelected: {
      type: String,
      required: false,
      default: '' // 如果没有传递 initSelected，可以设置默认值为空字符串
    }
  },
  data () {
    return {
      selected: this.initSelected || '', // 将选中的初始值设为 props 中的 initSelected
      showPicker: false
    }
  },
  emits: ['confirm'],
  methods: {
    onSelectorConfirm (value) {
      this.selected = value // 更新选中的值
      this.$emit('confirm', this.selected) // 发出确认事件
      this.showPicker = false // 关闭选择器
    },
    onCancel () {
      this.showPicker = false // 关闭选择器
    }
  },
  watch: {
    // 监听 initSelected 的变化，更新 selected 的值
    initSelected (newVal) {
      this.selected = newVal || '' // 如果 initSelected 为空，则 selected 设为空字符串
    }
  }
}
</script>

<style scoped>
/* 可在这里添加样式 */
</style>
