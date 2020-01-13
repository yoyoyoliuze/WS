<template>
  <div style="padding-bottom:100rpx" v-if="hasData">
      <div class="top flexc">
        <span :class="move?'move':''">{{data.StatueSTR}}</span>
      </div>
      <div class="shop ali-c jus-b">
        <div class="ali-c jus-b">
          <img class="left" :src="data.ShopData.Logo" alt="">
          <p>{{data.ShopData.ShopName}}</p>
        </div>
        <img class="right" src="/static/images/address_r.png" alt="" @tap="openLoca">
      </div>
      <div class="jus-box">
        <div class="ali-c jus-b"><p>预约序号</p><span>{{data.MakeNum}}</span></div>
        <div class="ali-c jus-b"><p>预约日期</p><span>{{data.MakeDate}}</span></div>
        <div class="ali-c jus-b"><p>开始时间</p><span>16:30</span></div>
      </div>
      <div class="jus-box">
        <div class="ali-c jus-b"><p>服务项目</p><span>{{data.serInfo.serve}}</span></div>
        <div class="ali-c jus-b"><p>服务时长</p><span>{{data.MakeHour}}小时</span></div>
        <div class="ali-c jus-b"><p>总金额</p><span>¥{{data.TotalAmount}}</span></div>
        <div class="ali-c jus-b"><p>折扣</p><span>-¥{{data.YhPrice}}</span></div>
        <div class="ali-c jus-b"><p>优惠券</p><span>-¥{{data.ZkPrice}}</span></div>
      </div>
      <div class="ali-c jus-e heji">
        <span>支付金额:￥{{data.Total}}</span>
      </div>
      <div class="jishi">
        <div class="tit ali-c"><span></span><p>技师图片</p></div>
        <scroll-view scroll-x enable-flex class="jishi-img ali-c">
          <div class="ali-c" v-if="data.PicData.length>0">
            <img mode='aspectFill' :src="item.PicUrl" alt="" v-for="(item, index) in data.PicData" :key="index">
          </div>
        </scroll-view>
      </div>
      <div class="info">
        <div class="tit ali-c"><span></span><p>订单信息</p></div>
        <p>订单编号：{{data.OrderNumber}}</p>
        <p>创建时间：{{data.OrderTime}}</p>
        <p>支付时间：{{data.OrderTime}}</p>
        <p>取消时间：{{data.OrderTime}}</p>

      </div>
      <div class="end jus-e ali-c">
        <p class="flexc" @tap="menuItem">{{data.StatueSTR=='已服务'?'评价':(data.StatueSTR=='待服务'?'取消预约':'重新预约')}}</p>
      </div>
  </div>
</template>

<script>
import {post,openLocation} from '@/utils'
export default {

  data () {
    return {
      move:false,
      userId:"",
      token:"",
      OrderNo:"",
      data:{},
      hasData:false,//是否开始渲染数据
    }
  },
  onUnload(){
    this.move = false
  },
  onShow(){
    setTimeout(() => {
      this.move = true
    }, 300);
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.OrderNo = this.$mp.query.OrderNo
    this.getData()
  },
  methods:{
    getData(){
      post('Order/OrderDetails',{
        UserId:this.userId,
        Token:this.token,
        OrderNo:this.OrderNo,
      }).then(res=>{
        if(res.code==0){
          let serInfo = {serve:[],total:0}
          this.$set(res.data,"serInfo",serInfo)
          res.data.OrderDetails.map(item2=>{
              serInfo.serve.push(item2.ProductName)
              serInfo.total+=item2.ActualPay
          })
          this.$set(res.data.serInfo,"serve",res.data.serInfo.serve.join(" | "))
          this.data = res.data
          this.hasData = true
          console.log(this.data,"data.ShopData")
        } 
      })
    },
    //订单重新预约等操作
    menuItem(){
      if(data.StatueSTR=='已服务'){//去往评价页面
        wx.navigateTo({
          url:'/pages/index/main?OrderNo='+data.OrderNumber
        })
      }else if(data.StatueSTR=='待服务'){//取消预约
        this.cancleOrder()
      }else{ //重新预约
        wx.navigateTo({
          url:'/pages/index/main'
        })
      }
    },
    cancleOrder(){
      post('Order/CancelOrders',{
        UserId:this.userId,
        Token:this.token,
        OrderNo:data.OrderNumber,
      }).then(res=>{
        if(res.code==0){
          wx.showToast({title:"订单取消成功~"})
          this.getData()
        }
      })
    },
    openLoca(){
      openLocation()
    }
  }
}
</script> 

<style scoped lang='scss'>
.end{
  background-color: #fff;
  width: 100vw;
  height: 98rpx;
  padding: 0 30rpx;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  box-shadow: -3rpx 0 5rpx 5rpx rgba(0,0,0,0.1);
  p{
    width: 201rpx;
    height: 64rpx;
    border-radius: 4rpx;
    border: solid 1rpx #cc9f68;
    color: #cc9f68;
  }
}
.info{
  background-color: #fff;
  padding:  0 30rpx 30rpx 30rpx;
  margin-top: 20rpx;
  p{
    color: #999999;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }
  .tit{
    height: 88rpx;
    p{
      font-size: 28rpx;
      color: #333;
      margin: 0
    }
    span{
      width: 5rpx;
      height: 28rpx;
      background-color: #ed8077;
      border-radius: 2rpx;
      margin-right: 20rpx
    }
  }
}
.jishi{
  background-color: #fff;
  padding:  0 0 30rpx 30rpx;
  margin-top: 20rpx;
  .tit{
    height: 88rpx;
    span{
      width: 5rpx;
      height: 28rpx;
      background-color: #ed8077;
      border-radius: 2rpx;
      margin-right: 20rpx
    }
  }
  .jishi-img{
    height: 180rpx;

    img{
      display: inline-block;
      width: 180rpx;
      height: 180rpx;
      border-radius: 8rpx;
      margin-right: 20rpx;
      
    }
  }
}
.heji{
  height: 88rpx;
  color: #ff3333;
  padding: 0 30rpx;
  background-color: #fff
}
.jus-box{
  background-color: #fff;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #ededed;
  font-size: 24rpx;
  .ali-c{
    height: 60rpx;
  }
}
.shop{
   background-color: #fff;
   border-bottom: 1rpx solid #ededed;
   height: 220rpx;
   padding: 0 30rpx;
   p{
     font-size: 30rpx;
     font-weight: 900 
   }
   .left{
    width: 161rpx;
    height: 161rpx;
    border-radius: 8rpx;
    margin-right: 15rpx
   }
   .right{
    width: 24rpx;
    height: 30rpx;
   }
}
.top{
  background-color: #cc9f68;
  color: #fff;
  height: 132rpx;
  .move{
    right: 0rpx!important
  }
  span{
    position: relative;
    top: 0rpx;
    right: 450rpx;
    transition: all .3s
  }
}
</style>
