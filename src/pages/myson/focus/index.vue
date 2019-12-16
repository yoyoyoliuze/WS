<template>
  <div>
      <div class="list">
        <div class="top ali-c">
          <img class="left" src="/static/images/ava.png" alt="">
          <div class="right">
            <div class="ali-c one">
              <p>Alisa</p>
              <span class="flexc">店长</span>
            </div>
            <div class="ali-c two">
              <img src="/static/images/my_icon_7.png" alt="">
              <span>好评率</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        <div class="address ali-c jus-b">
          <div class="ali-c">
            <p>万色印象万众城店</p>
            <img class="left" src="/static/images/more.png" alt="">
          </div>
          <img class="right" src="/static/images/address_r.png" alt="">
        </div>
        <div class="btn-box jus-e ali-c">
          <p class="flexc active">预约</p>
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
}
</script>

<style scoped lang='scss'>
.list{
  background-color: #fff;
  width: 690rpx;
  border-radius: 15rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  margin: 20rpx auto 0;
  .btn-box{
    height: 104rpx;
    p{
      width: 200rpx;
      height: 56rpx;
      background-color: #cc9f68;
      border-radius: 6rpx;
      color: #fff;
      font-size: 24rpx
    }
    .active{
      background-color: #c4c4c4!important
    }
  }
  .address{
    height: 84rpx;
    border-bottom: 1rpx solid #ededed;
    p{
      font-size: 26rpx;
      font-weight: 900;
      margin-right: 25rpx
    }
    .left{
      width: 10rpx;
	    height: 18rpx;
    }
    .right{
      width: 20rpx;
	    height: 24rpx;
    }
  }
  .top{
    height: 180rpx;
    border-bottom: 1rpx solid #ededed;
    .left{
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .right{
      img{
        width: 28rpx;
	      height: 24rpx;
      }
      .one{
        p{
          font-size: 30rpx;
          font-weight: 900
        }
        span{
          width: 60rpx;
          height: 32rpx;
          background-color: #cc9f68;
          border-radius: 4rpx;
          color: #fff;
          font-size: 22rpx;
          margin-left: 20rpx
        }
      }
      .two{
        margin-top: 20rpx;
        span{
          font-size: 22rpx;
          margin-left: 15rpx
        }
      }
    }
  }
}
</style>
