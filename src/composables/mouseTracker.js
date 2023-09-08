import { ref, onMounted, onUnmounted, computed } from 'vue';

function useMouseTracker(max=100){
  const mouseInViewport = ref({
    px: {
      x: window.innerWidth/2,
      y: window.innerHeight/2,
    },
    per: {
      x: 0,
      y: 0,
    }
  })
  const mouseInViewportCenter = ref({ 
    px: {
      x: 0,
      y: 0,
    },
    per: {
      x: 0,
      y: 0,
    }
  })
  const mouseInViewportCenterCustom = ref({ //游標在中心是0 在右下x,y為1 在左上x,y為-1
      x: 0,
      y: 0,
  })

  const mouseTranslate = () =>{
    const translate_x = mouseInViewportCenterCustom.value.x*max
    const translate_y = mouseInViewportCenterCustom.value.y*max
    return `transform: translate(${translate_x}px,${translate_y}px)`
  }
  const mousemoveHandler = (event) =>{
    mouseInViewport.value.px.x = event.clientX
    mouseInViewport.value.px.y = event.clientY
    mouseInViewport.value.per.x = Number((event.clientX / window.innerWidth *100).toFixed(1))
    mouseInViewport.value.per.y = Number((event.clientY / window.innerHeight *100).toFixed(1))
    mouseInViewportCenter.value.px.x = event.clientX - window.innerWidth*0.5
    mouseInViewportCenter.value.px.y = event.clientY - window.innerHeight*0.5
    mouseInViewportCenter.value.per.x = Number(((event.clientX - window.innerWidth*0.5 )/ window.innerWidth *200).toFixed(1))
    mouseInViewportCenter.value.per.y = Number(((event.clientY - window.innerHeight*0.5 ) / window.innerHeight *200).toFixed(1))
    if(event.clientX - window.innerWidth*0.5 < 0) mouseInViewportCenterCustom.value.x = Number((((event.clientX - window.innerWidth*0.5)*-1 / window.innerWidth*2)*-1).toFixed(1))
    else mouseInViewportCenterCustom.value.x = Number(((event.clientX - window.innerWidth*0.5) / window.innerWidth*2).toFixed(1))
    if(event.clientY - window.innerHeight*0.5 < 0) mouseInViewportCenterCustom.value.y = Number((((event.clientY - window.innerHeight*0.5)*-1 / window.innerHeight*2)*-1).toFixed(1))
    else mouseInViewportCenterCustom.value.y = Number(((event.clientY - window.innerHeight*0.5) / window.innerHeight*2).toFixed(1))
  }

  onMounted(()=>{
    window.addEventListener('mousemove', mousemoveHandler)
  })
  onUnmounted(()=>{
    window.addEventListener('mousemove', mousemoveHandler)

  })
  return { mouseInViewport, mouseInViewportCenter, mouseInViewportCenterCustom, mouseTranslate }
}
export { useMouseTracker }


// 使用
// import { useMouseTracker } from './composables/mouseTracker'

// const { mouseInViewport, mouseInViewportCenter, mouseInViewportCenterCustom } = useMouseTracker()
// const slowObj = useMouseTracker(10) //傳入設定移動距離上限
// const fastObj = useMouseTracker(100)

// mouseInViewport.px.x //游標距離Viewport左上角位置
// mouseInViewport.px.y
// mouseInViewport.per.x  //游標距離Viewport左上角位置百分比
// mouseInViewport.per.y
// mouseInViewportCenter.px.x  //游標距離Viewport中心點位置
// mouseInViewportCenter.px.y
// mouseInViewportCenter.per.x  //游標距離Viewport中心點位置百分比
// mouseInViewportCenter.per.y
// mouseInViewportCenterCustom.x //游標在中心是0 在右下x,y為1 在左上x,y為-1
// mouseInViewportCenterCustom.y
// mouseTranslate() //回傳transform: translate的style

// <div class="abox" :style="slow.mouseTranslate()"></div> //調用裡面的getTranslate方法套在元素上
// <div class="bbox" :style="fast.mouseTranslate()"></div>