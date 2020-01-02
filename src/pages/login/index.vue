<template>
  <div class="login">
    <open-data class="icon icon_circular_bead" type="userAvatarUrl"></open-data>
    <div class="auth-text">
      <text class="main">{{title}}</text>
      <text class="sub">{{content}}</text>
    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doBind">{{buttonText}}</button>
  </div>
</template>

<script>
import logins from '@/utils/login'
export default {
  data() {
    return {
      // 是否授权的提示信息
      title:'该小程序由***开发，请提供以下授权，即可继续操作',
      content:'· 获得你的公开信息（昵称、头像等）',
      buttonText:'登录'
    };
  },
  onLoad(){
  },
  onShow() {
    const that =this;
    // 判断是否已授权，未授权做不同提示
    wx.getSetting({
      success(res){
        // 已授权
        if(res.authSetting['scope.userInfo']){
          that.title = '登录信息已过期或者已经失效，需重新进行登录'
          that.buttonText = '授权登录'
        }
        // 未授权
        else{

        }
      }
    })
  },
  computed:{
  },
  methods: {
    // 点击登录
    doBind(){
        logins({
          success(res){
            setTimeout(()=>{
              wx.navigateBack();
            },1500)
          }
        });
    },
  }
};
</script>
<style lang='scss' scoped>
.login {
    .icon {
      display: block;
      margin: 100rpx auto 64rpx;
      width: 200rpx;
      height: 200rpx;
  }
  
  .icon_circular_bead {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      overflow: hidden;
  }
  
  .auth-text {
      margin: 50rpx 64rpx;
      padding: 32rpx 0;
      border-top: 1px solid #ddd;
      text-align: justify;
  }
  
  .auth-text .main {
      display: block;
      font-size: 28rpx;
  }
  
  .auth-text .sub {
      display: block;
      font-size: 24rpx;
      color: #888;
      margin-top: 16rpx;
  }
  
  .msxcx-widget-btn {
      margin-left: 64rpx;
      margin-right: 64rpx;
  }
  
    // .logo {
    //   width: 600rpx;
    //   height: 100rpx;
    //   background: url('http://img.su-cloud.cn/mini/logo.png') no-repeat;
    //   background-size: 100% 100%;
    //   margin: 200rpx auto 0 auto;
    // }
    .login-btn {
      text-align: center;
      background: #cc9f68;
      width: 90%;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      font-size: 28rpx;
      margin-top: 30rpx;
    }
    .item {
      width: 690rpx;
      height: 70rpx;
      line-height: 70rpx;
      margin: 0 auto;
      padding: 10rpx 0;
      border-bottom: 1rpx solid #f4f4f4;
      input {
        width: 100%;
        height: 100%;
      }
      .code1{
        width: 60%;
        height: 100%;
        float:left;
        display: inline;
      }
      .btn{
        padding: 0 10rpx;
        margin: 0;
        font-size: 28rpx;
        text-align: center;
        background: transparent;
        color: #a07941;
        border-color: #a07941;
        display:inline;
        width:30%;
        float:right;
   
      }
    
    }
  }
  
</style>
