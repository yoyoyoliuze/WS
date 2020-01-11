<template>
  <div>
      <div class="top-box">
        <div class="top ali-c">
          <img mode='aspectFill' class="left" :src="memberInfo.Avatar" alt="" @click="switchPath('/pages/member/editinfo/main',$event)">
          <div class="right">
            <div class="ali-c one">
              <p>{{memberInfo.NickName}}</p>
              <div class="ali-c vip" v-if="memberInfo.GradeName">
                <img src="/static/images/vip.png" alt="">
                <span>{{memberInfo.GradeName}}</span>
              </div>
            </div>
            <p class="two">{{memberInfo.Mobile}}</p>
          </div>
        </div>
        <img class="bg" mode='aspectFill' src="/static/images/mine_bg.png" alt="">
      </div>
      <div class="card-box">
        <div class="card">
          <p class="tit ali-c" @click="goto('/pages/order/main')">我的预约</p>
          <div class="icon-box flex-wrap ali-c">
            <div class="icon flexc" @click="goto('/pages/order/main',$event)">
              <div>
                <img src="/static/images/my_icon_1.png" alt="">
                <p>待服务</p>
                <span class="flexc">2</span>
              </div>
            </div>
            <div class="icon flexc" @click="goto('/pages/order/main',$event)">
              <div>
                <img src="/static/images/my_icon_2.png" alt="">
                <p>已服务</p>
                <span class="flexc">2</span>
              </div>
            </div>
            <div class="icon flexc" @click="goto('/pages/order/main',$event)">
              <div>
                <img src="/static/images/my_icon_3.png" alt="">
                <p>已取消</p>
                <span class="flexc">2</span>
              </div>
            </div>
          </div>

        </div>

        <div class="card">
          <p class="tit ali-c">我的服务</p>
          <div class="icon-box icon-boxb flex-wrap ali-c">
            <div class="icon flexc" @click="switchPath('/pages/member/card/main',$event)">
              <div>
                <img src="/static/images/my_icon_4.png" alt="">
                <p>会员卡</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/member/ticket/main',$event)">
              <div>
                <img src="/static/images/my_icon_9.png" alt="">
                <p>会员次卡</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/ticket/main',$event)">
              <div>
                <img src="/static/images/my_icon_5.png" alt="">
                <p>优惠券</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/invite/main',$event)">
              <div>
                <img src="/static/images/my_icon_6.png" alt="">
                <p>邀请好友</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/focus/main',$event)">
              <div>
                <img src="/static/images/my_icon_7.png" alt="">
                <p>我的关注</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/member/set/main',$event)">
              <div>
                <img src="/static/images/my_icon_8.png" alt="">
                <p>设置</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      isLogin:false,
      memberInfo:{},
      userId:"",
      token:""
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getMemberInfo()
  },
  methods: {
    switchPath(path){
      console.log(path,"1111")
        wx.navigateTo({
          url:path
        })
    },
    goto(path){
      wx.switchTab({
          url:path
        })
    },
    getMemberInfo(){
      post('User/GetCenterInfo',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        if(res.code==0){
          this.memberInfo = res.data
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>

.card-box{
  padding: 0 30rpx;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  top: -130rpx;
  z-index: 99;
  .card{
    background-color: #fff;
    width: 100%;
    border-radius: 15rpx;
    margin-bottom: 20rpx;
    .tit{
      height: 92rpx;
      padding-left: 30rpx;
      border-bottom: 1px solid #ededed;
      font-weight: 900;
      font-size: 30rpx
    }
    .icon-boxb .icon p{
      font-size: 24rpx!important;
    
    }
    .icon-boxb .icon:nth-child(1) img{
      width: 48rpx!important;
	    height: 40rpx!important;
    }
    .icon-boxb .icon:nth-child(2) img{
      width: 48rpx!important;
	    height: 40rpx!important;
    }
    .icon-boxb .icon:nth-child(3) img{
      width: 38rpx!important;
	    height: 40rpx!important;
    }
    .icon-boxb .icon:nth-child(4) img{
      width: 44rpx!important;
	    height: 40rpx!important;
    }
    .icon-boxb .icon:nth-child(5) img{
      width: 42rpx!important;
	    height: 40rpx!important;
    }
    .icon-box{
      padding-bottom: 40rpx;
      .icon{
        width: 230rpx;
        text-align: center;
        margin-top: 40rpx;
        position: relative;
        span{
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          color: #fff;
          font-size: 20rpx;
          background-color: #ff3333;
          position: absolute;
          top: -16rpx;
          right: 83rpx;

        }
        img{
          width: 52rpx;
          height: 52rpx;
          margin-bottom: 5rpx
        }
      }
    }
  }
}
.top-box{
  height: 407rpx;
  width: 100vw;
  position: relative;
  .bg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5
  }
  .top{
    width: 100%;
    height: 270rpx;
    position: absolute;
    z-index: 9;
    padding-left: 40rpx;
    .left{
      width: 130rpx;
	    height: 130rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      margin-right: 20rpx
    }
    .right{
      .one{
        p{
          font-size: 40rpx;
          font-weight: 900;
          color: #fff;
        }
        .vip{
          width: 124rpx;
          height: 32rpx;
          background-color: #bb945c;
          border-radius: 16rpx;
          margin-left: 20rpx;
          img{
            width: 32rpx;
	          height: 32rpx;
            margin-right: 5rpx;
          }
          span{
            font-size: 20rpx;
            color: #fff
          }
        }
      }
      .two{
        color: #fff;
        margin-top: 20rpx
      }
    }
  }
}
</style>
