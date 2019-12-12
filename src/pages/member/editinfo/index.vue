<template>
  <div>
      <div class="list-box bg_fff">
        <div class="ava_list">
          <span>头像</span>
          <div class="avatar">
              <img src="/static/images/ava.png" alt="" class="img">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>工号</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" class="flex1 text_right">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>真实姓名</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" class="flex1 text_right">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>手机号</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" class="flex1 text_right" value="13562365214">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>性别</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请选择" disabled class="flex1 text_right">
            <img src="/static/images/icons/more.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>生日</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请选择" disabled class="flex1 text_right">
            <img src="/static/images/icons/more.png" alt="">
          </div>
        </div>
        <div class="pp3" >
          <span>服务简介</span>
          <div class="mt2">
              <textarea class="text_fl" name="" id="" cols="30" rows="10" placeholder="请输入您的服务简介" ></textarea>
              <div class="text_right">0/100</div>
          </div>
        </div>
      </div>
      <div class="btn">保存</div>
  </div>
</template>

<script>
import '@/style/bb.scss'

export default {
  
  onShow(){
  },

  data () {
    return {
      info:{},
    }
  },
  methods: {
    
    switchPath(url){
      wx.navigateTo({
        url
      })
    }
    
  },
}
</script>

<style lang='scss' scoped>
.list-box{
  margin-top:20rpx;
  .list{
    height: 88rpx;
    line-height: 88rpx;
    padding:0 30rpx;
    display: flex;justify-content: space-between;align-items: center;
    border-bottom: 1rpx solid #ededed;
  }
  .ava_list{
    display: flex;justify-content: space-between;align-items: center;
    border-bottom: 1rpx solid #ededed;padding:0 30rpx;
    height:180rpx;
  }
  .phone{
    color:#999999!important;
    font-size:26rpx;margin-right:10rpx;
  }
  .list_img{
    span{
      font-size: 28rpx;
      color: #333
    }
    img{
      width: 11rpx;
      height: 20rpx;
      margin-left:10rpx;
    }
  }
}
.avatar{
  height:120rpx;width:120rpx;
  border-radius:50%;
  .img{
    width:120rpx;height:120rpx;border-radius:50%;
  }
}
.text_fl{
  height:200rpx;
}
.btn{
  background: #cdaa79;
  height:80rpx;height:80rpx;line-height: 80rpx;width:690rpx;margin: 0 auto;color:#ffffff;border-radius: 15rpx;
  margin-top:50rpx;
}
</style>
