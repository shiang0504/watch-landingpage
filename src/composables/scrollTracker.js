import { ref, onMounted, onUnmounted } from 'vue';

function useScrollTracker(ele){

  const isIntoViewport_y = ref(false)
  const isIntoViewport_y_bottom = ref(false)
  const isIntoViewport_y_center = ref(false)
  const isIntoViewport_x = ref(false)
  const isIntoViewport_x_bottom = ref(false)
  const isIntoViewport_x_center = ref(false)
  const scrollInViewport = ref({
    center_x: 0,
    center_y: 0,
    bottom_x: 0,
    bottom_y: 0,
  })
  const scroll_y_translate_center = (x_max=0, y_max=0, x_min=0, y_min=0) =>{ //元素在畫面下方時拿到-1 在畫面中央時拿到0 離開上方畫面拿到1
    const translate_x = scrollInViewport.value.center_y*(x_max-x_min)+x_min
    const translate_y = scrollInViewport.value.center_y*(y_max-y_min)+y_min
    return `transform: translate(${translate_x}px, ${translate_y}px)`
  }

  const scroll_x_translate_center = (x_max=0, y_max=0, x_min=0, y_min=0) =>{ //元素在畫面右方時拿到-1 在畫面中央時拿到0 離開左方畫面拿到1
    const translate_x = scrollInViewport.value.center_x*(x_max-x_min)+x_min
    const translate_y = scrollInViewport.value.center_x*(y_max-y_min)+y_min
    return `transform: translate(${translate_x}px, ${translate_y}px)`
  }

  const scroll_y_translate_center_after = (x_max=0, y_max=0, x_min=0, y_min=0) =>{ //元素在畫面下方時(過中央前)不動作 元素在畫面中央時拿到0 離開上方畫面拿到1
    let translate_x = 0
    let translate_y = 0
    if(x_max>0) translate_x = scrollInViewport.value.center_y*(x_max-x_min)+x_min < 0 ? 0 : scrollInViewport.value.center_y*(x_max-x_min)+x_min
    else if(x_max < 0) translate_x = scrollInViewport.value.center_y*(x_max-x_min)+x_min > 0 ? 0 : scrollInViewport.value.center_y*(x_max-x_min)+x_min
    if(y_max>0) translate_y = scrollInViewport.value.center_y*(y_max-y_min)+y_min < 0 ? 0 : scrollInViewport.value.center_y*(y_max-y_min)+y_min
    else if(y_max < 0) translate_y = scrollInViewport.value.center_y*(y_max-y_min)+y_min > 0 ? 0 : scrollInViewport.value.center_y*(y_max-y_min)+y_min
    return `transform: translate(${translate_x}px, ${translate_y}px)`
  }

  const scroll_x_translate_center_after = (x_max=0, y_max=0, x_min=0, y_min=0) =>{ //元素在畫面右方時(過中央前)不動作 元素在畫面中央時拿到0 離開左方畫面拿到1
    let translate_x = 0
    let translate_y = 0
    if(x_max>0) translate_x = scrollInViewport.value.center_x*(x_max-x_min)+x_min < 0 ? 0 : scrollInViewport.value.center_x*(x_max-x_min)+x_min
    else if(x_max < 0) translate_x = scrollInViewport.value.center_x*(x_max-x_min)+x_min > 0 ? 0 : scrollInViewport.value.center_x*(x_max-x_min)+x_min
    if(y_max>0) translate_y = scrollInViewport.value.center_x*(y_max-y_min)+y_min < 0 ? 0 : scrollInViewport.value.center_x*(y_max-y_min)+y_min
    else if(y_max < 0) translate_y = scrollInViewport.value.center_x*(y_max-y_min)+y_min > 0 ? 0 : scrollInViewport.value.center_x*(y_max-y_min)+y_min
    return `transform: translate(${translate_x}px, ${translate_y}px)`
  }

  const scroll_y_translate_bottom = (x_max=0, y_max=0, x_min=0, y_min=0) =>{  // 元素在畫面下方時拿到0 在畫面中央時拿到0.5 離開上方畫面拿到1
    const translate_x = scrollInViewport.value.bottom_y*(x_max-x_min)+x_min
    const translate_y = scrollInViewport.value.bottom_y*(y_max-y_min)+y_min
    return `transform: translate(${translate_x}px, ${translate_y}px)`
  }

  const scroll_x_translate_bottom = (x_max=0, y_max=0, x_min=0, y_min=0) =>{  // 元素在畫面右方時拿到0 在畫面中央時拿到0.5 離開左方畫面拿到1
    const translate_x = scrollInViewport.value.bottom_x*(x_max-x_min)+x_min
    const translate_y = scrollInViewport.value.bottom_x*(y_max-y_min)+y_min
    return `transform: translate(${translate_x}px, ${translate_y}px)`
  }

  const scrollHandler = (event) =>{
    scrollInViewport.value.center_x = Number((((ele.value.getBoundingClientRect().left+ele.value.getBoundingClientRect().width*0.5-window.innerWidth*0.5)/(window.innerWidth*0.5+ele.value.getBoundingClientRect().width*0.5))*-1).toFixed(2)) //橫向移動
    scrollInViewport.value.center_y = Number((((ele.value.getBoundingClientRect().top+ele.value.getBoundingClientRect().height*0.5-window.innerHeight*0.5)/(window.innerHeight*0.5+ele.value.getBoundingClientRect().height*0.5))*-1).toFixed(2))
    scrollInViewport.value.bottom_x = Number(Math.abs((ele.value.getBoundingClientRect().left+ele.value.getBoundingClientRect().width)/(window.innerWidth+ele.value.getBoundingClientRect().width)-1).toFixed(2)) //橫向移動
    scrollInViewport.value.bottom_y = Number(Math.abs((ele.value.getBoundingClientRect().top+ele.value.getBoundingClientRect().height)/(window.innerHeight+ele.value.getBoundingClientRect().height)-1).toFixed(2))
    if(ele.value.getBoundingClientRect().top < window.innerHeight*2/3) isIntoViewport_y.value = true
    if(ele.value.getBoundingClientRect().top < window.innerHeight/2) isIntoViewport_y_center.value = true
    if(ele.value.getBoundingClientRect().top < window.innerHeight) isIntoViewport_y_bottom.value = true
    if(ele.value.getBoundingClientRect().left < window.innerWidth*2/3) isIntoViewport_x.value = true
    if(ele.value.getBoundingClientRect().left < window.innerWidth/2) isIntoViewport_x_center.value = true
    if(ele.value.getBoundingClientRect().left < window.innerWidth) isIntoViewport_x_bottom.value = true
  }
  onMounted(()=>{
    window.addEventListener('scroll', scrollHandler)
  })
  onUnmounted(()=>{
    window.addEventListener('scroll', scrollHandler)

  })
  return {
          scrollInViewport,
          isIntoViewport_y,
          isIntoViewport_y_center,
          isIntoViewport_y_bottom,
          isIntoViewport_x,
          isIntoViewport_x_center,
          isIntoViewport_x_bottom,
          scroll_y_translate_center,
          scroll_y_translate_center_after,
          scroll_y_translate_bottom,
          scroll_x_translate_center,
          scroll_x_translate_center_after,
          scroll_x_translate_bottom,
  }
}
export { useScrollTracker }

// 使用
// import { useScrollTracker } from './composables/scrollTracker'
// const element = ref(null) //取得元素
// const moveObj = ref(useScrollTracker(element)) //參數:dom元素

// <div ref="element"  //取得元素
// :style="moveObj.scroll_y_Translate_center(100, 100)" //綁定style 隨著滾動使元素偏移 參數:x_max、y_max 最大偏移距離
// :class="{active: moveObj.isIntoViewport_y }"> //元素若進入畫面中套用"active"class
// </div>

// scroll_y_Translate_center_after(x_max=0, y_max=0, x_min=0, y_min=0) //元素在畫面下方時(過中央前)不動作 在畫面中央時從預設位置開始移動 離開畫面時移動到指定x_max,y_max位置
// scroll_y_Translate_center = (x_max=0, y_max=0, x_min=0, y_min=0) //元素在畫面下方時從-x_max,-y_max位置開始移動 在畫面中央時在預設位置 離開畫面時移動到指定x_max,y_max位置
// scroll_y_Translate_bottom = (x_max=0, y_max=0, x_min=0, y_min=0) //元素在畫面下方時從預設位置開始移動  離開畫面時移動到指定x,y位置