<template>
  <div class="pp3 bg_fff" style="min-height:100vh">
    <div class="pp3">
        <div class="chose_title fb">请选择你要的服务</div>
        <div class="font24 chose_sub">
            <p>纹绣、化妆、美容、皮肤、美甲等</p>
            <p>各门类的专业技师</p>
        </div>
        <div class="flex chose_main justifyContentBetween">
            <p class="flex flexColumn flexAlignCenter">
                <img src="/static/images/icons/fu.png" @click="cliImg(0)" alt="" class="av_icon" :class="{'active':active===0}">
                <span class="ch_name fb">预约服务</span>
            </p>
            <p class="flex flexColumn flexAlignCenter">
                <img src="/static/images/icons/ji.png" @click="cliImg(1)" alt="" class="av_icon" :class="{'active':active===1}">
                <span class="ch_name fb">预约技师</span>
            </p>
        </div>
        <div class="ch_btn" @click="goUrl()">确定</div>
    </div>
  </div>
</template>

<script>

import '@/style/bb.scss'

export default {
  data () {
    return {
      active:0
    }
  },
  onShow(){
    this.setBarTitle()
  },
  components: {
   
  },

  methods: {
    cliImg(index){
      this.active = index
    },
    goUrl(){
      wx.redirectTo({
        url:'/pages/myson/shopDetail/main?id='+this.$mp.query.id+'&server='+this.active
      })
    },
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "选择服务"
        });
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .chose_title{
    font-size:45rpx;margin-top:50rpx;
    margin-bottom:30rpx;
  }
  .chose_sub{
    color:#666666;
  }
  .av_icon{
    width:250rpx;height:250rpx;border-radius:50%;border:5rpx solid #fff;
  }
  .av_icon.active{
    border:5rpx solid #cc9f68;
  }
  .chose_main{
    margin-top:100rpx;
  }
  .ch_name{
    font-size:37rpx;margin-top:20rpx;
  }
  .ch_btn{
    width:100%;height:88rpx;line-height: 88rpx;color:#ffffff;background:#cc9f68;border-radius: 15rpx;text-align: center;
    margin-top:150rpx;
  }
</style>
