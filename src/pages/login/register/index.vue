<template>
  <div class="sectionPage">
    <div class="main">
      <div class="regLoginBox">
        <div class="logo">
          <div class="img">
            <img src="/static/images/logo.png" />
          </div>
        </div>
        <div class="from pd10">
          <div class="from-line">
            <img src="/static/images/icons/phone1.png" class="phone-icon" alt="" mode="widthFix">
            <input type="text" class="ipt phone-input" placeholder="请输入手机号码" v-model="phoneNumber" />
          </div>
          <div class="from-line">
            <img src="/static/images/icons/phoneCode.png" class="phoneCode-icon" alt="" mode="widthFix">
            <input type="text" class="ipt" placeholder="请输入验证码" v-model="verifyCode" />
            <!-- <div class="getcode" @click="getCode(this)">{{btnText}}</div> -->
            <button
              class="getcode"
              :style="btnText!=='获取验证码'?'background:#ccc;':''"
              @click="getVerifyCode(this)"
            >{{btnText}}</button>
          </div>
          <!-- <div class="from-line"  v-if="inviteCode !=''">
            <span class="icon icon_code"></span>
            <input type="text" class="ipt" placeholder="邀请码" disabled v-model="inviteCode" />
            <button
              class="getcode"
              style="font-size:28rpx;background:#ccc;width:26%;"
            >邀请码</button>
          </div> -->
          <!-- <div class="from-line">
            <span class="icon icon_pwd"></span>
            <input type="password" class="ipt" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="from-line">
            <span class="icon icon_pwd"></span>
            <input type="password" class="ipt" placeholder="请确认密码" v-model="password2" />
          </div> -->
          
          <!-- <div class="flex flexAlignCenter">
            <label class=" flex flexAlignCenter" @click="onCheckedStatus">
              <div class="IconsCK IconsCK-radio checked" style="margin-right:12rpx;vertical-align:top;"></div>
              <input
                type="checkbox"
                class="checkbox-cart"
                :checked="checkedStatus"
                v-model="checkedStatus"
              />
              <text style="font-size:28rpx">我已阅读并同意</text>
              </label>
              <text style="color:#3172f5;font-size:28rpx" @click="goUrl('deal')">《银查查认证服务协议》</text>
          </div> -->
        </div>
        <div class="ftbtn pd10">
          <a class="btn" @click="onRegister()">确认注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { host, post, get, throtte } from "@/utils";
import logins from "@/utils/login";
export default {
  data() {
    return {
      btnText: "获取验证码",
      phoneNumber: "",
      verifyCode: "",
      password: "",
      password2: "",
      disabled: false,
      checkedStatus: true,
      shareId: "",
      timeout: false,
      inviteCode:"",//邀请码
    };
  },
  onLoad(params) {
    this.btnText = "获取验证码";
    this.phoneNumber = "";
    this.verifyCode = "";
    this.password = "";
    this.password2 = "";
    this.disabled = false;
    this.checkedStatus = true;
    this.setBarTitle();
    this.shareId = params.shareId || "";
  },
  onShow() {
    if(wx.getStorageSync('theyCode') !='undefined'){
      this.inviteCode = wx.getStorageSync('theyCode')
    }else{
    }
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "注册"
      });
    },
    // 用户协议
    onCheckedStatus(e) {
      this.checkedStatus = !this.checkedStatus;
    },
    // 事件节流
    onRegister() {
      throtte(this.Register);
    },
    //注册账号
    async Register() {
      // if (!this.registerCheck()) return;
      const userInfo = wx.getStorageSync("userInfo");
      const openId = wx.getStorageSync("openId");
      const token = wx.getStorageSync("wxToken");
      const unionid = wx.getStorageSync("unionid");
      const res = await post("Login/BindOrRegister", {
        mobile: this.phoneNumber,
        yzCode: this.verifyCode,
        // PassWord: this.password,
        // OkPassWord: this.password2,
        unionid: unionid, //微信统一unionid号
        openId: openId,
        // LoginParameterType:0,
        // Token: token,
        userInfo:{
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
        },
        // gender: userInfo.gender === 1 ? "男" : "女",
        // IdentityType: 1, //操作的身份值 1-客户 2-师傅
        InviteCode:this.inviteCode
      });
      const _res = res.data;
      if(res.code==0){
        wx.showToast({
          title: "绑定手机成功",
          icon: "success",
          duration: 2000
        });
      }else{
        wx.showToast({
        title: res.msg,
        icon:'none',
        duration: 2000
      });
      }
      //绑定手机成功之后,延时2秒跳转到会员中心
      setTimeout(function() {
        // 登录
        logins({
          success() {
            wx.navigateBack();
          }
        });
        // wx.switchTab({
        //   url: "/pages/mine/main"
        // });
      }, 1500);
    },
    // 发送验证码
    getVerifyCode(that) {
      if (this.disabled) {
        return false;
      }
      const TIME_COUNT = 60; // 60s后重新获取验证码
      let codeNum = this.verificationCode;
      let phoneNum = this.phoneNumber;
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(phoneNum)) {
        wx.showToast({
          title: "请输入正确的手机号",
          icon: "none",
          duration: 1500
        });
        return false;
      } else {
        // 验证码类型 会员注册0,会员登录1,会员找回密码2,会员找回支付密码3,会员修改手机号4,
        // 会员重新绑定手机号5,会员微信绑定手机号6, 师傅登录7,师傅注册8,师傅绑定银行卡9,
        // 师傅微信绑定手机号10,师傅修改手机号11,师傅重新绑定手机号12,师傅找回密码13,
        // 客服登录14,客服找回密码15,客服绑定账号16
        const result = get("Login/GetMiniAppBindTelCode", {
          mobile: this.phoneNumber,
        });
        wx.showToast({
          title: "短信已发送",
          icon: "success",
          duration: 2000
        });
        if (!this.timer) {
          this.count = TIME_COUNT;

          that.disabled = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.btnText = this.count + "s后重新获取";
            } else {
              that.disabled = false;
              clearInterval(this.timer);
              this.timer = null;
              this.btnText = "获取验证码";
            }
          }, 1000);
        }
      }
    },
    // 注册校验
    registerCheck() {
      if (!this.checkedStatus) {
        wx.showToast({
          title: "请阅读并同意用户协议",
          icon: "none",
          duration: 2000
        });
        return false;
      }

      if (!this.phoneNumber || !this.verifyCode) {
        wx.showToast({
          title: "请填写手机号和验证码",
          icon: "none",
          duration: 2000
        });
        return false;
      }

      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(this.phoneNumber)) {
        wx.showToast({
          title: "请填写正确的手机号",
          icon: "none",
          duration: 2000
        });
        return false;
      }
      // if (!this.password) {
      //   wx.showToast({
      //     title: "请填写密码！",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return false;
      // }
      // if (this.password !== this.password2) {
      //   wx.showToast({
      //     title: "两次输入的密码不相同！",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return false;
      // }
      return true;
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
@import "./style";
.img {
  width:300rpx;
  height:300rpx;
  img {
   width:100%;
   height:100%;
  }
}
.font30{
  font-size:40rpx;
}
</style>
