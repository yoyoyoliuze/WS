<template>
  <div>
      <div class="top ali-c jus-b">
        <p>我的余额</p>
        <p>￥10</p>
      </div>
      <div class="title ali-c jus-b">
        <p>余额充值</p>
        <span>金卡会员充值98折</span>
      </div>
      <div class="list-box flex-wrap jus-b">
        <div class="list flexc">98元 (到账100元)</div>
        <div class="list flexc">98元 (到账100元)</div>
        <div class="list flexc">98元 (到账100元)</div>
        <div class="list flexc">98元 (到账100元)</div>
        <div class="list flexc">98元 (到账100元)</div>
      </div>
      <p class="ali-c chongzhi">充值方式</p>
      <div class="pay ali-c jus-b">
        <div class="ali-c">
          <img src="/static/images/weixin.png" alt="">
          <p>微信支付</p>
        </div>
        <radio></radio>
      </div>
      <p class="btn flexc">立即充值</p>
  </div>
</template>

<script>

export default {

  data () {
    return {
      
    }
  },
}
</script>

<style scoped lang='scss'>
.btn{
  width: 690rpx;
	height: 88rpx;
	background-color: #cc9f68;
  border-radius: 8rpx;
  margin: 180rpx auto 0;
  color: #fff
}
.pay{
  height: 128rpx;
  background-color: #fff;
  padding: 0 30rpx;
  img{
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx
  }
}
.chongzhi{
  height:80rpx ;
  padding: 0 30rpx
}
.list-box{
  padding: 0 30rpx;
  .list{
    width: 334rpx;
    height: 90rpx;
    background-color: #ffffff;
    border: solid 2rpx #ebebeb;
    margin-bottom: 20rpx;
  }
  .active{
    border: 2rpx solid #cc9f68;
    background-color: #f5f5f5
  }
}
.title{
  height: 120rpx;
  padding: 0 30rpx;
  span{
    color: #ff3333;
    font-size: 24rpx
  }
}
.top{
  background-color: #fff;
  margin-top: 20rpx;
  height: 116rpx;
  padding: 0 30rpx;
}
</style>
