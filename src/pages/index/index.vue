<template>
  <div>
    <swiper class="swiper-box" autoplay interval='3000' circular indicator-dots>
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <img  :src="item.Pic" alt="">
      </swiper-item>
    </swiper>
    <div class="search-box flexc">
      <div class="search ali-c jus-b">
        <div class="left ali-c">
          <img src="/static/images/search.png" alt="">
          <input type="text" placeholder="输入要搜索的服务" v-model="searchText" 
            placeholder-style='color:#999' confirm-type="search" @confirm="onSearch">
        </div>
        <!-- <div class="right">
          <img src="/static/images/map.png" alt="">
          <p>地图找店</p>
        </div> -->
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
        <div class="left ali-c jus-b"  @click="goUrl('/pages/home/getticket/main')">
          <div>
            <p>优惠券</p>
            <span>会员可享受特权哦</span>
          </div>
          <img src="/static/images/index_you.png" alt="">
        </div>
        <div class="right ali-c jus-b" @click="goUrl('/pages/home/card/main')">
          <div>
            <p>充值卡</p>
            <span>会员可享受特权哦</span>
          </div>
          <img mode='aspectFill' src="/static/images/index_card.png" alt="">
        </div>
      </div>
      <img mode='aspectFill' class="two" src="/static/images/index_shop_bg.jpg" alt="" @click="goUrl('/pages/home/school/main')">
    </div>
    <div class="shop">
      <div class="list" v-for="(item, index) in shopList" :key="index"  @click="goUrl('/pages/other/chose/main',item.ShopId)">
        <p class="one">{{item.ShopNick}}</p>
        <div class="two ali-c jus-b">
          <div class="ali-c">
            <span v-for="(ite, ind) in item.MapReservation" :key="ind">{{ite}}</span>
          </div>
          <p v-if="item.Distance>1" class="Distance">{{item.Distance}}km</p>
          <p v-if="item.Distance==0" class="Distance">小于1km</p>
          <p v-if="item.Distance!=0&&item.Distance<1" class="Distance">{{item.Distance*1000}}m</p>
        </div>
        <div class="thr ali-c jus-b">
          <div class="left">
            <div class="a ali-c">
              <span>营业时间</span>
              <p>{{item.BusinessHours}}</p>
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
    <!--上次预约-->
    <div class="mask" v-if="firstYuyueStatus&&firstYuyueList.length>0"></div>
    <div class="yuMask" v-if="firstYuyueStatus&&firstYuyueList.length>0">
        <img src="/static/images/cancle.png" alt="" class="cancle_b" @click="firstYuyueList=[]">
        <div class="bg_fff yu_main">
            <div class="flex yu_item  flexAlignCenter justifyContentBetween"
              v-for="(item,index) in firstYuyueList" :key="index">
                <!-- 技师 -->
                <div class="flex yu_left" v-if="item.ServiceMode==1">
                    <img :src="item.ArtData.ArtPic" alt="" mode="aspectFill" class="b_ava">
                    <div class="flex flexColumn justifyContentBetween">
                        <p class="flex name-a">
                          <span>{{item.ArtData.ArtName}}</span><span class="b_pill">{{item.ArtData.LvlName}}</span>
                        </p>
                        <p class="phone">{{item.ArtData.ArtTel}}</p>
                        <p class="btn_pill"><span v-for="(tab,tabIndex) in item.OrderDetails" :key="tabIndex">{{tab.ProductName}}</span></p>
                    </div>
                </div>
                <!-- 技师 -->
                <div class="flex yu_left" v-else >
                    <img :src="item.ShopData.Logo" alt="" class="b_ava" mode="aspectFill">
                    <div class="flex flexColumn justifyContentBetween">
                        <p class="flex">
                          <span>{{item.ShopData.ShopName}}</span>
                        </p>
                        <p class="phone">{{item.ShopData.Phone}}</p>
                        <p class="btn_pill"><span v-for="(tab,tabIndex) in item.OrderDetails" :key="tabIndex">{{tab.ProductName}}</span></p>
                    </div>
                </div>
                <img src="/static/images/rili.png" alt="" class="b_rili" @click="onReservation(item)">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {post,Reservation} from '@/utils'
