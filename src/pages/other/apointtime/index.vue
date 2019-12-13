<template>
  <div>
      <div class="flex bg_fff pp2">
          <div class="ti_item flex flexColumn">
              <span>今天</span>
              <span class="font22">周二</span>
          </div>
          <div class="ti_item flex flexColumn">
              <span>今天</span>
              <span class="font22">周二</span>
          </div>
          <div class="ti_item flex flexColumn">
              <span>今天</span>
              <span class="font22">周二</span>
          </div>
      </div>
      <div class="pp3">
          <div class="time_item pp3 bg_fff">
              <div class="cfc">上午</div>
              <div class="flex flexWrap time_bor">
                  <span>09:00</span>
                  <span class="active1">09:30</span>
                  <span class="active1">10:00</span>
                  <span>10:30</span>
                  <span class="active2">11:00</span>
                  <span class="active2">11:30</span>
                  <span>12:00</span>
              </div>
          </div>
          <div class="time_item pp3 bg_fff">
              <div class="cfc">下午</div>
              <div class="flex flexWrap time_bor">
                  <span>12:30</span>
                  <span>13:00</span>
                  <span>13:30</span>
                  <span>14:00</span>
                  <span>14:30</span>
                  <span>15:00</span>
                  <span>15:30</span>
                  <span>16:00</span>
                  <span>16:30</span>
                  <span>17:00</span>
                  <span>17:30</span>
                  <span>18:00</span>
              </div>
          </div>
          <div class="time_item pp3 bg_fff">
              <div class="cfc">晚上</div>
              <div class="flex flexWrap time_bor">
                  <span>18:30</span>
                  <span>19:00</span>
                  <span>19:30</span>
                  <span>20:00</span>
                  <span>20:30</span>
                  <span>21:00</span>
                  <span>21:30</span>
                  <span>22:00</span>
              </div>
          </div>
      </div>
      <div  class="bg_fff pp3 flex justifyContentBetween">
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
}
</script>

<style scoped lang='scss'>
  .ti_item{
    width:33%;color:#cc9f68;
    border-right:1rpx solid #f5f5f5;
    text-align:center;
    &:last-child{border:0}
  }
  .time_item{
    border-radius: 15rpx;margin-bottom:20rpx;
  }
  .time_bor{
    span{
      width:22%;text-align: center;margin-top:20rpx;margin-right:20rpx;
      border:1rpx solid #f5f5f5;border-radius: 30rpx;
      height:60rpx;line-height:60rpx;
      &:nth-child(4n){margin-right:0}
    }
    .active1{
      background: #cc9f68;border:0;color:#ffffff
    }
    .active2{
      background: #f5f5f5;border:0
    }
  }
  .btn_next{
    color:#ffffff;background: #cc9f68;
    padding:8rpx 20rpx;border-radius: 10rpx;
  }
</style>
