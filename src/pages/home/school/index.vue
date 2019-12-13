<template>
  <div>
    <movable-area class="movearea">
      <div class="sc_list">
          <div class="sc_item">
                <img src="/static/images/index_shop_bg.png" alt="" class="img">
                <p class="item_info">万色学院成立于1998年，是深圳第1家高端美业学院，目前在深圳各大区域皆有分校，行业影响力巨大，实力背景雄厚。是综合美容、化妆、美甲、纹绣、培训的学校，创办至今，每年培养大批的优秀人才，为社会输送大量的高素质美业人才，一直以培训更多的美业精英，创业者，响应政府号召，推动美业发展，提供就业机会为己任。我们肩负责任，也深知任重而道远，我们不怕辛劳，只为成就希望。我们点滴累积，只为胜任期待，我们希望通过努力和汗水，得到大家的认可和支持。做一个有责任的人，做一家有良心的学院!</p>
          </div>
          <div class="sc_item">
                <img src="/static/images/yuyue.png" alt="" class="img">
                <p class="item_info">万色学院成立于1998年，是深圳第1家高端美业学院，目前在深圳各大区域皆有分校，行业影响力巨大，实力背景雄厚。是综合美容、化妆、美甲、纹绣、培训的学校，创办至今，每年培养大批的优秀人才，为社会输送大量的高素质美业人才，一直以培训更多的美业精英，创业者，响应政府号召，推动美业发展，提供就业机会为己任。我们肩负责任，也深知任重而道远，我们不怕辛劳，只为成就希望。我们点滴累积，只为胜任期待，我们希望通过努力和汗水，得到大家的认可和支持。做一个有责任的人，做一家有良心的学院!</p>
          </div>
      </div>  
      <!--悬浮窗-->
      <movable-view style="z-index:11;" x="280" y="400" direction="all" out-of-bounds="false" >
          <div class="fixed__kf">
              <img src="/static/images/btn.png" alt="">
          </div>
      </movable-view>
    </movable-area>
  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  onShow(){
  },

  data () {
    return {
      
    }
  },
  methods: {
    
    switchPath(url){
      wx.navigateTo({
        url
      })
    }
    
  },
}
</script>

<style lang='scss' scoped>
  .sc_item{
    .img{
      width:100%;height:430rpx;vertical-align: middle;
    }
    .item_info{
      padding:30rpx;font-size:24rpx;
    }
  }
  .fixed__kf{
    width:184rpx;height:184rpx;
    img{
      width:184rpx;height:184rpx;
    }
  }
  .movearea {
    width: 100%;
    height: 100vh;
}
</style>
