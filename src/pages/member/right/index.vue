<template>
  <div>
      <div class="list pw3">
          <div class="cc_item">
              <img src="/static/images/icons/c1.png" alt="" class="cc_img">
              <div class="cc_main flex justifyContentBetween flexAlignCenter">
                  <p class="font30">会员此卡</p>
                  <div class="cc_right">
                      <p>服务项目-雕花甲</p>
                      <p class="font22 mt1">剩余次数5/10</p>
                      <p class="flex justifyContentBetween font22 mt1">
                        <span>次卡权益</span>
                        <span class="cc_use">立即使用</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div class="mt5 pw3">
          <div class="font24 fb">使用须知</div>
          <div>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">仅限做雕花甲服务项目时方可使用</span>
              </p>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">有效期至2020-12-28</span>
              </p>
          </div>
      </div>
      <div class="mt5 pw3">
          <div class="font24 fb">注意事项</div>
          <div>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">下单后在优惠方式中选择使用会员次卡</span>
              </p>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">使用会员次卡抵消1次，剩余次数减少1次</span>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      
      
    }
  },
  onShow(){
    
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    cliServer(index){
      this.serverIndex = index
    },
    cliTab(index){
      this.tabIndex = index
    },
  },
}
</script>

<style scoped lang='scss'>

.cc_item{
  margin-top:20rpx;
  height:200rpx;
  position: relative;
  .cc_img{
    width:690rpx;height:200rpx;
  }
  .cc_main{
    position: absolute;color:#ffffff;
    top:30rpx;left:30rpx;right:30rpx
  }
  .cc_right{
    width:65%;
  }
  .cc_use{
    background: #cc9f68;color:#ffffff;
    padding:5rpx 20rpx;border-radius:5rpx;
    &.active{
      background: #cccccc;
    }
  }
}
.bo_cc{
  width:10rpx;height: 10rpx;
  border-radius:50%;background: #1a1a1a;
}

</style>
