<template>
  <div>
    <div class="bg_fff pp3">
        <div class="sc_card flex flexColumn justifyContentCenter">
          <div class="flex justifyContentAround flexAlignCenter">
              <div class="flex flexColumn flexAlignCenter">
                <p>
                  <img src="/static/images/ava.png" alt="" class="ava">
                </p>
                <p class="cf font24">万色印象万众城店<span class="name_pill">店长</span></p>
              </div>
              <div class="cf flex flexColumn flexAlignCenter">
                <p class="font30">17:00-18:00</p>
                <p class="font24 mt2">2019.11.27 (周三)</p>
              </div>
          </div>
          <div class="text_right cf font24 card_num">预约号：JS001</div>
      </div>
    </div>
    <div class="pp3 bg_fff mt2">
        <div class="flex flexAlignCenter">
            <img src="/static/images/icons/col.png" alt="" class="icon1">
            <span class="ml1">预约项目</span>
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
        </div>
    </div>
    <!--服务独有-->
    <div class="flex justifyContentBetween pp3 mt2 bg_fff">
        <div class="flex flexAlignCenter">
            <div class="flex flexAlignCenter">
              <img src="/static/images/icons/yh.png" alt="" class="icon2">
              <span class="ml1">优惠劵</span>
          </div>
          <div class="cg ml1">满减劵  满100减20</div>
        </div>
        <div class="flex flexAlignCenter">
            <span class="cr">-20</span>
            <img src="/static/images/icons/more.png" alt="" class="right ml1">
        </div>
    </div>
    <!---end  !!!-->
    <div class="pp3 bg_fff mt2">
        <div class="flex flexAlignCenter">
            <img src="/static/images/icons/sign.png" alt="" class="icon3">
            <span class="ml1">备注</span>
        </div>
        <textarea class="sign mt2 boxSize" name="" id="" cols="30" rows="10" placeholder="请输入备注"></textarea>
    </div>
    <!--服务按钮-->
    <div class="pp3 flex justifyContentBetween bg_fff mt2">
        <div> 
          <span><span class="cr">2个</span>项目</span>  
          <span class="cen_text">应付款：<span class="cr"> ¥594.00 </span></span>
        </div>
        <div class="btn_yu">立即预约</div>
    </div>
    <!--技师独有-->
    <div class="btn" style="display:none">立即预约</div>

    <!--服务弹层-->
    <div class="mask"></div>
    <div class="modal_mask">
        <div class="flex ms_title fb">
          <img src="/static/images/icons/left.png" alt="" class="left">
          选择支付方式
        </div>
        <div class="pp3">
            <radio-group @change="changes" class="gou">
              <label class="flex-between payitem">
                <div class="flex-center">
                  <img src="/static/images/icons/shop_c.png" class="payimg1" />
                  <span class="ml2">到店支付</span>
                </div>
                <input type="radio" name="payType" :checked="payType==0" value="0" />
              </label>
              <label class="flex-between payitem" >
                <div class="flex-center">
                  <img src="/static/images/icons/wx_c.png" class="payimg2" />
                  <span class="ml2">微信</span>
                </div>
                <input type="radio" name="payType" :checked="payType==1" value="1" />
              </label>
              <label class="flex-between payitem" >
                <div class="flex-center">
                  <img src="/static/images/icons/ye_c.png" class="payimg3" />
                  <span class="ml2">余额</span>
                </div>
                <input type="radio" name="payType" :checked="payType==2" value="2" />
              </label>
            </radio-group>
        </div>
        <div class="msk_btn">确定</div>
        
    </div> 

    <div class="modal_mask">
        <div class="flex ms_title fb">
          <img src="/static/images/icons/left.png" alt="" class="left">
          选择优惠券
        </div>
        <div class="pp3">
            <radio-group @change="changes" class="gou">
              <label class="flex-between payitem">
                <div class="flex-center">
                  <span>满减劵  </span>
                  <span class="ml2"> 满100减20</span>
                </div>
                <input type="radio" name="payType" :checked="payType==0" value="0" />
              </label>
              <label class="flex-between payitem" >
                <div class="flex-center">
                  <span>满减劵  </span>
                  <span class="ml2"> 满100减20</span>
                </div>
                <input type="radio" name="payType" :checked="payType==1" value="1" />
              </label>
              <label class="flex-between payitem" >
                <div class="flex-center">
                  <span>满减劵  </span>
                  <span class="ml2"> 满100减20</span>
                </div>
                <input type="radio" name="payType" :checked="payType==2" value="2" />
              </label>
            </radio-group>
        </div>
        <div class="msk_btn">完成</div>
        
    </div> 
      
  </div>
</template>

<script>

import '@/style/bb.scss'

export default {
  data () {
    return {
      payType:0
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
            title: "预约确定"
        });
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .sc_card{
    background: #333333;border-radius:25rpx;
    width:690rpx;height:380rpx;
    margin:0 auto;position: relative; 
  }
  .ava{
    width:150rpx;height:150rpx;border-radius:50%;
  }
  .card_num{
    position: absolute;right:30rpx;bottom:30rpx;
  }
  .font30{
    font-size:40rpx;
  }
  .name_pill{
    font-size:20rpx;background: #cc9f68;color:#ffffff;
    padding:0 10rpx;margin-left:8rpx;
  }
  .item_desc{
    padding-bottom:20rpx;
  }
  .desc_main{
    width:275rpx;
    height:150rpx;border-radius: 15rpx;border:1rpx solid #999999;
    margin-top:20rpx;
    justify-content: center;
  }
  .icon1{
    width:34rpx;height:30rpx;
  }
  .icon2{
    width:35rpx;height:27rpx;
  }
  .icon3{
    width:30rpx;height:30rpx;
  }
  .right{
    width:13rpx;height:24rpx;
  }
  .sign{
    width:100%;
    height:200rpx;border:1rpx solid #ececec;
    padding:20rpx;
  }
  .cen_text{
    margin-left:50rpx;
  }
  .btn_yu{
    color:#ffffff;background: #cc9f68;
    padding:0 25rpx;
    font-size:24rpx;
    height:50rpx;line-height: 50rpx;
  }
  .btn{
    margin:50rpx auto 20rpx;
    background: #cc9f68;color:#ffffff;
  }
  .ms_title{
    position: relative;
    display: flex;justify-content: center;
    width:100%;font-size:30rpx;
    padding-top:30rpx;
  }
  .left{
    width:15rpx;height:26rpx;
    position: absolute;left:30rpx;top:50%;transform: translateY(-50%)
  }
  .flex-between{
    display: flex;justify-content: space-between;align-items: center;
  }
  .flex-center{
    display: flex;align-items: center;
  }
  .payimg1{
    width:56rpx;height:52rpx;
  }
  .payimg2{
    width:56rpx;height:56rpx;
  }
  .payimg3{
    width:56rpx;height:53rpx;
  }
  .payitem{
    padding:15rpx 0;
  }
  .ml2{
    margin-left:20rpx;
  }
  .msk_btn{
    width:690rpx;
    margin:10rpx auto 10rpx;
    color:#ffffff;background: #cc9f68;text-align: center;
    height:80rpx;line-height: 80rpx;border-radius:15rpx;
  }
</style>
