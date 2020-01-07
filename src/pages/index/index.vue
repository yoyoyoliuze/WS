<template>
  <div>
    <swiper class="swiper-box" autoplay interval='3000' circular indicator-dots>
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <img mode='aspectFill' :src="item.Pic" alt="">
      </swiper-item>
    </swiper>
    <div class="search-box flexc">
      <div class="search ali-c jus-b">
        <div class="left ali-c">
          <img src="/static/images/search.png" alt="">
          <input type="text" placeholder="请输入发型师或门店名称" placeholder-style='color:#999'>
        </div>
        <div class="right">
          <img src="/static/images/map.png" alt="">
          <p>地图找店</p>
        </div>
      </div>
    </div>
    <div class="hot">
      <div class="tit ali-c jus-b">
        <p>热门项目</p>
        <span @click="goUrl('/pages/home/hot/main')">更多</span>
      </div>
      <scroll-view scroll-x enable-flex class="move ali-c">
        <div class="list" v-for="(item, index) in hotList" :key="index" @click="goUrl('/pages/other/serdetail/main',item.Id)">
          <img mode='aspectFill' :src="item.PicNo" alt="">
          <p class="tita">{{item.Name}}</p>
          <p class="detail oneline">{{item.Synopsis}}</p>
          <div class="price">
            <span>￥</span><span>{{item.Price}}</span><span>￥{{item.VipPrice}}</span> 
          </div> 
        </div>
      </scroll-view>
    </div>
    <div class="school">
      <div class="one ali-c jus-b">
        <div class="left ali-c jus-b"  @click="goUrl('/pages/myson/ticket/main')">
          <div>
            <p>优惠券</p>
            <span>会员可享受特权哦</span>
          </div>
          <img src="/static/images/index_you.png" alt="">
        </div>
        <div class="right ali-c jus-b">
          <div>
            <p>充值卡</p>
            <span>会员可享受特权哦</span>
          </div>
          <img mode='aspectFill' src="/static/images/index_card.png" alt="">
        </div>
      </div>
      <img mode='aspectFill' class="two" src="/static/images/index_shop_bg.png" alt="" @click="goUrl('/pages/home/school/main')">
    </div>
    <div class="shop">
      <div class="list" v-for="(item, index) in shopList" :key="index">
        <p class="one">{{item.ShopNick}}</p>
        <div class="two ali-c jus-b">
          <div class="ali-c">
            <span>纹绣</span>
          </div>
          <p v-if="item.Distance>0">{{item.Distance}}km</p>
          <p v-if="item.Distance==0">小于1km</p>
        </div>
        <div class="thr ali-c jus-b">
          <div class="left">
            <div class="a ali-c">
              <span>奖</span>
              <p>邀请好友奖励10元</p>
            </div>
            <div class="b ali-c">
              <img src="/static/images/address_y.png" alt="">
              <p>{{item.Address}}</p>
            </div>
          </div>
          <p class="right flexc">去预约</p>
        </div> 
      </div>
    </div>
    
    <!--首页启动图-->
    <div class="stratPic">
        <img :src="startPic" alt="">
    </div>
    <!--弹层-->
    <div class="mask" v-if="false"></div>
    <div class="yuMask" v-if="false">
        <img src="/static/images/cancle.png" alt="" class="cancle_b">
        <div class="bg_fff yu_main">
            <div class="flex yu_item  flexAlignCenter justifyContentBetween">
                <div class="flex yu_left">
                    <img src="/static/images/ava.png" alt="" class="b_ava">
                    <div class="flex flexColumn justifyContentBetween">
                        <p class="flex">
                          <span>Alisa</span><span class="b_pill">店长</span>
                        </p>
                        <p>13553206236</p>
                        <p class="btn_pill">彩绘指甲</p>
                    </div>
                </div>
                <img src="/static/images/rili.png" alt="" class="b_rili">
            </div>
            <div class="flex yu_item  flexAlignCenter justifyContentBetween">
                <div class="flex yu_left">
                    <img src="/static/images/ava.png" alt="" class="b_ava">
                    <div class="flex flexColumn justifyContentBetween">
                        <p class="flex">
                          <span>Alisa</span><span class="b_pill">店长</span>
                        </p>
                        <p>13553206236</p>
                        <p class="btn_pill">彩绘指甲</p>
                    </div>
                </div>
                <img src="/static/images/rili.png" alt="" class="b_rili">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {
  data () {
    return {
      bannerList:[],
      startPic:'',
      hotList:[],
      shopList:[]
    }
  },
  onShow(){
    this.getHotList()
    this.getBannerList()
    this.getModalMask()
    this.getShopList()
  },
  methods:{
    getShopList(){
      let _this = this
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          wx.setStorageSync('location',{lat:res.latitude,lng:res.longitude});//定位缓存
          post('Shop/NearbyShop',{
            Lat:latitude,
            Lng:longitude
          }).then(res=>{
            if(res.code===0){
              
              _this.shopList = res.data
              _this.shopList.forEach(item => {
                item.Distance = item.Distance.toFixed(2)
              });
            }
          })
        }
      })

    },
    getBannerList(){
      post('Banner/BannerList',{}).then(res=>{
          if(res.code==0){
            this.bannerList = res.data
          }
      })
    },
    getHotList(){
      post('Goods/GoodsList',{
        Page:1,
        PageSize:5
      }).then(res=>{
          if(res.code==0){
            this.hotList = res.data
          }
      })
    },
    getModalMask(){
      post('Banner/HomePicList',{}).then(res=>{
        if(res.code==0){
          this.startPic = res.data[0].Logo
        }
      })
    },
    goUrl(url,id){
      console.log(url,'i')
      wx.navigateTo({
        url:url+'?id='+id
      })
    }
  }
  
}
</script>

