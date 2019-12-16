<template>
  <div class="pp3">
      <div class="">
          <div class="font35 fb">17:00-18:00</div>
          <div class="font24 flex justifyContentBetween mt1">
              <p>2019.11.27 (周三)</p>
              <p>预约号：JS001</p>
          </div>
      </div>
      <!--这是服务-->
      <div class="bg_fff mt2 yu_main" style="display:none">
          <div class="flex">
              <img src="/static/images/ava.png" alt="" class="ava">
              <div class="flex1 main_r">
                  <div class="flex justifyContentBetween flexAlignCenter">
                      <div>
                          <p class="font22">预约门店</p>
                          <p class="fb mt1">万色印象罗湖店</p>
                          <p class="mt1 fb">0755-5462530</p>
                      </div>
                      <img src="/static/images/icons/phone.png" alt="" class="phone">
                  </div>
                  <div class="mt2"> 
                      <p class="font22">预约服务</p>
                      <div class="flex flexWrap">
                          <div class="sse_item">
                            <p>彩绘指甲</p>
                            <p class="cr mt1">298元</p>
                          </div>
                          <div class="sse_item">
                            <p>彩绘指甲</p>
                            <p class="cr mt1">298元</p>
                          </div>
                      </div>
                  </div>
                  <div class="mt2">
                      <p class="font22">订单信息</p>
                      <div class="flex mt1 justifyContentBetween">
                          <p>支付方式</p>
                          <p>微信支付</p>
                      </div>
                      <div class="flex mt1 justifyContentBetween">
                          <p>支付金额 </p>
                          <p>¥596.00</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="can_cel">取消预约</div>
      </div>
      <!--这是技师-->
      <div class="bg_fff mt2 yu_main">
          <div class="flex">
              <img src="/static/images/ava.png" alt="" class="ava">
              <div class="flex1 main_r">
                  <div class="mt2"> 
                      <p class="font22">预约技师</p>
                      <div class="fb font30">Alisa</div>
                  </div>
                  <div class="mt2"> 
                      <p class="font22">预约服务</p>
                      <div class="flex flexWrap">
                          <div class="sse_item">
                            <p>彩绘指甲</p>
                            <p class="cr mt1">298元</p>
                          </div>
                          <div class="sse_item">
                            <p>彩绘指甲</p>
                            <p class="cr mt1">298元</p>
                          </div>
                      </div>
                  </div>
                  <div class="flex justifyContentBetween flexAlignCenter mt2">
                      <div>
                          <p class="font22">预约门店</p>
                          <p class="fb mt1">万色印象罗湖店</p>
                          <p class="mt1 fb">0755-5462530</p>
                      </div>
                      <img src="/static/images/icons/phone.png" alt="" class="phone">
                  </div>
                  <div class="mt2">
                      <p class="font22">备注</p>
                      <div class="mt1">我的指甲比软，做的时候注意一下</div>
                  </div>
              </div>
          </div>
          <div class="can_cel">取消预约</div>
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
            title: "我的预约"
        });
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .font35{
    font-size:36rpx;
  }
  .ava{
    width:140rpx;height:140rpx;border-radius:50%;
  }
  .phone{
    width:60rpx;height:60rpx;
  }
  .yu_main{
    border-radius:15rpx;padding:50rpx 30rpx;
  }
  .main_r{
    margin-left:20rpx;
  }
  .sse_item{
    border:1rpx solid #444444;
    width:43%;
    display: flex;justify-content: center;align-items: center;
    flex-direction: column;
    border-radius:10rpx;
    margin-right:20rpx;margin-top:15rpx;padding:15rpx 0;
  }
  .mt2{
    margin-top:30rpx;
  }
  .can_cel{
    width:505rpx;height:80rpx;line-height: 80rpx;
    text-align: center;color:#f00;background: #ececec;
    margin:80rpx auto 20rpx;border-radius:15rpx;
  }
</style>
