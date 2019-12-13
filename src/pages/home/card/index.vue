<template>
  <div class="bg_fff b_card">
      <div class="swiper_bb">
        <img src="/static/images/icons/bg1.png" alt="" class="img_bg">
        <swiper class="swiper-box" display-multiple-items='1' interval='3000' circular previous-margin="60" next-margin="60" @change="swiperChange">
          <swiper-item class="swiper-item" v-for="(item,index) in 3" :key="index">
            <div class="card" :class="swiperIndex==index?'active_swiper':'quite'">
                <img src="/static/images/icons/jin.png" alt="" v-if="index==0">
                <img src="/static/images/icons/yin.png" alt="" v-if="index==1">
                <img src="/static/images/icons/si.png" alt="" v-if="index==2">
                <div class="card_detail flex flexWrap">
                    <p class="font30 fb">金卡</p>
                    <p class="font30 fb">￥18800元</p>
                    <p class="font24 mt2">项目折扣</p>
                    <p class="font24 mt2">6.8折</p>
                </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div class="pp3 mt5">
          <div class="card_br">
              <img src="/static/images/detail_bg.png" alt="" class="img">
              <div class="card_main boxSize">
                  <p class="font30">根据身份不同享有不同的特权</p>
                  <p class="font30 mt1">金卡会员专项权益：</p>
                  <div class="flex flexWrap font24 mt2">
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div class="btn_fix">立即升级会员</div>
  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  onShow(){
  },

  data () {
    return {
      swiperIndex:0,
    }
  },
  methods: {
    //轮播滑动时，获取当前的轮播id
    swiperChange(e) {
      console.log(e)
      const that = this;
      this.swiperIndex=e.mp.detail.current
    },
    switchPath(url){
      wx.navigateTo({
        url
      })
    }
    
  },
}
</script>

<style lang='scss' scoped>
  .btn_fix{
    width:100%;background: #cc9f68;height:88rpx;line-height: 88rpx;
    color:#ffffff;text-align: center;position: fixed;bottom:0;z-index:20
  }
  .b_card{
    min-height: 100vh;
  }
  .card_br{
    position: relative;width:690rpx;height:450rpx;
    .img{
      width:100%;height:100%;
    }
    .card_main{
      background: #ffffff;border-radius:15rpx;
      position: absolute;top:90rpx;left:30rpx;width:630rpx;height:320rpx;
      padding:50rpx 30rpx;
    }
    .card_pill{
      display: inline-block;width:15rpx;height:15rpx;border-radius: 50%;background: #cc9f68;
      margin-right:10rpx;
    }
    .card_item{
      width:50%;margin-top:10rpx;color:#444444;
    }
  }
  .swiper_bb{
    position: relative;
    width:750rpx;height:353rpx;
    overflow-y: hidden;
    .img_bg{
      width:100%;height:353rpx;vertical-align: middle;
    }
  }
  .swiper-box{
    width:100%;
    position: absolute;z-index:40;top:10rpx;left:0;
    height:300rpx;
    .card{
      z-index:60;
      width:480rpx;height:260rpx;position: relative;
      img{
        width:100%;height:100%;
      }
    }
    .card_detail{
      width:400rpx;height:132rpx;
      top:60rpx;left:60rpx;
      position: absolute;z-index:80;
      color:#a1782c;
      p{
        width:50%;
      }
    }
    .swiper-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      overflow:unset;
    }
    .active_swiper{
      transform: scale(1.05);
      transition:all .2s ease-in 0s;
    }
    .quite{
      transform: scale(0.9);
      transition: all 0.2s ease-in 0s;
    }
  }
  // ._swiper-item{
  //   transform:translateY(15%)!important;
  // }
</style>
