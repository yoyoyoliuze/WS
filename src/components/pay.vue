<template>
  <div >
    <!--遮罩层-->
    <div class="mask-modal" @click="onClose"></div>
    <!--确认付款-->
    <div v-if="showPayStatus===1||showPayStatus===3" class="paywindows">
      <div class="paytile flex-between">
        <img src="http://jrwd.wtvxin.com/upload/images/icons/close.png" class="close" @click="onClose" />
        <text>确认付款</text>
        <span @click="forgetPassword">忘记支付密码？</span>
      </div>
      <div class="maskprice">￥{{total}}</div>
      <div class="flex-between maskitem">
        <div class="fontclolr">订单号</div>
        <div>{{orderNumber}}</div>
      </div>
      <div class="flex-between maskitem" @click="showPayStatus=2">
        <div class="fontclolr">付款方式</div>
        <div>
          <text class="wx">{{payType*1===1?'会员余额':payType*1===0?'微信支付':'到店支付'}}</text>
          <img src="http://jrwd.wtvxin.com/upload/images/icons/right.png" class="right" />
        </div>
      </div>
      <div class="paybtn" @click="pay">确认付款</div>
    </div>
    <!--选择付款方式-->
    <div v-if="showPayStatus===2" class="paymask">
      <div class="paytile">
        <img
          src="http://jrwd.wtvxin.com/upload/images/icons/leftarrow.png"
          class="leftarrow leftposi"
          @click="showPayStatus = 1"
        />
        <text>选择支付方式</text>
      </div>
      <div class="gou">
        <radio-group @change="changes">
          <label class="flex-between payitem" v-if="payMode==='none'">
            <div class="flex-center">
              <img src="/static/images/icons/shop_c.png" class="payimg" />
              到店支付
            </div>
            <input type="radio" name="payType" :checked="payType==2" value="2" />
          </label>
          <label class="flex-between payitem" v-if="payMode==='wx'||payMode==='none'">
            <div class="flex-center">
              <img src="/static/images/icons/wx_c.png" class="payimg" />
              微信支付
            </div>
            <input type="radio" name="payType" :checked="payType==0" value="0" />
          </label>
          <label class="flex-between payitem"  v-if="payMode==='balance'||payMode==='none'">
            <div class="flex-center">
              <img src="/static/images/icons/ye_c.png" class="payimg" />
              会员余额
            </div>
            <input type="radio" name="payType" :checked="payType==1" value="1" />
          </label>
        </radio-group>
      </div>
    </div>
    <!-- 支付密码组件 -->
    <div class="payPasswordComponent flex-content" v-if="showPayStatus===3" @click.self="closePasswordInput">
      <input
        type="number"
        password
        v-model="password"
        @input="editPaw"
        :focus="focusflag"
        maxlength="6"
      />
      <div class="box">
        <div class="header">
          请输入支付密码
          <div class="close" @click.stop="closePasswordInput">×</div>
        </div>

        <div class="bodys flex-content" @click="onFocusflag">
          <div class="boxItem flex-content" v-for="i in 6" :key="i">
            <div class="item" v-if="i<password.length"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//##  参数：
// total--支付价格（确认与后台支付金额一致)
// orderNumber -- 订单编号
// payMode -- 支付模式，none--默认全部可选；wx --微信支付；balance -- 余额。

// ## event: 动作事件
// onClose --关闭弹窗
// success -- 点击支付或者输入支付密码后。
// -------接收：
//            payType---  Number支付类型；0--微信支付.1--余额支付；2--到店付款
//            password--- string支付密码


