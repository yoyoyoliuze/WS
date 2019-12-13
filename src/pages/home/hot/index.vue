<template>
  <div>
      <div class="flex bg_fff p3">
          <div class="hot_itl font30">默认</div>
          <div class="hot_itl flex flexAlignCenter justifyContentCenter">
              <p class="mr_b font30">人气</p>
              <p class="flex flexColumn justifyContentAround">
                  <img src="/static/images/icons/up1.png" alt="" class="img">
                  <img src="/static/images/icons/d2.png" alt="" class="img mt_b">
              </p>
          </div>
          <div class="hot_itl flex flexAlignCenter justifyContentCenter">
              <p class="mr_b font30">价格</p>
              <p class="flex flexColumn justifyContentAround">
                  <img src="/static/images/icons/d2.png" alt="" class="img up2">
                  <img src="/static/images/icons/d1.png" alt="" class="img mt_b">
              </p>
          </div>
      </div>
      <div class="mt2 bg_fff hot_list pw3">
          <div class="hot_item p3 flex justifyContentBetween" v-for="(item,index) in 5" :key="index">
              <img src="/static/images/jishi.png" alt="" class="item_m">
              <div class="item_r flex1 flex flexColumn justifyContentBetween">
                  <div>
                      <p class="font30 fb">法国LPG黑眼圈护理</p>
                      <p class="cg mt1"><span class="item_pill">30分钟</span>眼部祛皱 改善黑眼圈</p>
                  </div>
                  <div class="flex justifyContentBetween flexAlignCenter">
                      <span class="cr font38">¥298 </span>
                      <span class="font24 cg">2563人预约</span>
                  </div>
              </div>
          </div>
      </div>
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
  .hot_itl{
    width:33%;
    text-align:center;
  }
  .img{
    width:20rpx;height:10rpx;
  }
  .mt_b{
    margin-top:5rpx;
  }
  .mr_b{
    margin-right:10rpx;
  }
  .up2{
    transform: rotate(180deg)
  }
  .item_r{
    width:198rpx;
  }
  .item_pill{
    font-size: 22rpx; background: #cc9f68;border:1rpx solid #cc9f68;padding:0 15rpx;border-radius:5rpx;color:#ffffff;margin-right:10rpx;
  }
  .item_m{
    width:240rpx;height:173rpx;margin-right:20rpx;  
  }
  .font38{
    font-size:38rpx;
  }
</style>
