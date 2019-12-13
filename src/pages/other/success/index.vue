<template>
  <div>
    <div class="flex flexColumn flexAlignCenter succ">
        <img src="/static/images/icons/fin.png" alt="" class="img">
        <div class="font30 fb mt2">订单支付成功</div>
        <div class="fb mt2"><span class="font24">￥</span><span class="font30">594.00</span></div>
    </div>
    <div class="flex justifyContentAround mt5">
        <p class="btn_cut">返回首页</p>
        <p class="btn_cut">查看订单</p>
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
