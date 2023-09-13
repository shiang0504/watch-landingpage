<script setup>
import { ref, onMounted, computed} from 'vue';
// sticky位置
import { useSetPosition } from './composables/getPositionOfSticky'
const container = ref(null)
const luminous = ref(null)
const container_position1 = useSetPosition(container, 0.072, 0.122, 0.147, 0.187) //不鏽鋼
const container_position2 = useSetPosition(container, 0.267, 0.317, 0.342, 0.392) //陶瓷
const container_position3 = useSetPosition(container, 0.712, 0.762, 0.787, 0.837) //藍寶石水晶
const container_position4 = useSetPosition(container, 0.397, 0.447, 0.472, 0.517) //機芯
const container_position5 = useSetPosition(container, 0.947, 0.999, 0.999, 1)  //mask
const luminous_position1 = useSetPosition(luminous, 0,     0.169, 0.409, 0.489) //mask
const luminous_position2 = useSetPosition(luminous, 0.169, 0.249, 0.409, 0.489) //螢光.text
const luminous_position3 = useSetPosition(luminous, 0.169, 0.489) //scale
const luminous_position4 = useSetPosition(luminous, 0.489, 0.741) //橫幅移動
////動態設定style
const styleMaker=(position, prop)=>{
  const opacity = position.value*(1-0)+0
  const translateX = position.value*(100+200)-200
  const translateY = position.value*(50-0)+0
  const width = position.value*(100-0)+0
  const backgroundOpcity = position.value*(1-0.3)+0.3
  const scale = position.value*(1.25-1)+1
  if(prop==='opacity') return `opacity: ${opacity}`
  if(prop==='width') return `width: ${width}%`
  if(prop==='translateY') return `transform: translateY(${translateY}%)`
  if(prop==='-translateY') return `transform: translateY(${-translateY}%)`
  if(prop==='background') return `background: rgba(0, 0, 0, ${backgroundOpcity})`
  if(prop==='translateX') return `transform: translateX(${translateX}%)`
  if(prop==='scale') return `transform: scale(${scale})`
  if(prop==='top') return `top: ${position}%`
}
// 滾動事件
import { useScrollTracker } from './composables/scrollTracker'
const secWrap1 = ref(null)
const secWrap2 = ref(null)
const secWrap3 = ref(null)
const secWrap4 = ref(null)
const secWrap5 = ref(null)
const secWrap1Obj = ref(useScrollTracker(secWrap1))
const secWrap2Obj = ref(useScrollTracker(secWrap2))
const secWrap3Obj = ref(useScrollTracker(secWrap3))
const secWrap4Obj = ref(useScrollTracker(secWrap4))
const secWrap5Obj = ref(useScrollTracker(secWrap5))
// 滾動事件
const video = ref(null)
const positionOfAllPage= ref(0)
const scrollPositon = ref(0)
function scrollHandler(){
  positionOfAllPage.value = Math.round((document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight))*100)
  scrollPositon.value = Number((-container.value.getBoundingClientRect().top / container.value.getBoundingClientRect().height).toFixed(5))
  video.value.pause() 
  video.value.currentTime = scrollPositon.value*31.5 //0~1 * 影片長度
}
onMounted(()=>{
  window.addEventListener('scroll', scrollHandler)
})
// 回頂端
const head = ref(null)
const toTop=()=>{
  head.value.scrollIntoView({ behavior: 'smooth'})
}
// 自訂游標
import { useMouseTracker } from './composables/mouseTracker'
const { mouseInViewport } = useMouseTracker()
const setCursor = computed(()=>{
  return `top: ${mouseInViewport.value.px.y}px; 
          left: ${mouseInViewport.value.px.x}px;`
})
</script>

