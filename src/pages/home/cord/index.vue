<template>
  <div class="bg_fff" style="min-height:100vh"> 
      <img src="/static/images/yuyue.png" alt="" class="cr_bg">
      <div class="pw3 bg_fff">
          <div class="flex p3 co_bd">
              <span>课程</span>
              <input type="text" placeholder="请输入您感兴趣的课程" class="flex1 text_right">
          </div>
          <div class="flex p3 co_bd">
              <span>姓名</span>
              <input type="text" placeholder="请输入您的姓名" class="flex1 text_right">
          </div>
          <div class="flex p3 co_bd">
              <span>手机号</span>
              <input type="text" placeholder="请输入您的手机号" class="flex1 text_right">
          </div>
      </div>
      <div class="gou flex pp3">
          <input type="radio" checked="true">
          <p class="cg ml1">确认以上信息真实有效</p>
      </div>
      <div class="btn">提交</div>
  </div>
</template>

<script>
import { host, post, get, throtte } from "@/utils";
import "@/style/bb.scss"
export default {
  data() {
    return {
      
    };
  },
  onLoad(params) {
   
  },
  onShow() {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "在线登记"
      });
    },
    
    goUrl(url) {
      wx.navigateTo({
        url: `/pages/member2/${url}/main`
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
  .cr_bg{
    width:100%;vertical-align: middle;
  }
  .co_bd{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .btn{
    color:#ffffff;background: #cc9f68;
    margin:100rpx auto 0;
  }
</style>
