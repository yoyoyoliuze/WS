<template>
  <div style="padding-bottom:100rpx;">
      <div class="md_card">
          <img src="/static/images/icons/bg6.png" alt="" class="bg6">
          <div class="ff_card">
              <img src="/static/images/icons/bg11.png" alt="" class="bg11">
              <div class="ff_size">
                  <p class="font30">会员次卡</p>
                  <p class="font24 mt2">选择任一服务项目，即可专享服务 项目10次，线上线下预约做服务均 可用次卡抵消</p>
              </div>
          </div>
      </div>
      <div class="mt2 bg_fff">
          <div class="fb font30 p3 text_center">次卡服务项</div>
          <div class="se_list">
              <div class="se_item">
                  <div class="pp3 flex justifyContentBetween">
                      <p class="fb">美甲</p>
                      <img src="/static/images/icons/down.png" alt="" class="down">
                  </div>
                  <div class="pw3 item_desc">
                      <div class="flex justifyContentBetween flexAlignCenter desc_main ch_active">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see">查看详情</div>
                      </div>  
                      <div class="flex justifyContentBetween flexAlignCenter desc_main">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see active_btn">查看详情</div>
                      </div> 
                      <div class="flex justifyContentBetween flexAlignCenter desc_main ch_active">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see">查看详情</div>
                      </div> 
                      <div class="flex justifyContentBetween flexAlignCenter desc_main ch_active">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see">查看详情</div>
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
            title: "会员次卡"
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
    background: #ffffff;
    height:550rpx;
    .bg6{
      background:#ffffff;
      width:750rpx;height:362rpx; 
    }
    .ff_card{
      position: relative;
      top:-200rpx;left:60rpx;
      .bg11{
        width:630rrpx;height:321rpx;
      }
      .ff_size{
        position: absolute;
        top:50rpx;left:30rpx;
        color:#ffffff;
        width:50%;
      }

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
    width:100%;
    height:150rpx;border-radius: 15rpx;border:1rpx solid #999999;
    margin-top:20rpx;
    justify-content: center;
  }
  .dd_see{
    color:#ffffff;background:#cc9f68;
    font-size:24rpx;padding:5rpx 20rpx;border-radius:8rpx;
    margin-left:150rpx;
    &.active_btn{
      background: #f00;
    }
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
