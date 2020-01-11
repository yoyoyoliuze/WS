<template>
  <div class="page_detail">
      <div>
          <swiper indicator-dots indicator-active-color="#cc9f68" style="height:421rpx;">
              <swiper-item v-for="(item,index) in data.PicData" :key="index">
                     <img :src="item.PicUrl" alt="" class="zhijia">
              </swiper-item>
          </swiper>
          <div class="flex justifyContentBetween pp3 bg_fff flexAlignCenter">
              <div class="flex1">
                  <div class="ser_name fb">{{data.Name}}</div>
                  <p class="flex cg mt1 flexAlignCenter">
                      <span class="s_pill font20">{{data.HourNum*60}}分钟</span>
                      <span>{{data.Synopsis}}</span>
                  </p>
                  <p class="cr mt1">¥<span class="price">{{data.Price}}</span></p>
                  <p class="cg ">服务时长：{{data.HourNum*60}}分钟</p>
              </div>
              <div class="flex flexColumn flexAlignCenter">
                  <p class="flex flexColumn flexAlignCenter sh_bg">
                      <img src="/static/images/icons/share.png" alt="" class="share">
                      <span class="cg">分享</span>
                  </p>
                  <p class="cg mt3">{{data.SalesVolume}}人预约</p>
              </div>
          </div>
      </div>
      <div class="mt2 bg_fff pw3" v-if="data.ShopData">
          <div class="flex p2 bor_bill justifyContentBetween flexAlignCenter">
              <p class="flex flexAlignCenter">
                  <img :src="data.ShopData.Logo" alt="" class="shop_ava">
                  <span class="mr2">{{data.ShopData.ShopNick}}</span>
              </p>
              <img src="/static/images/icons/phone.png" alt="" class="phone" @click="callPhone">
          </div>
          <div class="flex p2 justifyContentBetween flexAlignCenter">
              <p>{{data.ShopData.Address}}</p>
              <img src="/static/images/icons/tu.png" alt="" class="site" @click="openLocation">
          </div>
      </div>
      <div class="mt2 bg_fff">
        <div class="pp3 text_center">产品介绍</div>
        <div v-html="ContentDetail"></div>
      </div>
      <div class="fix_btn" @click="submit">立即预约</div>
  </div>
</template>

<script>

import '@/style/bb.scss';
import {post} from '@/utils/index';
export default {
  data () {
    return {
        userID:'',
        token:'',
        ID:'',
        lat:'',
        lng:'',
        data:{},
    }
  },
  onLoad(options){
    this.ID = options.id;
    const location = wx.getStorageSync('location');
    this.lat = location.lat;
    this.lng = location.lng;
    this.userID = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getData();
  },
  onShow(){
    this.setBarTitle()
  },
  components: {
   
  },
  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "项目详情"
        });
    },
    getData(){
      post('Goods/Goodsxq',{
        Id:this.ID,
        Lat:this.lat,
        Lng:this.lng,
        UserId:this.userID,
        Token:this.token
      }).then(res=>{
          console.log(res)
          this.data = res.data;
      })
    },
    openLocation(){
        const shop = this.data.ShopData;
        console.log(shop)
        wx.openLocation({
            latitude:shop.Lat*1,
            longitude:shop.Lng*1,
            name:shop.ShopNick,
            address:shop.Address
        })
    },
    callPhone(){
        if(this.data.ShopData.Phone){
            wx.makePhoneCall({
            phoneNumber: this.data.ShopData.Phone //仅为示例，并非真实的电话号码
            })
        }
    },
    // 预约
    submit(){
        wx.setStorageSync('submitPro',{
          proId:this.ID,
          shopId:this.data.ShopData.ShopId,
          time:this.data.HourNum*60,
          proNum:1
        })
        wx.navigateTo({
            url:`/pages/other/apointtime/main`
        })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .zhijia{
    width:100%;vertical-align: middle;height:100%;
  }
  .share{
    width:30rpx;height:30rpx;
  }
  .ser_name{
    font-size:35rpx;
  }
  .s_pill{
    padding:0 15rpx;color:#ffffff;background: #f00;
    height:30rpx;line-height: 30rpx;
    border-radius: 5rpx;margin-right:15rpx;
  }
  .price{
    font-size:35rpx;
  }
  .sh_bg{
    background: #f2f2f2;
    border-radius:50%;width:100rpx;height:100rpx;
    display: flex;
    justify-content: center;
    span{
      font-size:22rpx;
    }
  }
  .shop_ava{
    width:60rpx;height:60rpx;border-radius:50%;
  }
  .phone{
    width:60rpx;height:60rpx;
  }
  .site{
    width:44rpx;height:39rpx;
  }
  .bor_bill{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .pic{
    width:100%;vertical-align: middle
  }
  .fix_btn{
    height:90rpx;line-height: 90rpx;
    color:#ffffff;background: #cc9f68;
    position: fixed;bottom:0;width:100%;text-align: center;
  }
  .page_detail{
    padding-bottom:100rpx;
  }
</style>
