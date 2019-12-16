<template>
  <div>
      <img class="one" src="/static/images/invite_bg.png" alt="">
      <img class="two" src="/static/images/invite_money.png" alt="">
      <p class="flexc">立即邀请</p>
      <div class="rule flexc"><span :class="move?'left':'right'" @click="goUrl('/pages/myson/rule/main')">邀请规则></span></div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      move:false
    }
  },
  onShow(){
    setInterval(() => {
      this.move = !this.move
    }, 1500);
  },
  methods: {
    goUrl(url){
      wx.navigateTo({
        url
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.rule{
  width: 133rpx;
  height: 40rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 20rpx 0rpx 0rpx 20rpx;
  position: absolute;
  top: 40rpx;
  right: 0;
  z-index: 9;
  color: #fff;
  font-size: 20rpx;
  span{
    position: relative;
    left: 0;
    transition: all .7s
  }
  .left{
    left:5rpx;
  }
  .right{
    left:-5rpx
  }
}
.one{
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 5
}
.two{
  width: 532rpx;
  height: 388rpx;
  position: absolute;
  z-index: 9;
  left: 109rpx;
  bottom: 200rpx
}
p{
  position: absolute;
  z-index: 9;
  left: 135rpx;
  bottom: 50rpx;
  width: 480rpx;
	height: 72rpx;
	background-image: linear-gradient(180deg, 
		rgba(253, 235, 72, 0.9) 0%, 
		rgba(254, 194, 16, 0.9) 100%);
  border-radius: 36rpx;
  color: #fff
}
</style>
