<template>
  <div>
      <div class="card-box flexc">
        <div class="card">
          <div class="ali-c jus-b top">
            <p>金卡</p>
            <p><span>￥</span>18800</p>
          </div>
          <p class="bottom ali-c">您当前正在开通金卡会员服务，开通后会享受相应权益，会员服务为虚拟产品购买后不会过期，不支持退款。</p>
        </div>
      </div>
      <div class="pay ali-c jus-b gou">
        <div class="ali-c">
          <img src="/static/images/weixin.png" alt="">
          <p>微信支付</p>
        </div>
        <radio></radio>
      </div>
      <p class="btna flexc">立即支付</p>
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
.btna{
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 88rpx;
  background-color: #cc9f68;
  color: #fff;
  font-size: 32rpx
}
.pay{
  height: 128rpx;
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  img{
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx
  }
}
.card-box{
  height: 340rpx;
  background-color: #ffffff;
  .card{
    width: 690rpx;
    height: 252rpx;
    border-radius: 8rpx;
    border: solid 1rpx #ececec;
    overflow: hidden;
    .bottom{
      height: 120rpx;
      color: #999;
      font-size: 24rpx;
      line-height: 36rpx;
      padding: 0 30rpx;
    }
    .top{
      height: 132rpx;
      color: #fff;
      background-color: #cc9f68;
      padding: 0 30rpx;
      p{
        font-size: 32rpx;
        span{
          font-size: 24rpx
        }
      }
    }
  }
}
</style>
