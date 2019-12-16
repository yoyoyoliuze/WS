<template>
  <div>
      <div class="top ali-c jus-b">
        <div class="left flexc">
          <span>2019-11</span>
          <img src="/static/images/jiantou.png" alt="">
        </div>
        <p>￥1200</p>
      </div>
      <div class="list ali-c jus-b">
        <div class="left">
          <p>预约美甲项目</p>
          <span>2019-11-18 11:06</span>
        </div>
        <p>-¥357.90</p>
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
  height: 145rpx;
  background-color: #fff;
  border: 1rpx solid #ededed;
  padding: 0 30rpx;
  p{
    color: #ff3333;
  }
  .left{
    p{
      color: #333;
      margin-bottom: 10rpx;
    }
    span{
      color: #999;
      font-size: 22rpx;
    }
  }
}
.top{
  height: 104rpx;
  padding: 0 30rpx;
  .left{
    width: 160rpx;
    height: 56rpx;
    background-color: #ffffff;
    border-radius: 28rpx;
    span{
      font-size: 24rpx;
    }
    img{
      width: 16rpx;
      height: 8rpx;
      margin-left: 15rpx
    }
  }
}
</style>
