<template>
  <div>
      <img class="one" src="/static/images/invite_bg.png" alt="">
      <img class="two" src="/static/images/invite_money.png" alt="">
      <button class="flexc sev" open-type="share" plain style="border:none">立即邀请</button>
      <div class="rule flexc"><span :class="move?'left':'right'" @click="goUrl('/pages/myson/rule/main')">邀请规则></span></div>
  </div>
</template>

<script>
import {post} from "@/utils"

export default {

  data () {
    return {
      move:false,
      userId:"",
      token:"",
      InviteQRcode:"",//邀请好友二维码
      ReferralCode:"",

    }
  },
  onShow(){
    setInterval(() => {
      this.move = !this.move
    }, 1500);
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getData()
  },
  methods: {
    goUrl(url){
      wx.navigateTo({
        url
      })
    },
    getData(){
      post('User/InviteFriends',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        if(res.code==0){
          this.InviteQRcode = res.data.InviteQRcode
          this.ReferralCode = res.data.ReferralCode

        }
      })
    },

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target,"___")
    }
    return {
        title: '分享好友得积分',
        imageUrl:'/static/images/11.png',
        path: '/pages/index/main?inviteCode='+this.ReferralCode
    }
  }
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
.sev{
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
