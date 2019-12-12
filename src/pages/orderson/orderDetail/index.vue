<template>
  <div>
      <div class="top flexc">
        <span :class="move?'move':''">已服务</span>
      </div>
      <div class="shop ali-c jus-b">
        <div class="ali-c jus-b">
          <img class="left" src="/static/images/yuyue.png" alt="">
          <p>万色印象万众城店</p>
        </div>
        <img class="right" src="/static/images/address_r.png" alt="">
      </div>
      <div class="jus-box">
        <div class="ali-c jus-b"><p>预约序号</p><span>FW001</span></div>
        <div class="ali-c jus-b"><p>预约日期</p><span>2019-12-120</span></div>
        <div class="ali-c jus-b"><p>开始时间</p><span>16:30</span></div>
      </div>
      <div class="jus-box">
        <div class="ali-c jus-b"><p>服务项目</p><span>美甲</span></div>
        <div class="ali-c jus-b"><p>服务时长</p><span>1小时</span></div>
        <div class="ali-c jus-b"><p>单价</p><span>¥68</span></div>
        <div class="ali-c jus-b"><p>折扣</p><span>-¥20</span></div>
        <div class="ali-c jus-b"><p>优惠券</p><span>-¥20</span></div>
      </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      move:false
    }
  },
  onUnload(){
    this.move = false
  },
  onShow(){
    setTimeout(() => {
      this.move = true
    }, 300);
  }
}
</script> 

<style scoped lang='scss'>
.jus-box{
  // background-color: 
}
.shop{
   background-color: #fff;
   border-bottom: 1rpx solid #ededed;
   height: 220rpx;
   padding: 0 30rpx;
   p{
     font-size: 30rpx;
     font-weight: 900 
   }
   .left{
    width: 161rpx;
    height: 161rpx;
    border-radius: 8rpx;
    margin-right: 15rpx
   }
   .right{
    width: 24rpx;
    height: 30rpx;
   }
}
.top{
  background-color: #cc9f68;
  color: #fff;
  height: 132rpx;
  .move{
    right: 0rpx!important
  }
  span{
    position: relative;
    top: 0rpx;
    right: 450rpx;
    transition: all .3s
  }
}
</style>