<template>
  <div class="cursor" :style="setCursor">
    <div>SCROLL</div>
    <div>DOWN</div>
    <div></div>
  </div>
  <div class="scale"></div>
  <div class="arrow" :style="styleMaker(positionOfAllPage, 'top')" @click="toTop()"></div>
  <!-- <div class="test"> -->
    <!-- <p>{{mouseInViewport.px.x}},</p> -->
  <!-- </div> -->
  <div class="head" ref="head">
    <h2>PLANET OCEAN 600米系列</h2><br>
    <h3>歐米茄同軸擒縱42毫米腕錶</h3>
    <div class="animation">
      <div class="light"></div>
      <div class="wave wave5"></div>
      <div class="wave wave4"></div>
      <div class="wave wave3"></div>
      <div class="wave wave2"></div>
      <div class="wave wave1"></div>
      <div class="wave wave0"></div>
    </div>
  </div>
  <div class="container" ref="container">
    <div class="sticker">
      <video src="./assets/video.mp4" ref="video" autoplay loop muted playsinline></video>
      <div class="message" :style="styleMaker(container_position1.get0to1,'opacity')">
        <h3 :style="styleMaker(container_position1.get1to0,'translateY')">不鏽鋼</h3>
        <div class="line" :style="styleMaker(container_position1.get0to1,'width')"></div>
        <div class="contentWrap"><div class="content" :style="styleMaker(container_position1.get1to0,'-translateY')">不鏽鋼是用於外部工藝最傳統的製錶材質，具有美觀、強度和價格相宜的特點。歐米茄採用的是316L不鏽鋼。這種材質以抗腐蝕而聞名，拋光後可呈現極高光澤，通常是日常使用的腕錶及配合潛水和探險等極端情況的腕錶的理想之選。</div></div> 
      </div>
      <div class="message" :style="styleMaker(container_position2.get0to1,'opacity')">
        <h3 :style="styleMaker(container_position2.get1to0,'translateY')">陶瓷</h3>
        <div class="line" :style="styleMaker(container_position2.get0to1,'width')"></div>
        <div class="contentWrap"><div class="content" :style="styleMaker(container_position2.get1to0,'-translateY')">歐米茄使用陶瓷逾10年，擁有無與倫比的陶瓷工藝。Ceramic（陶瓷）源自希臘文「keramos」，是透過高溫燒製而成的非有機、非金屬物質。陶瓷可生產出密度極高的腕錶零件，具備傑出的力學特性。陶瓷是客戶選擇其腕錶時最受歡迎的材質之一，全因其迷人的色彩和特性，如較不鏽鋼輕兩倍、耐磨、高度抗磨損、化學惰性、低過敏、環保及非磁性。</div></div> 
      </div>
      <div class="message" :style="styleMaker(container_position3.get0to1,'opacity')">
        <h3 :style="styleMaker(container_position3.get1to0,'translateY')">藍寶石水晶</h3>
        <div class="line" :style="styleMaker(container_position3.get0to1,'width')"></div>
        <div class="contentWrap"><div class="content" :style="styleMaker(container_position3.get1to0,'-translateY')">為能夠真正欣賞時計的細節，歐米茄採用經過高度抗磨損及防反光處理的合成藍寶石水晶。在進行加工及修飾程序之前，藍寶石水晶由伐諾伊程序（Verneuil process）製作而成，又稱為焰熔法。這道程序會使用氫氧火焰熔化原料，然後將熔化的液滴結晶形成圓柱體。藍寶石水晶的莫氏硬度為9級（1-10級），因此可防磨損且非常堅硬，時刻確保腕錶清晰易讀。</div></div> 
      </div>
      <div class="message" :style="styleMaker(container_position4.get0to1,'opacity')">
        <h3 :style="styleMaker(container_position4.get1to0,'translateY')">8500機芯</h3>
        <div class="line" :style="styleMaker(container_position4.get0to1,'width')"></div>
        <div class="contentWrap"><div class="content" :style="styleMaker(container_position4.get1to0,'-translateY')">備有同軸擒縱裝置的自動上鏈機芯。無卡度游絲擺輪，雙發條盒，雙向自動上鏈。橋板及擺動組件有阿拉伯式日內瓦波紋裝飾。</div></div> 
      </div>
      <div class="mask" :style="styleMaker(container_position5.get0to1,'background')"></div> 
    </div>
  </div>
  <div class="luminous" ref="luminous">
    <div class="luminous_sticky">
      <div class="backgrund" :style="styleMaker(luminous_position3.get1to0,'scale')"></div>
      <div class="backgrund_cover" :style="[styleMaker(luminous_position2.get1to0,'opacity'), styleMaker(luminous_position3.get1to0,'scale')]"></div>
      <div class="info">
        <h3>Super-LumiNova®</h3>
        <div class="content" :style="styleMaker(luminous_position2.get0to1,'opacity')">
          <p>指針與刻度皆經Super-LumiNova超螢光塗料處理，在所有光線環境下皆清晰可讀，刻度、時針與秒針會散發藍色光芒，而分針與錶圈圓點則會散發綠色光芒。</p>
        </div>
      </div>
      <div class="mask" :style="styleMaker(luminous_position1.get1to0,'opacity')"></div>
      <div class="horizontal" :style="styleMaker(luminous_position4.get1to0,'translateX')">
        <div class="movement">
          <div class="picture">
            <img src="./assets/S_027975.jpg" alt="">
          </div>
          <div class="horizontal_info">
            <h3>歐米茄8500機芯</h3>
            <div class="content">
              <p>備有同軸擒縱裝置的自動上鏈機芯。無卡度游絲擺輪，雙發條盒，雙向自動上鏈。橋板及擺動組件有阿拉伯式日內瓦波紋裝飾。</p>
            </div>
          </div>
        </div>
        <div class="movement">
          <div class="picture">
            <img src="./assets/S_027962.jpg" alt="">
          </div>
          <div class="horizontal_info">
            <h3>排氦氣閥門</h3>
            <div class="content">
              <p>歐米茄海馬Planet Ocean 600米腕錶防水深度達60巴（600米/2000呎），並於十點鐘位置設有排氦氣閥門。</p>
            </div>
          </div>
        </div>
        <div class="movement">
          <div class="picture">
            <img src="./assets/S_028776.jpg" alt="">
          </div>
          <div class="horizontal_info">
            <h3>歐米茄8500機芯</h3>
            <div class="content">
              <p>錶面及錶背飾有抗磨損藍寶石水晶，黑色錶盤的3點鐘位置設有日期視窗。42毫米不鏽鋼錶殼配備黑色陶瓷單向旋轉潛水錶圈，搭配不鏽鋼錶鏈。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="detail">
    <div class="backgrund"></div>
    <div class="detailwrap">
      <section class="section1">
        <div class="secWrap textHighLight" ref="secWrap1" :class="{active:secWrap1Obj.isIntoViewport_y_bottom}">
          <h3>描述</h3>
          <div class="secContent">
            <p>歐米茄秉承品牌的航海傳奇，於2005年推出Planet Ocean系列。如今，此充滿時尚品味的腕錶繼續向歐米茄的潛水錶傳奇致敬。</p>
            <p>錶面及錶背飾有抗磨損藍寶石水晶，黑色錶盤的3點鐘位置設有日期視窗。42毫米不鏽鋼錶殼配備黑色陶瓷單向旋轉潛水錶圈，搭配不鏽鋼錶鏈。</p>
            <p>歐米茄海馬Planet Ocean 600米腕錶防水深度達60巴（600米/2000呎），並設有排氦氣閥門。這款榮獲認證的天文台錶搭載歐米茄8500同軸擒縱機芯，透過透明錶背可飽覽機芯的運行美態。</p>
          </div>
        </div>
      </section>
      <section class="section2">
        <div class="secWrap textHighLight" ref="secWrap2" :class="{active:secWrap2Obj.isIntoViewport_y_bottom}">
          <h3>特色</h3>
          <div class="secContent">
            <p>單向旋轉錶圈</p>
            <p>抗磁</p>
            <p>排氦閥門</p>
            <p>旋入式錶冠</p>
            <p>日期顯示</p>
            <p>時區功能</p>
            <p>獲瑞士官方天文台認證</p>
            <p>透明錶背</p>
          </div>
        </div>
        <div class="secWrap textHighLight" ref="secWrap3" :class="{active:secWrap3Obj.isIntoViewport_y_bottom}">
          <h3>錶殼</h3>
          <div class="secContent">
            <p><span>錶耳之間:</span> 20毫米</p>
            <p><span>上下錶耳間距:</span> 49.0毫米</p>
            <p><span>厚度:</span> 15.8毫米</p>
            <p><span>錶殼直徑:</span> 42毫米</p>
            <p><span>錶殼:</span> 不鏽鋼錶殼</p>
            <p><span>防水深度:</span> 60 巴 (600 米 / 2000 呎)</p>
            <p><span>產品總重（約）:</span> 197 g</p>
          </div>
        </div>
        <div class="secWrap textHighLight" ref="secWrap4" :class="{active:secWrap4Obj.isIntoViewport_y_bottom}">
          <h3>錶盤及水晶玻璃</h3>
          <div class="secContent">
            <p><span>錶盤顏色:</span> 黑色</p>
            <p><span>水晶鏡面:</span> 圓弧形雙面防反光抗磨損藍寶石水晶</p>
          </div>
        </div>
        <div class="secWrap textHighLight" ref="secWrap5" :class="{active:secWrap5Obj.isIntoViewport_y_bottom}">
          <h3>錶鏈</h3>
          <div class="secContent">
            <p><span>材質:</span> 不鏽鋼錶鏈</p>
            <p><span>錶扣類型:</span> 摺疊錶扣，配潛水延長扣</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
