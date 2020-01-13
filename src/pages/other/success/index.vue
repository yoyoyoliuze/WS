<template>
  <div>
    <div class="flex flexColumn flexAlignCenter succ">
        <img v-if="status" src="/static/images/icons/fin.png" alt="" class="img">
        <img v-else src="/static/images/icons/fail.png" alt="" class="img">
        <div class="font30 fb mt2">{{status?'订单支付成功':'订单支付失败,订单已创建'}}</div>
        <div class="fb mt2"><span class="font24">￥</span><span class="font30">{{price}}</span></div>
    </div>
    <div class="flex justifyContentAround mt5">
        <p class="btn_cut" @click="gohome">返回首页</p>
        <p class="btn_cut" @click="goOrder">查看订单</p>
    </div>
      
  </div>
</template>

<script>
import '@/style/bb.scss'
export default {

  data () {
    return {
        orderNo:'',
        status:false,
        price:0,
    }
  },
  onLoad(options){
    this.orderNo = options.orderNo;
    this.status = options.status||false;
    this.price = options.price*1;
  },
  methods:{
    gohome(){
        wx.switchTab({
          url:`/pages/index/main`
        })
    },
    goOrder(){
        wx.reLaunch({
          url:`/pages/orderson/orderDetail/main?OrderNo=${this.orderNo}`
        })
    }
  }
}
</script>

<style scoped lang='scss'>
  .img{
    width:186rpx;height:171rpx;
  }
  .btn_cut{
    width:240rpx;height:70rpx;line-height: 70rpx;
    border:1rpx solid #999999;border-radius: 15rpx;
    text-align: center;font-size:24rpx;
  }
  .succ{
    margin-top:120rpx;
  }
</style>
