<script setup>

const vLazyloading = {
  mounted: (el, binding) => {
    const watcher = new IntersectionObserver(onEnterView);
    watcher.observe(el);
    function onEnterView(el, observer) {
      if (el[0].isIntersecting) {
        el[0].target.setAttribute('src', el[0].target.dataset.src);
        observer.unobserve(el[0].target);
      }
    }
  }
}
</script>

<template>
  <img data-src="https://picsum.photos/300/200?random=2" src="" v-lazyloading>
</template>

<!-- input綁定自定義lazyloading事件達成懶加載(進入可視範圍內才會加上正確src) -->
<!-- copy到主要組件上使用 -->