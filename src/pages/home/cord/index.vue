<template>
  <div class="bg_fff" style="min-height:100vh"> 
      <img src="/static/images/yuyue.jpg" alt="" class="cr_bg">
      <div class="pw3 bg_fff">
          <div class="flex p3 co_bd">
              <span>课程</span>
              <input type="text" v-model.trim="val1" placeholder="请输入您感兴趣的课程" class="flex1 text_right">
          </div>
          <div class="flex p3 co_bd">
              <span>姓名</span>
              <input type="text" v-model.trim="name" placeholder="请输入您的姓名" class="flex1 text_right">
          </div>
          <div class="flex p3 co_bd">
              <span>手机号</span>
              <input type="text" v-model.trim="phone" placeholder="请输入您的手机号" class="flex1 text_right">
          </div>
      </div>
      <div class="gou flex pp3">
          <input type="radio" :checked="isCheck" @tap="tapCheck">
          <p class="cg ml1">确认以上信息真实有效</p>
      </div>
      <div class="btn" @click="submit">提交</div>
  </div>
</template>

<script>
import { host, post, get, throtte,valPhone } from "@/utils";
import "@/style/bb.scss"
export default {
  data() {
    return {
      isCheck:false,
      val1:'',
      name:'',
      phone:'',
    };
  },
  onLoad(params) {
    this.setBarTitle();
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
    },
    tapCheck(){
      if(this.isCheck){
        this.isCheck = false
      }else{
        this.isCheck = true
      }
    },
    submit(){
      if(!this.checked()){
        return false;
      }
      post('About/OnlineReg',{
        Title:this.val1,
        FullName:this.name,
        Mobile:this.phone
      }).then(res=>{
        wx.showToast({
          title:res.msg
        })
      })
    },
    // 校验
    checked(){
      if(!this.val1){
        this.tips('请输入您感兴趣的课程');
        return false;
      }
      if(!this.name){
        this.tips('请输入您的姓名');
        return false;
      }
      if(!valPhone(this.phone)){
        return false;
      }
      if(!this.isCheck){
        this.tips('请确认以上信息真实有效');
        return false;
      }
      return true;
    },
    tips(title){
      wx.showToast({
        title,
        icon:'none'
      })
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
