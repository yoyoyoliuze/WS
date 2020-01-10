<template>
  <div>
      <div class="top ali-c jus-b">
        <p>我的余额</p>
        <p>￥{{Wallet}}</p>
      </div>
      <div class="title ali-c jus-b">
        <p>余额充值</p>
        <!-- <span>金卡会员充值98折</span> -->
      </div>
      <div class="list-box flex-wrap jus-b">
        <div class="list flexc" v-for="(item,index) in moneyList" :key="index" :class="activeIndex==index?'active':''" @tap="chose(index)">{{item.RechargeAmount}}元 (到账{{item.ActualBalance}}元)</div>
      </div>
      <p class="ali-c chongzhi">充值方式</p>
      <div class="pay ali-c jus-b gou">
        <div class="ali-c">
          <img src="/static/images/weixin.png" alt="">
          <p>微信支付</p>
        </div>
        <radio checked></radio>
      </div>
      <p class="btn flexc" @tap="submit()">立即充值</p>
  </div>
</template>

<script>
import {post,wx_pay} from '@/utils'
export default {

  data () {
    return {
      userId:"",
      token:"",
      Wallet:"",
      moneyList:[],
      activeIndex:0,
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.getData()
    this.getChargeList()
  },
  methods:{
    getData(){//查询会员状态
      post('User/GetMemInfo',{
        UserId: this.userId,
        Token: this.token
      }).then(res=>{
        if(res.code==0){
          this.Wallet = res.data.Wallet
        }
      })
    },
    getChargeList(){
      post('Recharge/RechargeList',{
        UserId: this.userId,
        Token: this.token,
        Page:1
      }).then(res=>{
        if(res.code==0){
          if(res.data.length){
            res.data.map(item=>{
              this.$set(item,"Statu",false)
            })
          }
          this.moneyList = res.data
        }
      })
    },
    chose(key){
      this.activeIndex = key
    },
    async submit(){
      console.log(this.moneyList[this.activeIndex].RechargeAmount)
      const res = await post('Order/WeiXinSmallRechAmount',{
        UserId: this.userId,
        Token: this.token,
        RechargeAmount:this.moneyList[this.activeIndex].RechargeAmount
      })
      if(res.code==0){
        const pay = await wx_pay(res.data.JsParam)
        this.paySuccess(pay)
      }
    },
    paySuccess(){
      wx.showToast({title:"支付成功！"})
    }
  }
}
</script>

<style scoped lang='scss'>
.btn{
  width: 690rpx;
	height: 88rpx;
	background-color: #cc9f68;
  border-radius: 8rpx;
  margin: 180rpx auto 0;
  color: #fff
}
.pay{
  height: 128rpx;
  background-color: #fff;
  padding: 0 30rpx;
  img{
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx
  }
}
.chongzhi{
  height:80rpx ;
  padding: 0 30rpx
}
.list-box{
  padding: 0 30rpx;
  .list{
    width: 334rpx;
    height: 90rpx;
    background-color: #ffffff;
    border: solid 2rpx #ebebeb;
    margin-bottom: 20rpx;
  }
  .active{
    border: 2rpx solid #cc9f68;
    background-color: #f5f5f5
  }
}
.title{
  height: 120rpx;
  padding: 0 30rpx;
  span{
    color: #ff3333;
    font-size: 24rpx
  }
}
.top{
  background-color: #fff;
  margin-top: 20rpx;
  height: 116rpx;
  padding: 0 30rpx;
}
.active{
  border:1rpx solid #cc9f68!important;
}
</style>
