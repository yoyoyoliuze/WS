<template>
  <div style="padding-bottom:100rpx" v-if="hasData">
      <div class="top flexc">
        <span :class="move?'move':''">{{data.Payment=='到店付款'?data.Payment:data.StatusName}}</span>
      </div>
      <div class="shop ali-c jus-b">
        <div class="ali-c jus-b" @click="goShopDetail">
          <img class="left" :src="data.ShopData.Logo" alt="">
          <p>{{data.ShopData.ShopName}}</p>
        </div>
        <img class="right" src="/static/images/address_r.png" alt="" @tap="openLoca">
      </div>
      <div class="jus-box">
        <div class="ali-c jus-b"><p>预约序号</p><span>{{data.MakeNum}}</span></div>
        <div class="ali-c jus-b"><p>预约日期</p><span>{{data.MakeDate}}</span></div>
        <!-- <div class="ali-c jus-b"><p>开始时间</p><span>16:30</span></div> -->
      </div>
      <div class="jus-box">
        <div class="ali-c jus-b"><p>服务项目</p><span>{{data.serInfo.serve}}</span></div>
        <div class="ali-c jus-b"><p>服务时长</p><span>{{data.MakeHour}}小时</span></div>
        <div class="ali-c jus-b"><p>总金额</p><span>¥{{data.TotalAmount}}</span></div>
        <div class="ali-c jus-b" v-if="data.YhPrice"><p>折扣</p><span>-¥{{data.YhPrice}}</span></div>
        <div class="ali-c jus-b" v-if="data.ZkPrice"><p>优惠券</p><span>-¥{{data.ZkPrice}}</span></div>
        <div class="ali-c jus-b" v-if="data.Freight"><p>服务费</p><span>+¥{{data.Freight}}</span></div>
      </div>
      <div class="ali-c jus-e heji">
        <span>支付金额:￥{{data.Total}}</span>
      </div>
      <div class="jishi" v-if="data.PicData.length>0">
        <div class="tit ali-c"><span></span><p>技师图片</p></div>
        <scroll-view scroll-x enable-flex class="jishi-img ali-c">
          <div class="ali-c">
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
        <p class="flexc tt_item" @tap="payStatus=true" v-if="data.Ispay==1">支付</p>
        <p class="flexc tt_item" @tap="menuItem(item1)" v-if="data.IsComment==1">评价</p>
        <p class="flexc tt_item" @tap="menuItem(item1)" v-if="data.IsCancel==1">取消预约</p>
        <p class="flexc tt_item" @tap="onReservation()" v-else>重新预约</p>
      </div>
      <pay :total="data.Total" :orderNumber="data.OrderNumber" v-if="payStatus" 
        @onClose="payStatus = false" 
        @success="onPayconfirm"
        >
      </pay>
  </div>
</template>

<script>
import {post,openLocation,Reservation,Payconfirm} from '@/utils';
import pay from '@/components/pay.vue';
export default {
  components:{pay},

  data () {
    return {
      move:false,
      userId:"",
      token:"",
      OrderNo:"",
      data:{},
      hasData:false,//是否开始渲染数据
      payStatus:false,
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
      if(this.data.IsComment==1){//去往评价页面
        wx.navigateTo({
          url:'/pages/myson/pingjia/main?OrderNo='+this.data.OrderNumber
        })
      }else if(this.data.IsCancel==1){//取消预约
        this.cancleOrder()
      }
    },
    // 取消订单
    cancleOrder(){
      const that =this;
      wx.showModal({
        title:'是否取消预约',
        confirmColor:'#cc9f68',
        cancelColor:'#999',
        success(ret){
          if(ret.confirm){
              post('Order/CancelOrders',{
                UserId:that.userId,
                Token:that.token,
                OrderNo:that.data.OrderNumber,
              }).then(res=>{
                if(res.code==0){
                  wx.showToast({title:"订单取消成功~"})
                  that.getData()
                }
              })
          }
        }
      })
    },
    // 确认付款
    onPayconfirm(type,pwd){
      Payconfirm(this.data.OrderNumber,type,pwd).then(res=>{
        wx.showToast({
          title:'支付成功'
        })
        this.payStatus = false;
        setTimeout(()=>{
            this.getData();
        },1500)
      })
    },
    // 重新预约
    onReservation(){
      Reservation(this.data);
    },
    openLoca(){
      const location = this.data.ShopData;
      openLocation({lat:location.Lat,lng:location.Lng})
    },
    goShopDetail(){
        wx.navigateTo({
          url:'/pages/other/chose/main?id='+this.data.ShopData.ShopId
        })
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
.tt_item{
  margin-left:20rpx;
}
</style>
