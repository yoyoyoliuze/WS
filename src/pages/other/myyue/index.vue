<template>
  <div class="pp3">
      <div class="">
          <div class="font35 fb">{{info.MakeTime}}</div>
          <!-- <div class="font24 flex justifyContentBetween mt1">
              <p>2019.11.27 (周三)</p>
              <p>预约号：JS001</p>
          </div> -->
      </div>
      <!--这是服务-->
      <div class="bg_fff mt2 yu_main" v-if="!info.ServiceMode">
          <div class="flex">
              <img :src="shopInfo.Logo"  alt="" class="ava">
              <div class="flex1 main_r">
                  <div class="flex justifyContentBetween flexAlignCenter">
                      <div>
                          <p class="font22">预约门店</p>
                          <p class="fb mt1">{{shopInfo.ShopName}}</p>
                          <p class="mt1 fb">{{shopInfo.Phone}}</p>
                      </div>
                      <img src="/static/images/icons/phone.png" alt="" class="phone" @click="call">
                  </div>
                  <div class="mt2"> 
                      <p class="font22">预约服务</p>
                      <div class="flex flexWrap">
                          <div class="sse_item" v-for="(item,index) in info.OrderDetails" :key="index">
                            <p>{{item.ProductName}}</p>
                            <p class="cr mt1">{{item.ActualPay}}元</p>
                          </div>
                      </div>
                  </div>
                  <div class="mt2">
                      <p class="font22">订单信息</p>
                      <div class="flex mt1 justifyContentBetween">
                          <p>支付方式</p>
                          <p>到店支付</p>
                      </div>
                      <div class="flex mt1 justifyContentBetween">
                          <p>支付金额 </p>
                          <p>¥{{info.TotalAmount}}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="can_cel" @click="cancleOrder">取消预约</div>
      </div>
      <!--这是技师-->
      <div class="bg_fff mt2 yu_main" v-else>
          <div class="flex">
              <img :src="artInfo.ArtPic" alt="" class="ava">
              <div class="flex1 main_r">
                  <div class="mt2"> 
                      <p class="font22">预约技师</p>
                      <div class="fb font30">{{artInfo.ArtName}}</div>
                  </div>
                  <div class="mt2"> 
                      <p class="font22">预约服务</p>
                      <div class="flex flexWrap">
                          <div class="sse_item" v-for="(item,index) in info.OrderDetails" :key="index">
                            <p>{{item.ProductName}}</p>
                            <p class="cr mt1">{{item.ActualPay}}元</p>
                          </div>
                      </div>
                  </div>
                  <div class="flex justifyContentBetween flexAlignCenter mt2">
                      <div>
                          <p class="font22">预约门店</p>
                          <p class="fb mt1">{{shopInfo.ShopName}}</p>
                          <p class="mt1 fb">{{shopInfo.Phone}}</p>
                      </div>
                      <img src="/static/images/icons/phone.png" alt="" class="phone">
                  </div>
                  <div class="mt2">
                      <p class="font22">备注</p>
                      <div class="mt1">{{info.Remarks}}</div>
                  </div>
              </div>
          </div>
          <div class="can_cel" @click="cancleOrder">取消预约</div>
      </div>
      
              
      
      
  </div>
</template>

<script>

import '@/style/bb.scss'
import {post,callPhone} from '@/utils'
export default {
  data () {
    return {
      info:{},
      shopInfo:{},
      artInfo:{},
      orderNo:'',
      type:0,//0-店铺；1-技师
    }
  },
  onLoad(options){
    this.setBarTitle();
    this.orderNo = options.orderNo;
    this.type = options.type||0;
    this.getData();
  },
  components: {
   
  },

  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "我的预约"
        });
    },
    getData(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.orderNo,
      }).then(res=>{
        if(res.code==0){
          this.info = res.data;
          this.shopInfo = res.data.ShopData;
          this.artInfo = res.data.ArtData;

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
    // 拨打电话
    call(){
      callPhone(this.info.Tel)
    },
    // 取消订单
    cancleOrder(){
      const that =this;
      wx.showModal({
        title:'是否取消该订单',
        success(ret){
          if(ret.confirm){
              post('Order/CancelOrders',{
                UserId:wx.getStorageSync("userId"),
                Token:wx.getStorageSync("token"),
                OrderNo:that.orderNo,
              }).then(res=>{
                if(res.code==0){
                  wx.showToast({title:"订单取消成功~"})
                  wx.navigateBack();
                }
              })
          }
        }
      })
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .font35{
    font-size:36rpx;
  }
  .ava{
    width:140rpx;height:140rpx;border-radius:50%;
  }
  .phone{
    width:60rpx;height:60rpx;
  }
  .yu_main{
    border-radius:15rpx;padding:50rpx 30rpx;
  }
  .main_r{
    margin-left:20rpx;
  }
  .sse_item{
    border:1rpx solid #444444;
    width:43%;
    display: flex;justify-content: center;align-items: center;
    flex-direction: column;
    border-radius:10rpx;
    margin-right:20rpx;margin-top:15rpx;padding:15rpx 0;
  }
  .mt2{
    margin-top:30rpx;
  }
  .can_cel{
    width:505rpx;height:80rpx;line-height: 80rpx;
    text-align: center;color:#cc9f68;background: #ececec;
    margin:80rpx auto 20rpx;border-radius:15rpx;
  }
</style>
