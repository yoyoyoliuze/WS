<template>
  <div class="page_detail">
      <div>
          <img src="/static/images/zhijia.png" alt="" class="zhijia">
          <div class="flex justifyContentBetween pp3 bg_fff flexAlignCenter">
              <div class="flex1">
                  <div class="ser_name fb">新年款式美甲</div>
                  <p class="flex cg mt1 flexAlignCenter">
                      <span class="s_pill font20">30分钟</span>
                      <span>眼部祛皱 改善黑眼圈</span>
                  </p>
                  <p class="cr mt1">¥<span class="price">298</span></p>
                  <p class="cg ">服务时长：60分钟</p>
              </div>
              <div class="flex flexColumn flexAlignCenter">
                  <p class="flex flexColumn flexAlignCenter sh_bg">
                      <img src="/static/images/icons/share.png" alt="" class="share">
                      <span class="cg">分享</span>
                  </p>
                  <p class="cg mt3">2563人预约</p>
              </div>
          </div>
      </div>
      <div class="mt2 bg_fff pw3">
          <div class="flex p2 bor_bill justifyContentBetween flexAlignCenter">
              <p class="flex flexAlignCenter">
                  <img src="/static/images/jishi.png" alt="" class="shop_ava">
                  <span class="mr2">万色印象万众城店</span>
              </p>
              <img src="/static/images/icons/phone.png" alt="" class="phone">
          </div>
          <div class="flex p2 justifyContentBetween flexAlignCenter">
              <p>深圳市龙华区民治大道辉华大厦正门口 </p>
              <img src="/static/images/icons/tu.png" alt="" class="site">
          </div>
      </div>
      <div class="mt2 bg_fff">
        <div class="pp3 text_center">产品介绍</div>
        <img src="/static/images/s1.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s2.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s3.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s4.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s5.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s6.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s7.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s8.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s9.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s10.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s11.png" alt="" class="pic" mode="widthFix">
        <img src="/static/images/s12.png" alt="" class="pic" mode="widthFix">
      </div>
      <div class="fix_btn">立即预约</div>
  </div>
</template>

<script>

import '@/style/bb.scss'

export default {
  data () {
    return {
      
    }
  },
  onShow(){
    this.setBarTitle()
  },
  components: {
   
  },

  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "项目详情"
        });
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .zhijia{
    width:100%;vertical-align: middle;
  }
  .share{
    width:30rpx;height:30rpx;
  }
  .ser_name{
    font-size:35rpx;
  }
  .s_pill{
    padding:0 15rpx;color:#ffffff;background: #f00;
    height:30rpx;line-height: 30rpx;
    border-radius: 5rpx;margin-right:15rpx;
  }
  .price{
    font-size:35rpx;
  }
  .sh_bg{
    background: #f2f2f2;
    border-radius:50%;width:100rpx;height:100rpx;
    display: flex;
    justify-content: center;
    span{
      font-size:22rpx;
    }
  }
  .shop_ava{
    width:60rpx;height:60rpx;border-radius:50%;
  }
  .phone{
    width:60rpx;height:60rpx;
  }
  .site{
    width:44rpx;height:39rpx;
  }
  .bor_bill{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .pic{
    width:100%;vertical-align: middle
  }
  .fix_btn{
    height:90rpx;line-height: 90rpx;
    color:#ffffff;background: #cc9f68;
    position: fixed;bottom:0;width:100%;text-align: center;
  }
  .page_detail{
    padding-bottom:100rpx;
  }
</style>
