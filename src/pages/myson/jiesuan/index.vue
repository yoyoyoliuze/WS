<template>
  <div>
      <div class="card-box flexc">
        <div class="card">
          <div class="ali-c jus-b top">
            <p>{{type==1?'会员卡':'会员次卡'}}</p>
            <p><span>￥</span>{{total}}</p>
          </div>
          <p class="bottom ali-c">您当前正在开通金卡会员服务，开通后会享受相应权益，会员服务为虚拟产品购买后不会过期，不支持退款。</p>
        </div>
      </div>
      <div class="pp3 bg_fff mt2">
          <radio-group @change="changes" class="gou">
            <label class="flex-between payitem" >
              <div class="flex-center">
                <img src="/static/images/icons/wx_c.png" class="payimg2" />
                <span class="ml2">微信</span>
              </div>
              <input type="radio" name="payType" :checked="payType==1" value="1" />
            </label>
            <label class="flex-between payitem" >
              <div class="flex-center">
                <img src="/static/images/icons/ye_c.png" class="payimg3" />
                <span class="ml2">余额</span>
              </div>
              <input type="radio" name="payType" :checked="payType==2" value="2" />
            </label>
          </radio-group>
      </div>
      <p class="btna flexc" @tap="submit()">立即支付</p>
      <!--余额支付弹层-->
      <div class="mask" v-if="isShow" @tap="isShow=false" catchtouchmove="true"></div>
      <div class="payPasswordComponent flex-content" v-if="isShow">
            <input
                type="password"
                v-model="password"
                @input="editPaw"
                :focus="focusflag"
                maxlength="6"
            />
            <div class="box">
                <div class="header">
                请输入支付密码
                    <div class="close" @tap="closePasswordInput">×</div>
                </div>
                <div class="bodys flex-content" @tap="onFocusflag">
                    <div class="boxItem flex-content" v-for="i in 6" :key="i">
                        <div class="item2" v-show="i<password.length"></div>
                    </div>
                </div>
                <div class="cb" style="text-align:right;padding:0 30rpx" @tap="forget">忘记密码</div>
            </div>
      </div>
  </div>
</template>

<script>
import {post,wx_pay} from '@/utils'
export default {

  data () {
    return {
      Id:0,
      userId:"",
      token:"",
      total:0,
      type:"",//1-会员卡还是2-会员次卡
      payType:1,
      focusflag: true, //支付密码获取焦点
      isShow:false,
      password:'',
    }
  },
  onShow(){
    this.Id = this.$mp.query.id
    this.total = this.$mp.query.price
    this.type = this.$mp.query.type
    console.log(this.Id,this.total,"3333333")
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
  },
  methods:{
    changes(e){
      // console.log(e.mp.detail)
      this.payType = e.mp.detail.value
    },
    async submit(){
      console.log(this.payType,"this.payType")
      if(this.payType==1){ //微信支付
        post('Order/WeiXinSmallSubCard',{
          UserId:this.userId,
          Token:this.token,
          Id:this.Id*1
        }).then(res=>{
            if(res.code==0){
              const pay = await wx_pay(res.data.JsParam)
              this.paySuccess(pay)
            }
        })
      }else{
        //余额支付
        this.isShow = true
      }
    },
    paySuccess(){
      wx.showToast({
        title:'支付成功！'
      })
    },
    // 输入密码
    editPaw() {
        // console.log(this.password)
        if (this.password.length === 6) {
            this.success();
            this.password = "";
            
        }
    },
    // 获取焦点
    onFocusflag() {
        this.focusflag = false;
        this.focusflag = true;
    },
    // 关闭密码输入框
    closePasswordInput() {
        this.isShow=false;
    },
    //忘记密码
    forget(){
        wx.navigateTo({
            url:"/pages/member/setPwd/main"
        })
    },
    async success(){
      post('Order/SubCardPay',{
          UserId: this.userId,
          Token: this.token,
          Id:this.Id,
          Password:this.password
        }).then(res=>{
          this.isShow = false
          wx.showToast({
              title:"支付成功！"
          })
          setTimeout(()=>{
            //普通订单去个人中心我的订单
            wx.redirectTo({
              url:'/pages/mine/main'
            })
          },1500)
        }).catch(err=>{ 
            this.isShow = false
            console.log( this.isShow)
            console.log(res)
        })
    },
    

  }
}
</script>

<style scoped lang='scss'>
.btna{
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 88rpx;
  background-color: #cc9f68;
  color: #fff;
  font-size: 32rpx
}
.pay{
  height: 128rpx;
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  img{
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx
  }
}
.card-box{
  height: 340rpx;
  background-color: #ffffff;
  .card{
    width: 690rpx;
    height: 252rpx;
    border-radius: 8rpx;
    border: solid 1rpx #ececec;
    overflow: hidden;
    .bottom{
      height: 120rpx;
      color: #999;
      font-size: 24rpx;
      line-height: 36rpx;
      padding: 0 30rpx;
    }
    .top{
      height: 132rpx;
      color: #fff;
      background-color: #cc9f68;
      padding: 0 30rpx;
      p{
        font-size: 32rpx;
        span{
          font-size: 24rpx
        }
      }
    }
  }
}
.flex-between{
    display: flex;justify-content: space-between;align-items: center;
  }
  .flex-center{
    display: flex;align-items: center;
  }
  .payimg1{
    width:56rpx;height:52rpx;
  }
  .payimg2{
    width:56rpx;height:56rpx;
  }
  .payimg3{
    width:56rpx;height:53rpx;
  }
  .payitem{
    padding:15rpx 0;
    background: #ffffff;
  }
  .ml2{
    margin-left:20rpx;
  }
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
.bodys .boxItem .item2 {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #000;
}
</style>
