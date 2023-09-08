<script setup>
import { ref } from 'vue'

const text = ref('')

const vThrottle = {
  mounted: (el, binding) => {
    let clear;
    el.addEventListener('input', () => {
      clearTimeout(clear);
      clear = setTimeout(() => el.dispatchEvent(new Event('change')), binding.value || 500);
    });
  }
}
</script>

<template>
  <input type="text" v-throttle="1000" v-model.lazy="text">
</template>

<style scoped>
input {
  outline: none;
  padding: 6px
}
</style>
<!-- 把v-model加上lazy修飾->改成監聽change行為(輸入框發生改變且失去焦點時觸發) -->
<!-- input綁定自定義throttle事件達成節流(n毫秒後才會change) -->
<!-- copy到主要組件上使用 -->