export default {
  data () {
    return {
      bannerList:[],
      startPic:'',
      hotList:[],
      shopList:[],
      searchText:'',//搜索
      firstYuyueStatus:false,//上一次预约的弹窗状态
      firstYuyueList:[],//上一次预约的列表
    }
  },
  onShow(){
    // wx.setStorageSync('statu',1)//清楚个人中心页面缓存
    this.getHotList()
    this.getBannerList()
    this.getModalMask()
    this.getShopList();
    this.getFirstYuyue();
  },
  methods:{
    getShopList(){
      let _this = this
      wx.getLocation({
        type: 'gcj02',
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
                item.MapReservation = item.MapReservation.split(',');
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
        PageSize:5,
        IsHot:1,
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
    // 获取上一次预约的列表
    getFirstYuyue(){
      const userId = wx.getStorageSync("userId")
      const token = wx.getStorageSync("token")
      if((!userId||!token)||this.firstYuyueStatus) return;
      post('Order/OrderList',{
        UserId: userId,
        Token: token,
        Page:1,
        PageSize:3,
        Type:0,
        Status:0
      }).then(res=>{
        if(res.code==0){
          res.data.map(item=>{
            let serInfo = {serve:[],total:0}
            this.$set(item,"serInfo",serInfo)
            item.OrderDetails.map(item2=>{
                serInfo.serve.push(item2.ProductName)
                serInfo.total+=item2.ActualPay
            })
            this.$set(item.serInfo,"serve",item.serInfo.serve.join(" | "))
          })
          this.firstYuyueList = res.data;
          this.firstYuyueStatus = true;
          console.log(this.firstYuyueList,"firstYuyueList+++++++++")
        }
      })
    },  
    goUrl(url,id){
      console.log(url,'i')
      wx.navigateTo({
        url:url+'?id='+id
      })
    },
    // 搜索门店
    onSearch(){
      if(!this.searchText) return;
      wx.navigateTo({
        url:'/pages/home/hot/main?keyword='+this.searchText
      })
    },
    // 弹窗快速预约
    onReservation(items){
      Reservation(items)
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
      margin:0 15rpx;
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
  height: 500rpx;
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
      // width: 560rpx;
      width: 650rpx;
      height: 64rpx;
      border-radius: 32rpx;
      border: solid 1rpx #cccccc;
      img{
        width: 28rpx;
        height: 28rpx;
        margin: 0 15rpx 0 30rpx;
      }
      input{
        width:550rpx;
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
.yu_left{text-align:left;
.name-a{
  align-items:center;
}
  .b_pill{
    color:#fff;
    background:#cc9f68;
    border-radius:5rpx;
    padding:0 10rpx;
    line-height:30rpx;
    height:30rpx;
    font-size:20rpx;
    margin-left:20rpx;
  }
  .phone{
    color:#999;
  }
}
.b_ava{
  width:140rpx;height:140rpx;margin-right:15rpx;
  border-radius:50%;
}
.b_rili{
  width:80rpx;height:60rpx;
}
// 上次预约
.yuMask{
  position: fixed;z-index:100;
  width:690rpx;
  top:100rpx;
  left:30rpx;right:30rpx;
  text-align: center;
  .yu_main{
    margin-top:100rpx;
    border-radius:15rpx;
      padding:0 30rpx;
    .yu_item{
      padding:30rpx 0;
      border-bottom: 1rpx solid #f5f5f5;
      &:last-child{
        border:0
      }
      .yu_left{
        align-items:center;
      }
      .btn_pill{
        display:flex;
        align-items:center;
        flex-flow:wrap row;
        width:350rpx;
        span{
          border:1rpx solid #999999;border-radius:8rpx;color:#999999;
          padding:0 10rpx;
          margin-right:10rpx;
          flex:0 0 auto;
          margin-top:10rpx;
        }
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
.Distance{
  font-size:20rpx;
  color:#999;
}
</style>
