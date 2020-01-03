<template>
  <div>
      <div class="list jus-b">
        <div class="left flex">
          <div class="ill_ll cr">
            <p class="cr"><span class="twity">20</span>元</p>
          </div>
          <div>
            <p>满100元减20元券</p>
            <span>有效期至2020-01-12</span>
            <div class="flexc use tll">减满券</div>
          </div>
        </div>
        <div class="right flexc">
          <div class="cf">立即领取</div>
        </div>
      </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {
  data () {
    return {
      data:[],
      userId:"",
      token:"",
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getData()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    getData(){
      post('Coupon/CouponCenter',{
        UserId:this.userId,
        Token:this.token,
        Page:1
      }).then(res=>{
        if(res.code==0){
          this.data = res.data
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20rpx;
  left: 450rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20rpx;
  left: 450rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690rpx;
  height: 180rpx;
  border-radius: 15rpx;
  margin: 30rpx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .use{
    background-color: #cc9f68!important
  }
  .left{
    width: 460rpx;
    padding: 60rpx 0 0 35rpx;
    position: relative;
    span{
      font-size: 20rpx;
      color: #999;
    }
    .tll{
      width: 128rpx;
	    height: 40rpx;
	    background-color: #cc9f68;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24rpx;
      color: #fff
    }
  }
  .right{
    width: 230rpx;
    background-color: #cc9f68;
    text-align: center;
    p{
      color: #fff;
      font-size: 56rpx;
      font-weight: 900;
      span{
        font-size: 20rpx
      }
    }
    span{
      font-size: 20rpx;
      color: #fff;
    }
  }
}

.ill_ll{
  margin-right:30rpx;margin-top:10rpx;
  .twity{
    font-size:40rpx!important;
    color:#f00!important;
  }
}


</style>
