<template>
  <div>
    <div v-if="list.length>0">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="top ali-c" @click="goArt(item)">
            <img class="left" :src="item.ArtificerPic" alt="">
            <div class="right">
              <div class="ali-c one">
                <p>{{item.Name}}</p>
                <span class="flexc">{{item.LvlName}}</span>
              </div>
              <div class="ali-c two">
                <img src="/static/images/my_icon_7.png" alt="">
                <span>好评率</span>
                <span>{{item.FeedbackRate}}%</span>
              </div>
            </div>
          </div>
          <div class="address ali-c jus-b" @click="goArt(item)">
            <div class="ali-c">
              <p @click.stop="goShopDetail(item)">{{item.ShopData.ShopNick}}</p>
              <img class="left" src="/static/images/more.png" alt="">
            </div>
            <img class="right" src="/static/images/address_r.png" alt="" @click.stop="goLocation(item.ShopData)">
          </div>
          <div class="btn-box jus-e ali-c">
            <p class="flexc active mr20" @click="cancel(item.ArtId,index)">取消关注</p>
            <p class="flexc" :class="item.IsRest==1?'active':'normal'">{{item.IsRest==1?'休息中':'预约'}}</p>
          </div>
        </div>
    </div>
    <div v-else style="padding:300rpx 0;text-align:center">暂无数据</div>
  </div>
</template>

<script>
import {post,openLocation} from '@/utils'
export default {
  data () {
    return {
      list:[],
      page:1,
      pageSize:12,
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.page=1;
    this.list=[];
    this.getData()
  },
  methods: {
    getData(){
      post('User/MemberCollections',{
        UserId:this.userId,
        Token:this.token,
        Page:this.page,
        PageSize:this.pageSize,
        Type:2,//0产品 1商家 2技师
      }).then(res=>{
        if(res.code==0){
          this.list.push(...res.data);
        }
      })
    },
    goArt(item){
      console.log(item)
      wx.navigateTo({
        url:'/pages/myson/jishiDetail/main?artId='+item.ArtId
      })
    },
    goShopDetail(item){
        wx.navigateTo({
          url:'/pages/other/chose/main?id='+item.ShopId
        })
    },
    goLocation(shop){
        openLocation({
          lat:shop.Lat,
          lng:shop.Lng
        })
    },
    // 取消关注
    cancel(artId,index){
        post('User/ReCollections',{
          UserId:this.userId,
          Token:this.token,
          Type:2,
          Id:artId
        }).then(res=>{
          wx.showToast({
            title:res.msg
          })
          this.list.splice(index,1);
        })
    }
  },
  onReachBottom(){
    this.page+=1;
    this.getData();
  }
}
</script>

<style scoped lang='scss'>
.list{
  background-color: #fff;
  width: 690rpx;
  border-radius: 15rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  margin: 20rpx auto 0;
  .btn-box{
    height: 104rpx;
    p{
      width: 200rpx;
      height: 56rpx;
      background-color: #cc9f68;
      border-radius: 6rpx;
      color: #fff;
      font-size: 24rpx
    }
    .active{
      background-color: #c4c4c4!important
    }
    .normal{
      background-color: #cc9f68!important
    }
  }
  .address{
    height: 84rpx;
    border-bottom: 1rpx solid #ededed;
    p{
      font-size: 26rpx;
      font-weight: 900;
      margin-right: 25rpx
    }
    .left{
      width: 10rpx;
	    height: 18rpx;
    }
    .right{
      width: 20rpx;
	    height: 24rpx;
    }
  }
  .top{
    height: 180rpx;
    border-bottom: 1rpx solid #ededed;
    .cancels{
      position:absolute;
      right:30rpx;
      top:15rpx;
      font-size:26rpx;
      color:#cc9f68;
    }
    .left{
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .right{
      img{
        width: 28rpx;
	      height: 24rpx;
      }
      .one{
        p{
          font-size: 30rpx;
          font-weight: 900
        }
        span{
          // width: 60rpx;
          padding:0 10rpx;
          height: 32rpx;
          background-color: #cc9f68;
          border-radius: 4rpx;
          color: #fff;
          font-size: 22rpx;
          margin-left: 20rpx
        }
      }
      .two{
        margin-top: 20rpx;
        span{
          font-size: 22rpx;
          margin-left: 15rpx
        }
      }
    }
  }
}
.mr20{
  margin-right:20rpx;
}
</style>
