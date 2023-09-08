import { ref, onMounted, onUnmounted } from 'vue';

function useSetPosition(ele, startPoint=0, startPointEnd=1, endPoint=1, endPointEnd=1){
  const now = ref(0)
  const get0to1 = ref(0)
  const get1to0 = ref(1)
  const updata = () =>{
    now.value = Number((-ele.value.getBoundingClientRect().top / ele.value.getBoundingClientRect().height).toFixed(3))
    const startBase = Number((1/(startPointEnd-startPoint)).toFixed(3))
    const endBase = Number((1/(endPointEnd-endPoint)).toFixed(3))
    if(now.value>=startPoint && now.value<=endPoint) get0to1.value = Number(((now.value - startPoint) * startBase).toFixed(2))
    else if (now.value>endPoint && now.value<=endPointEnd) get0to1.value = Number((( endPointEnd - now.value ) * endBase).toFixed(2))
    else get0to1.value = 0
    get0to1.value = get0to1.value<0 ? 0 : get0to1.value
    get0to1.value = get0to1.value>1 ? 1 : get0to1.value

    if(now.value>=startPoint && now.value<startPointEnd) get1to0.value =Math.abs((((now.value - startPoint) * startBase) -1).toFixed(2))
    else if (now.value>=startPointEnd && now.value<endPoint) get1to0.value = 0
    else if (now.value>=endPoint && now.value<endPointEnd) get1to0.value =  Math.abs(((( endPointEnd - now.value ) * endBase) -1).toFixed(2))
    else get1to0.value = 1
    get1to0.value = get1to0.value<0 ? 0 : get1to0.value
    get1to0.value = get1to0.value>1 ? 1 : get1to0.value
  }
  onMounted(()=>{
    now.value = ref(Number((-ele.value.getBoundingClientRect().top / ele.value.getBoundingClientRect().height).toFixed(3)))
    window.addEventListener('scroll', updata)
  })
  onUnmounted(()=>window.addEventListener('scroll', updata))
  return { now, get0to1, get1to0 }
}

export { useSetPosition }


// 使用

// import { useSetPosition } from './composables/getPositionOfSticky' [1]引入
// const container = ref(null) // sticker的container的DOM [2]綁定sticky的容器

// [3]   定義錨點位置 useSetPosition(容器、進場起、訖、離場起、訖) 
// const position1 = useSetPosition(container, 0.4, 0.6, 0.8, 0.9) //sticky在container的0.4~0.6位置得到0~1/1~0的值 0.8~0.9位置得到1~0/0~1的值
// const position2 = useSetPosition(container, 0.1, 0.3, 0.6, 0.8) //sticky在container的0.1~0.3位置得到1~0/0~1的值 0.6~0.8位置得到0~1/1~0的值

// [4]動態綁在DOM上
// <div class="test">{{ position1.now }}</div> // 測試目前位置值,方便設定自訂錨點
// <div class="message" :style="styleMaker(position1.get1to0,'translateY')"></div> // 回傳1~0的值,回傳哪個屬性
// <div class="line" :style="styleMaker(position2.get0to1,'width')"></div> // 回傳0~1的值,回傳哪個屬性

// [5]搭配最大最小值公式 返回style
// const styleMaker=(position, prop)=>{
  // const translateY = position.value*(50-0)+0  //在position1的位置得到50~0的值
  // const width = position.value*(100-0)+0      //在position2的位置得到0~100的值
  // if(prop==='translateY') return `transform: translateY(${translateY}%)`
  // if(prop==='width') return `width: ${width}%`
// }