<style scoped lang='scss'>
.shop{
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  margin-bottom: 30rpx;
  .list{
    border-bottom: 1rpx solid #ededed;
    padding-bottom: 30rpx;
    .one{
      font-size: 30rpx;
      line-height: 80rpx;
      font-weight: 900
    }
    .two{
      margin-bottom: 20rpx;      
      span{
        color: #999999;
        font-size: 22rpx;
        padding: 5rpx 15rpx;
        border-radius: 5rpx;
        border: 1rpx solid #ededed;
        margin-right: 10rpx
      }
    }
    .thr{
      .right{
        width: 120rpx;
        height: 54rpx;
        background-color: #cc9f68;
        border-radius: 6rpx;
        color: #fff;
      }
      .a{
        span{
          padding: 2rpx 4rpx;
          background-color: #cc9f68;
          border-radius: 5rpx;
          color: #fff;
          font-size: 20rpx;
          margin-right: 10rpx;
        }
        p{
          color: #999;
          font-size: 22rpx;
        }
      }
      .b{
        margin-top: 20rpx;
        img{
          width: 20rpx;
          height: 24rpx;
          margin-right: 15rpx;
        }
        p{
          font-size: 24rpx
        }
      }
    }
  }
}
.school{
  background-color: #fff;
  margin-top: 20rpx;
  padding: 30rpx;
  .two{
    width: 690rpx;
    height: 260rpx;
    border-radius: 15rpx;
    margin-top: 25rpx
  }
  .one{
    .left,.right{
      width: 335rpx;
      height: 200rpx;
      background-color: #f5f5f5;
      border-radius: 10rpx;
      padding-left: 20rpx;
      box-sizing: border-box;
      p{
        font-size: 30rpx;
        margin-bottom: 25rpx
      }
      span{
        font-size: 20rpx;
        color: #999
      }
    }
    .left img{
      width: 130rpx;
      height: 147rpx;
    }
    .right img{
      width: 150rpx;
	    height: 135rpx;
    }
  }
}
.hot{
  background-color: #fff;
  padding: 0 30rpx 10rpx;
  .tit{
    margin-bottom: 30rpx;
    p{
      font-size: 32rpx;
      font-weight: 900
    }
  }
  .move{
    height: 374rpx;
    box-shadow: 0 0 5rpx 5rpx rgba(255, 51, 51, 0.1) inset;
    border-radius: 20rpx;
    overflow: hidden;
    .list{
      display: inline-block;
      margin-right: 20rpx;
      img{
        width: 280rpx;
        height: 200rpx;
        border-radius: 8rpx;
      }
      .tita{
        font-size: 30rpx;
        // margin-top: 20rpx;
      }
      .detail{
        font-size: 26rpx;
        color: #999;
        margin: 10rpx 0;
      }
      .price span:nth-child(1){
        color: #ff3333;
        font-size: 24rpx;
        font-weight: 900
      }
      .price span:nth-child(2){
        color: #ff3333;
        font-size: 36rpx;
        font-weight: 900
      }
      .price span:nth-child(3){
        color: #999;
        font-size: 22rpx;
        margin-left: 10rpx;
        text-decoration:line-through
      }
    }
  }
}
.swiper-box{
  height: 528rpx;
  img{
    width: 100%;
    height: 100%;
  }
}
.search-box{
  width: 100vw;
  height: 108rpx;
  background-color: #fff;
  .search{
    width: 670rpx;
    height: 100%;
    background-color: #fff;
    padding: 0 20rpx;
    border-radius: 10rpx;
    box-shadow: 0rpx 3rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
    position: relative;
    top: -40rpx;
    .left{
      width: 560rpx;
      height: 64rpx;
      border-radius: 32rpx;
      border: solid 1rpx #cccccc;
      img{
        width: 28rpx;
        height: 28rpx;
        margin: 0 15rpx 0 30rpx;
      }
    }
    .right{
      text-align: center;
      img{
        width: 44rpx;
        height: 39rpx;
        margin: auto
      }
      p{
        font-size: 18rpx
      }
    }
  }
}
.cancle_b{
  width:60rpx;height:60rpx;
}
.b_ava{
  width:140rpx;height:140rpx;margin-right:15rpx;
  border-radius:50%;
}
.b_rili{
  width:80rpx;height:60rpx;
}
.btn_pill{
  border:1rpx solid #999999;border-radius:8rpx;color:#999999;
}
.yuMask{
  position: fixed;z-index:100;
  width:690rpx;height:650rpx;
  top:200rpx;
  left:30rpx;right:30rpx;
  text-align: center;
  .yu_main{
    margin-top:100rpx;
    padding:30rpx;border-radius:15rpx;
    .yu_item{
      height:215rpx;border-bottom: 1rpx solid #f5f5f5;
      &:last-child{
        border:0
      }
    }
  }
}
.stratPic{
  width:750rpx;
  position: fixed;
  top:0;left:0;z-index:100;
  img{
    width:100%;height:100%;
  }
}
</style>
