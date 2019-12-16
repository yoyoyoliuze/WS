<template>
  <div>
      <div class="top-r ali-c">
        <img src="/static/images/ava.png" alt="">
        <div>
          <p>服务门店：万色印象万众城店</p>
          <p>服务项目：美甲</p>
        </div>
      </div>
      <div class="score ali-c">
        <p>评分</p>
        <img src="/static/images/icons/s1.png" alt="">
        <span>满意</span>
        <img src="/static/images/icons/s2.png" alt="">
        <span>一般</span>
        <img src="/static/images/icons/s3.png" alt="">
        <span>不满意</span>
      </div>
      <textarea placeholder="填写您对技师的评价~"></textarea>
      <div class="img-box">
        <img src="/static/images/my_icon_2.png" alt="">
      </div>
      <p class="butn flexc">提交</p>
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
.butn{
	width: 690rpx;
	height: 88rpx;
	background-color: #cc9f68;
  border-radius: 8rpx;
  color: #fff;
  font-size: 32rpx;
  margin: 100rpx auto
}
.img-box{
  background-color: #fff;
  padding: 30rpx;
  box-sizing: border-box;
  img{
    width: 152rpx;
    height: 152rpx;
    margin: 0 20rpx 20rpx 0
  }
}
textarea{
  background-color: #fff;
  width: 100vw;
  padding: 30rpx;
  box-sizing: border-box;
}
.score{
  background-color: #fff;
  margin-top: 20rpx;
  border-bottom: 1rpx solid #ededed;
  height: 100rpx;
  padding: 0 30rpx;
  p{
    font-size: 32rpx;
    color: #000;
  }
  img{
    width: 40rpx;
    height: 40rpx;
    margin: 0 16rpx 0 70rpx
  }
}
.top-r{
  background-color: #fff;
  height: 220rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  img{
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
  }
}
</style>
