<template>
  <div>
      <div class="md_card flex flexAlignCenter mt2 bd_border">
          <img src="/static/images/ava.png" alt="" class="avatar">
          <div>
              <p class="name">Lisa李<span class="md_pill">店长</span></p>
              <p class="font24 cg">前面有3人，约等待60分钟</p>
          </div>
      </div>
      <div class="mt2 bg_fff">
          <div class="fb font30 p3 text_center">服务项</div>
          <div class="se_list">
              <div class="se_item">
                  <div class="pp3 flex justifyContentBetween">
                      <p class="fb">美甲</p>
                      <img src="/static/images/icons/down.png" alt="" class="down">
                  </div>
                  <div class="pw3 item_desc flex flexWrap justifyContentBetween">
                      <div class="flex flexColumn flexAlignCenter desc_main ch_active">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                  </div>
              </div>
              <div class="se_item">
                  <div class="pp3 flex justifyContentBetween">
                      <p class="fb">美甲</p>
                      <img src="/static/images/icons/more.png" alt="" class="more">
                  </div>
                  <div class="pw3 item_desc flex flexWrap justifyContentBetween" style="display:none">
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                  </div>
              </div>
              <div class="se_item">
                  <div class="pp3 flex justifyContentBetween">
                      <p class="fb">美甲</p>
                      <img src="/static/images/icons/more.png" alt="" class="more">
                  </div>
                  <div class="pw3 item_desc flex flexWrap justifyContentBetween" style="display:none">
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                      <div class="flex flexColumn flexAlignCenter desc_main">
                          <p>彩绘指甲</p>
                          <p class="font24">（服务时长：半小时）</p>
                          <p class="cr">298元</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="bg_fff pp3 flex justifyContentBetween yu_btn">
          <div><span class="cr">1</span> 个项目，服务时长<span class="cr">半小时</span> </div>
          <div class="btn_next">下一步</div>
      </div>
      
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
            title: "预约"
        });
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
.md_card{
    background:#ffffff;
    width:750rpx;height:212rpx;
    padding:0 30rpx;
    box-sizing: border-box;
  }
  .avatar{
    width:120rpx;height:120rpx;border-radius:50%;
    margin-right: 20rpx;
  }
  .name{
    font-size:38rpx;
  }
  .bd_border{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .ch_head{
    padding-bottom:20rpx;
  }
  .ch_title{
    background: #cc9f68;
    border-radius: 15rpx 15rpx 0 0;color:#ffffff;
  }
  .ch_item{
    width:33%;
    text-align: center;
    padding:15rpx 0;
    display: flex;
    color:#999;
    flex-direction: column;align-items: center;justify-content: center;
    border:1rpx solid #f5f5f5;
    &:nth-child(2){
      border:0;
      border-bottom: 1rpx solid #f5f5f5;
    }
  }
  .yu_btn{
    width:100%;position: fixed;bottom: 0;left:0;
    box-sizing: border-box;
  }
  .btn_next{
    color:#ffffff;background: #cc9f68;
    padding:8rpx 20rpx;border-radius: 10rpx;
  }
  .se_item{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .item_desc{
    background: #f5f5f5;padding-bottom:20rpx;
  }
  .desc_main{
    width:275rpx;
    height:150rpx;border-radius: 15rpx;border:1rpx solid #999999;
    margin-top:20rpx;
    justify-content: center;
  }
  .ch_active{
      color:#f00;border:1rpx solid #f00;
    }
  .down{
    width:27rpx;height:15rpx;
  }
  .more{
    width:13rpx;height:24rpx;
  }
  .md_pill{
    color:#ffffff;background: #cc9f68;font-size:22rpx;
    padding:2rpx 15rpx;margin-left:15rpx;border-radius: 5rpx;
  }
</style>
