<template>
  <div style="padding-bottom:100rpx">
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
      <div class="ali-c jus-e heji">
        <span>合计:￥48</span>
      </div>
      <div class="jishi">
        <div class="tit ali-c"><span></span><p>技师图片</p></div>
        <scroll-view scroll-x enable-flex class="jishi-img ali-c">
          <div class="ali-c" v-for="(item, index) in imgList" :key="index">
            <img mode='aspectFill' src="/static/images/jishi.png" alt="">
          </div>
        </scroll-view>
      </div>
      <div class="info">
        <div class="tit ali-c"><span></span><p>订单信息</p></div>
        <p>订单编号：</p>
        <p>创建时间：</p>
        <p>支付时间：</p>
        <p>取消时间：</p>

      </div>
      <div class="end jus-e ali-c">
        <p class="flexc">评价</p>
      </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      move:false,
      imgList:[,,,,,,,,]
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
.end{
  background-color: #fff;
  width: 100vw;
  height: 98rpx;
  padding: 0 30rpx;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  box-shadow: -3rpx 0 5rpx 5rpx rgba(0,0,0,0.1);
  p{
    width: 201rpx;
    height: 64rpx;
    border-radius: 4rpx;
    border: solid 1rpx #cc9f68;
    color: #cc9f68;
  }
}
.info{
  background-color: #fff;
  padding:  0 30rpx 30rpx 30rpx;
  margin-top: 20rpx;
  p{
    color: #999999;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }
  .tit{
    height: 88rpx;
    p{
      font-size: 28rpx;
      color: #333;
      margin: 0
    }
    span{
      width: 5rpx;
      height: 28rpx;
      background-color: #ed8077;
      border-radius: 2rpx;
      margin-right: 20rpx
    }
  }
}
.jishi{
  background-color: #fff;
  padding:  0 0 30rpx 30rpx;
  margin-top: 20rpx;
  .tit{
    height: 88rpx;
    span{
      width: 5rpx;
      height: 28rpx;
      background-color: #ed8077;
      border-radius: 2rpx;
      margin-right: 20rpx
    }
  }
  .jishi-img{
    height: 180rpx;

    img{
      display: inline-block;
      width: 180rpx;
      height: 180rpx;
      border-radius: 8rpx;
      margin-right: 20rpx;
      
    }
  }
}
.heji{
  height: 88rpx;
  color: #ff3333;
  padding: 0 30rpx;
  background-color: #fff
}
.jus-box{
  background-color: #fff;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #ededed;
  font-size: 24rpx;
  .ali-c{
    height: 60rpx;
  }
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
