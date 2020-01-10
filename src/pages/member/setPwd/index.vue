<template>
    <div class="set">
        <div class="flex justifyContentBetween pp3 bg_fff mt2">
            <span >当前手机号</span><!--自动获取-->
            <input type="text" placeholder="手机号" class="input_cell" disabled :value="Mobile">
        </div>
        <div class="flex justifyContentBetween pp3 bg_fff">
            <span >验证手机号</span>
            <input type="text" placeholder="请输入手机号" class="input_cell" v-model="Phone">
        </div>
        <div class="flex justifyContentBetween pp3 bg_fff">
            <span>验证码</span>
            <p class="flex input_cell flexAlignCenter">
                <input type="text" placeholder="请输入验证码" class="flex1" v-model="Code"> 
                <span class="btnCode cb" @tap="getCode">{{codeMsg}}</span>
            </p>
           
        </div>
        <div class="flex justifyContentBetween pp3 bg_fff">
            <span>新密码</span>
           <input type="text" placeholder="请输入6位支付密码" class="input_cell" v-model="PassWord">
        </div>
        <div class="flex justifyContentBetween pp3 bg_fff">
            <span>确认密码</span>
           <input type="text" placeholder="请再次输入6位密码" class="input_cell" v-model="pwd2">
        </div>
        <div class="btn" style="margin-top:100rpx;" @tap="btnSubmit">
            <div class="fill cf">确认</div>
        </div>
    </div>
</template>

<script>
import "@/style/bb.scss";
import {post,get,trim} from "@/utils/index";
export default {
    data(){
        return {
            userId:"",
            token:"",
            codeMsg:"获取验证码",
            IdentityType:2,//1-客户 2-专家
            Token:'',
            Mobile:'',//系统获取的手机号
            Phone:'',//用户输入的手机号
            PassWord:'',
            pwd2:'',
            Code:"",
            VerifyCode:'',
            timer: null,
            count: "",
            TIME_COUNT: 60,
            has_click: false
        }
    },
    onShow(){
        this.setBarTitle()
        this.userId = wx.getStorageSync("userId");
        this.token = wx.getStorageSync("token");
        this.initData()
        this.GetMemberMobile()
    },
    methods:{
        setBarTitle() {
            wx.setNavigationBarTitle({
                title: "设置支付密码"
            });
        },
        initData(){
            this.Mobile =  ""  //获取到的当前的手机号
            this.PassWord =  ""
            this.pwd2 =  ""
            this.Code =  ""
            clearInterval(this.timer);
            this.has_click = false;
            this.timer = null;
            this.codeMsg = "获取验证码";
        },
        GetMemberMobile() {
            //获取绑定的手机号
            let that = this;
            post(
                "User/GetMemberMobile",
                {
                UserId: that.userId,
                Token: that.token
                }
            ).then(res => {
                if (res.code === 0) {
                     that.Mobile = res.data.Mobile;
                }
            });
        },
        valOther() {
            if(trim(this.Phone) == ""){
                wx.showToast({
                    title: "请输入手机号!",
                    icon: "none",
                    duration: 1500
                });
                return false;
            }
            if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.Phone)){
                wx.showToast({
                    title: "请输入正确的手机号!",
                    icon: "none",
                    duration: 1500
                });
                return false;
            }
            if (trim(this.Code) == "") {
                wx.showToast({
                    title: "请输入验证码!",
                    icon: "none",
                    duration: 1500
                });
                return false;
            }
            if (trim(this.PassWord) == "" || trim(this.pwd2) == "") {
                wx.showToast({
                title: "请输入支付密码!",
                icon: "none",
                duration: 1500
                });
                return false;
            }
            if (trim(this.PassWord) !== "" && trim(this.pwd2) !== "") {
                if (trim(this.PassWord).length !== 6 || trim(this.pwd2).length !== 6) {
                wx.showToast({
                    title: "请输入6位支付密码!",
                    icon: "none",
                    duration: 1500
                });
                return false;
                }
                if (trim(this.PassWord) !== trim(this.pwd2)) {
                wx.showToast({
                    title: "两次输入的支付密码不相等!",
                    icon: "none",
                    duration: 1500
                });
                return false;
                }
            }
            return true;
        },
        getCode() {
        //点击发送验证码
        if (!this.has_click) {
                this.GetUpdatePswCode();
            }
        },
        //获取验证码
        async GetUpdatePswCode() {
            let that = this;
            let _CodeType = 0
            post("User/GetUpdatePswCode", {
                UserId: that.userId,
                Token: that.token,
                Mobile: that.Phone,
                Type:1
            }).then(result => {
                if (result.code === 0) {
                that.has_click = true;
                const TIME_COUNT = 90; // 90s后重新获取验证码
                that.count = TIME_COUNT;
                wx.showToast({
                    title: "发送成功，请注意查收!",
                    icon: "none",
                    duration: 1500
                });
                that.timer = setInterval(() => {
                    if (that.count > 0 && that.count <= TIME_COUNT) {
                    that.count--;
                    that.codeMsg = that.count + "s后重新获取";
                    } else {
                    that.has_click = false;
                    clearInterval(that.timer);
                    that.timer = null;
                    that.codeMsg = "获取验证码";
                    }
                }, 1000);
                }
            });
        },
    UpdatePayPwd() {
      //设置支付密码
      let that = this;
      post(
        "User/UpdatePayPwd",
        {
          UserId: that.userId,
          Token: that.token,
          SecondPassWord: that.PassWord,
          VerifyCode: that.Code
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          //设置支付密码成功
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
            success: ()=>{
              clearInterval(that.timer);
              that.has_click = false;
              that.timer = null;
              that.codeMsg = "获取验证码";
              setTimeout(()=>{
                // wx.switchTab({
                //     url: "/pages/my/main"
                // });
                wx.navigateBack()
              },1500)
              
            }
          });
        }
      });
    },
    btnSubmit() {
      //点击确定
      if(this.valOther()){
        this.UpdatePayPwd();
      }
    }
        
    }
}
</script>
<style lang='scss' scoped>
.set{
    div{
        border-bottom:1rpx solid #f5f5f5;
    }
    .input_cell{
        width:75%;
    }
    .btnCode{
        font-size:24rpx;
    }
    .btn{
        color:#ffffff;
        background: #cc9f68;
        margin: 0 auto
    }
}

</style>