import { post } from "@/utils/index";
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    orderNumber: {
      type: String,
      default: ""
    },
    payMode:{
      type:String,
      default:'none'
    }
  },
  data() {
    return {
      focusflag: true, //支付密码获取焦点
      showPayStatus:1, //支付密码状态 1--支付；2--选择支付方式；3--填写支付密码
      payType: 0,// 0--微信支付；1--余额支付；2--到店付款
      password:'',
      forgetPasswordUrl:'/pages/member/setPwd/main',//忘记密码跳转url
    };
  },
  onLoad() {
    this.showPayStatus = 1;
    if(this.payMode==='balance'){
      this.payType=1
    }else{
      this.payType=0
    }
  },
  methods: {
    // 获取焦点
    onFocusflag() {
      this.focusflag = false;
      this.focusflag = true;
    },
    changes(e) {
      this.payType = e.mp.detail.value;
      this.showPayStatus = 1;
      console.log(e);
    },
    // 确认付款
    pay() {
      console.log(this.payType);
      if (this.payType * 1) {
         // 如果是余额支付弹出输入支付密码框，并获取焦点
        this.showPayStatus=3;
        this.focusflag = true;
      } else {
         // 否则直接完成
         this.success();
      }
    },
    // 关闭支付弹窗
    onClose(){
        this.$emit("onClose");
    },
    // 完成支付
    success(){
      console.log('password',this.password)
        this.$emit('success',this.payType,this.password);
    },
    // 输入密码
    editPaw(e) {
      if (this.password.length === 6) {
        this.success();
        this.password = "";
      }
    },
    // 关闭密码输入框
    closePasswordInput() {
        this.showPayStatus=1;
    },
   //  设置支付密码跳转页面
    forgetPassword() {
      const that =this;
      wx.showModal({
        title: "设置密码",
        content: "订单已创建，请前往我的订单进行支付！",
        confirmColor: "#cc9f68",
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: that.forgetPasswordUrl });
          } else if (res.cancel) {
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mask-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
}
.paywindows {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 101;
  background: #fff;
  height: 680rpx;
  width: 100%;
}
.flex-center {
  display: flex;
  align-items: center;
}
.flex-center img {
  margin-right: 20rpx;
}
.payPassword {
  text-align: right;
}
.paytile span {
  padding-top: 20rpx;
  font-size: 20rpx;
  color: #999;
}

.paytile {
  position: relative;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
}
.paytile .close {
  width: 28rpx;
  height: 28rpx;
  margin-right: 102rpx;
}
.maskprice {
  font-weight: bold;
  font-size: 68rpx;
  text-align: center;
  padding: 30rpx 0;
}
.maskitem {
  padding: 30rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}
.fontclolr {
  color: #999;
}
.wx {
  margin-right: 20rpx;
}
.leftposi {
  position: absolute;
  top: 50%;
  left: 20rpx;
  margin-top: -11rpx;
}
.payimg {
  width: 56rpx;
  height: 56rpx;
}
.payitem {
  padding: 40rpx 20rpx;
  border-bottom: 1rpx solid #ececec;
}
/*立即下单的按钮样式*/
.paybtn {
  width: 660rpx;
  height: 90rpx;
  margin: 60rpx auto 0;
  background: #cc9f68;
  border-radius: 10rpx;
  line-height: 90rpx;
  font-size: 30rpx;
  color: #fff;
  text-align: center;
}
/*右侧箭头*/
.right {
  width: 12rpx;
  height: 22rpx;
}
/*左侧箭头*/
.leftarrow {
  width: 16rpx;
  height: 30rpx;
  vertical-align: middle;
}
.plr30 {
  padding-left: 30rpx;
  padding-right: 30rpx;
}
/* 选择支付方式 */

.paymask {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  box-sizing: border-box;
  /* padding-bottom:60rpx; */
  background: #fff;
}
/* ----------------------------支付密码--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

.flex-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.payPasswordComponent {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 102;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.payPasswordComponent input {
  position: absolute;
  z-index: -99999;
  top: 0;
  left: -800rpx;
}

.payPasswordComponent .box {
  width: 85%;
  background: #fff;
  border-radius: 10rpx;
}

.payPasswordComponent .header {
  font-size: 35rpx;
  font-weight: 600;
  line-height: 100rpx;
  text-align: center;
  position: relative;
  border-bottom: 1rpx #e8e8e8 solid;
}
.payPasswordComponent .header .close {
  position: absolute;
  font-weight: 400;
  right: 10rpx;
  top: -20rpx;
  font-size: 50rpx;
  color: #999;
}
.bodys {
  height: 200rpx;
  position: relative;
}
.bodys .boxItem {
  width: 80rpx;
  height: 80rpx;
  border-left: 1rpx #c8c8c8 solid;
  border-top: 1rpx #999 solid;
  border-bottom: 1rpx #999 solid;
}
.bodys .boxItem:first-child {
  border-left: 1rpx #999 solid;
}
.bodys .boxItem:last-child {
  border-right: 1rpx #999 solid;
}
.bodys .boxItem .item {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #000;
}
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/*复选框清除默认样式*/
.checkbox-cart .wx-checkbox-input {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50% !important;
}
.checkbox-cart .wx-checkbox-input.wx-checkbox-input-checked {
  background: #cc9f68;
  border-radius: 50% !important;
  border: 0 !important;
  width: 45rpx;
  height: 45rpx;
}
.checkbox-cart .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 42rpx;
  height: 42rpx;
  border-radius: 50% !important;
  line-height: 42rpx;
  text-align: center;
  font-size: 30rpx;
  color: #ffffff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
/*单选按钮清除默认样式*/
radio .wx-radio-input {
  /* 自定义样式.... */
  height: 40rpx;
  width: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #999;
  background: transparent;
}

/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
radio .wx-radio-input.wx-radio-input-checked {
  border: none;
  background: #cc9f68;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
radio .wx-radio-input.wx-radio-input-checked::before {
  border-radius: 50%; /* 圆角 */
  width: 45rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
  height: 45rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
  line-height: 45rpx;
  text-align: center;
  font-size: 30rpx; /* 对勾大小 30rpx */
  color: #fff; /* 对勾颜色 白色 */
  background: #cc9f68;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
/*清除input默认样式*/
input[type="text"] {
  outline: none;
  border: 0;
  font-size: 25rpx;
}
</style>