*{
  cursor: none;
}

// .test{
//   z-index: 999;
//   position: fixed;
//   top: 50px;
//   left: 50px;
//   word-break: break-word;
//   line-height: 30px;
//   height: 30px;
//   font-size: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

$color_main: rgb(93, 173, 253);
$color_main2: rgb(130, 155, 182);
$color_main_light: rgb(221, 233, 237);
$color_blue: #00CDF4;
$color_green: #00E4CB;
$color_gray:rgb(172, 172, 172);

@mixin mobile{
  @media(max-width: 768px){
    @content;
  }
}
@mixin flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation{
  .light{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%);
    opacity: 1;
    -webkit-animation: radial 2s forwards;
    @-webkit-keyframes radial{
      100%{
        opacity: 0;
      }
    }
  }
  .wave{
    position: absolute;
    border-radius: 50%;
    background: url(./assets/omega-seamaster-planet-ocean-600m.jpg);
    background-attachment: fixed;
    background-position: 60% center;
    background-repeat: no-repeat;
    @include mobile{
      display: none;
    }
    &.wave0{
      z-index: 2;
      background-size:  106% auto;
      -webkit-animation: wave 1s forwards;
    }
    &.wave1{
      z-index: 3;
      background-size:  102% auto;
      -webkit-animation: wave 1s .2s forwards;
    }
    &.wave2{
      z-index: 4;
      background-size:  104% auto;
      -webkit-animation: wave 1s .4s forwards;
    }
    &.wave3{
      z-index: 5;
      background-size:  101% auto;
      -webkit-animation: wave 1s .6s forwards;
    }
    &.wave4{
      z-index: 6;
      background-size:  102% auto;
      -webkit-animation: wave 1.2s .8s forwards;
    }
    &.wave5{
      z-index: 7;
      // background-size: auto 100%;
      background-size: cover;
      -webkit-animation: wave 1.4s 1s forwards;
    }
    @-webkit-keyframes wave{
      0%{
        top: calc((100% - 30px)/2);
        left: calc((100% - 30px)/2);
        width: 30px;
        height: 30px;
      }
      70%{
        opacity: 1;
      }
      100%{
        top: calc((100% - 100vmin)/2);
        left: calc((100% - 100vmin)/2);
        width: 100vmin;
        height: 100vmin;
        opacity: 0;
      }
    }
  }

}
.textHighLight{
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(0, 0, 0, 0);
  background-image: linear-gradient(90deg, $color_gray 0%, $color_main 20%, $color_gray 30%);
  background-size: 200%;
  background-position: 40% center;
  opacity: 0;
  transition: background-position 5s 1s linear, opacity .5s ease, transform .3s ease;
  @include mobile{
    // text-shadow: 0px 0px 1px rgb(255, 255, 255);
  }
  &.active{
    background-position: -80% center;
    opacity: 1;
    transform: translateY(-30px);
  }
}
.head{
  position: relative;
  box-sizing: border-box;
  padding-top: 40px;
  height: 100vh;
  width: 100%;
  // background: url(./assets/omega-seamaster-planet-ocean-600m.jpg) fixed 60% center / cover;
  background: 
  linear-gradient(to bottom, rgb(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1)) 100%,
  url(./assets/omega-seamaster-planet-ocean-600m.jpg) fixed 60% center / cover;
  color: $color_main;
  @include mobile{
    background: 
    linear-gradient(to bottom, rgb(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1)) 100%,
    url(./assets/omega-seamaster-planet-ocean-600m.jpg) 60% center / cover;
    padding-top: 40px;
  }
  h2, h3{
    display: inline-block;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(0,0,0,0);
    background-image: linear-gradient(90deg, $color_main 0%, $color_main_light 20%, $color_main 30%);
    background-position: 40% center;
    background-size: 200%;
    text-shadow: 0px 0px 10px rgb(255, 255, 255);
    animation: show 4s 1s linear forwards, light 6s 1s linear infinite;
    z-index: 100;
    position: relative;
    opacity: 0;
    @keyframes show {
      20%{
        opacity: 1;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes light {
      0%{
        background-position: 40% center;
      }
      100% {
        background-position: -80% center;
      }
    }
  }

  h2{
    font-size: 3rem;
    margin-bottom: 10px;
    @include mobile{
      font-size: 2rem;
    }
  }
  h3{
    font-size: 2rem;
    margin-top: 10px;
    @include mobile{
      font-size: 1.5rem;
    }
  }
}
.container{
  height: 20000px;
  width: 100%;
  .sticker{
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    overflow: hidden;
    video{
      height: 100%;
      width: auto;
    }
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .message{
      position: absolute;
      top: 70%;
      bottom: 0%;
      left: 10%;
      right: 10%;
      margin: auto;
      opacity: 0;
      h3{
        margin-bottom: 10px;
        text-shadow: 0 0 5px white;
      }
      .line{
        margin: auto;
        width: 100%;
        height: 1px;
        background: white;
        margin-bottom: 10px;
      }
      .contentWrap{
        overflow: hidden;
        text-align: left;
      }
    }
  }
}
.luminous{
  width: 100%;
  height: 600vh;
  .luminous_sticky{
    height: 100vh;
    width: 100%;
    position: sticky;
    overflow: hidden;
    top: 0;
    
    .backgrund{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(./assets/S_027992.jpg) fixed center center / cover;
      @include mobile{
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(./assets/S_027992.jpg) 58% center / cover;
      }
    }
    .backgrund_cover{ 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(./assets/S_027992-1.jpg) fixed center center / cover;
      opacity: 1;
      @include mobile{ //蓋在上面 透明度1->0  夜光 
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(./assets/S_027992-1.jpg) 58% center / cover;
      } 
    }
    .mask{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      z-index: 1;
    }
    .info{
      position: absolute;
      bottom: 0;
      top: 0;
      left: 10%;
      margin: auto;
      height: 150px;
      width: 30%;
      color: $color_gray;
      text-align: left;
      @include mobile{
        left: 5%;
        width: 90%;
        top: 5%;
        bottom: unset;
      } 
      h3{
        margin-bottom: 100px;
        font-size: 30px;
        display: inline;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: rgba(0, 0, 0, 0);
        background-image: linear-gradient(90deg, $color_blue 0%, $color_blue 60%, $color_green 100%);
      }
    }
    .horizontal{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      @include flex-center;
      justify-content: start;
      transform: translateX(0vw); // 100vw~-200vw
      transition: all .1s;
      .movement{
        flex-shrink: 0;
        width: 100vw;
        .picture{
          width: 50%;
          height: auto;
          margin: auto;
          @include mobile{
            width: 90%;
          }
          img{
            width: 100%
          }
        }
        .horizontal_info{
          width: 50%;
          margin: auto;
          text-align: left;
          color: $color_gray;
          @include mobile{
            width: 90%;
          }
          h3{
            display: inline;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: rgba(0, 0, 0, 0);
            background-image: linear-gradient(90deg, #5B3837 0%, #5B3837 60%, #BF5E9C 100%);
          }
        }
      }
    }
  }
}
.detail{
  min-height: 100vh;
  // font-size: 18px;
  font-weight: 800;
  .backgrund{
    min-height: 100vh;
    width: 100%;
    position: sticky;
    top: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
                linear-gradient(to bottom, rgb(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0)) 10%,
                url(./assets/S_047885.jpg) fixed center center / cover;
    @include mobile{
      background: 
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%),
                  url(./assets/S_047885.jpg) 18% center / cover;
    }
  }
  .detailwrap{
    width: 50%;
    margin-left: auto;
    @include mobile{
      width: 100%;
    }
    section{
      .secWrap{
        border-bottom: 1px rgba(150, 150, 150, 0.2) solid;
        padding: 10px 50px 30px 50px;
        h3{
          text-align: left;
          text-shadow: 0px 0px 5px rgba(208, 210, 244, 0.61);
          margin: 30px 0;
        }
        .secContent{
          column-count: 2;
          @include mobile{
            column-count: unset;
          }
          p{
            text-align: left;
            &:nth-child(1){
              margin-top: 0px;
            }
            span{
              font-weight: 600;
            }
          }
        }
      }
      &.section2{
        .secWrap:last-child{
          border-bottom: unset;
        }
      }
    }
  }
}
.scale{
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100px;
  transform: rotate(180deg);
  background: linear-gradient(to top, #fff 0px, #fff 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 4px, white 6px)
              ;
  z-index: 1;
  background-size: 24px 120px, 12px 5px;
  // mix-blend-mode: overlay;
  mix-blend-mode: difference;
  background-repeat: repeat-y;
  opacity: 0.5;
}
.arrow{
  position: fixed;
  top: 0;
  right: 24px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 10px;
  border-color: rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #fff;
  transition: all .5s;
  mix-blend-mode: difference;
  z-index: 999;
  opacity: 0.5;
  transform-origin: left center;
  @include mobile{
    right: 0;
  }
  &:hover{
    transform: rotate(-90deg);
    @include mobile{
      transform: unset;
    }
  }  
  &::after{
    content: '';
    position: absolute;
    top: -10px;
    right: 9.8px;
    width: 16px;
    height: 20px;
    background: #fff;
    z-index: 999;
  }
}
.cursor{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  @include flex-center;
  flex-direction: column;
  width: 100px;
  height: 100px;
  font-size: 12px;
  border-radius: 50%;
  border: 1px solid $color_gray;
  transform: translate(-50%, -50%);
  pointer-events: none;
  @include mobile{
    display: none;
  }
}
</style>