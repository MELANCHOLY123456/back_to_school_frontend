<template>
    <van-cell center :title="label">
      <template #right-icon>
        <van-switch :value="checked" @input="onInput" size="24" />
      </template>
    </van-cell>
  </template>

<script>
export default {
  name: 'mSwitch',
  props: {
    label: { // 修正拼写
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      checked: this.value
    }
  },
  emits: ['confirm'],
  methods: {
    onInput (checked) {
      this.checked = checked
      this.$emit('confirm', checked) // 触发更新事件
    }
  },
  watch: {
    value (newValue) {
      this.checked = newValue
    }
  }
}
</script>

  <style scoped>
  /* 样式可以在这里添加 */
  </style>
