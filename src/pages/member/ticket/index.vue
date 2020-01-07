<template>
  <div>
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="pp3 bg_fff mt2 flex justifyContentBetween flexAlignCenter">
          <div class="flex flexAlignCenter">
              <img src="/static/images/my_icon_9.png" alt="" class="cc_car">
              <span class="mr2">次卡中心</span>
          </div>
          <img src="/static/images/icons/more.png" alt="" class="icon_right">
      </div>
      <div class="list pw3">
          <div class="cc_item" v-for="(item,index) in 4" :key="index">
              <img src="/static/images/icons/c1.png" alt="" class="cc_img">
              <!-- <img src="/static/images/icons/c2.png" alt="" class="cc_img"> -->
              <div class="cc_main flex justifyContentBetween flexAlignCenter">
                  <p class="font30">会员此卡</p>
                  <div class="cc_right">
                      <p>服务项目-雕花甲</p>
                      <p class="font22 mt1">剩余次数5/10</p>
                      <p class="flex justifyContentBetween font22 mt1">
                        <span>次卡权益</span>
                        <span class="cc_use" :class="index==3?'active':''">立即使用</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      tabList:['可使用','已失效'],
      tabIndex:0,
      
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
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
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  position: relative;
  .active{
    color: #cc9f68
  }
  span{
    position: absolute;
    bottom: 0;
    transition: all .2s;
    height: 5rpx;
    width: 50rpx;
    background-color: #cc9f68
  }
}
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
.cc_car{
  width:48rpx;height:40rpx;
}
.icon_right{
  width:13rpx;height:24rpx;
}


</style>
