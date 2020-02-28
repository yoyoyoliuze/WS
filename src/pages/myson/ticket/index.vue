<template>
  <div>
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item.Name}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <scroll-view scroll-y @scrolltolower="loadMore" class="certlistBox">
        <div v-if="list.length>0">
          <div class="list jus-b" v-for="(item,key) in list" :key="key">
            <div class="left">
              <p>{{item.Title}}</p>
              <span>有效期至{{item.endTime}}</span>
              <div class="flexc cc9f" :class="Status==1?'use':''">{{item.DiscountType==1?'减满券':(item.DiscountType==2?'折扣券':'无')}}</div>
            </div>
            <div class="right flexc">
              <div>
                <p>{{item.Denomination}}<span>{{item.Denomination>1?'元':'折'}}</span></p>
                <span v-if="item.MeetConditions>0">满{{item.MeetConditions}}可使用</span>
                <span v-else>全场通用</span>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:200rpx 0;text-align:center;" v-else>暂无数据</div>
      </scroll-view>
  </div>
</template>

<script>
import {post,editTime} from '@/utils'
export default {

  data () {
    return {
      tabList:[{Id:1,Name:'未使用'},{Id:2,Name:'已使用'},{Id:3,Name:'已失效'}],
      tabIndex:0,
      userId:"",
      token:"",
      Status:1,//1-未使用 2-已使用  3-已过期
      list:[]
      
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    this.list = []
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getDate()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    cliTab(index){
      this.tabIndex = index
      this.Status = this.tabList[index].Id
      this.getDate()
    },
    getDate(){
      post('User/CouponList',{
        UserId:this.userId,
        Token:this.token,
        Page:1,
        Status:this.Status
      }).then(res=>{
        if(res.code==0){
          this.list = res.data;
          res.data.map(item=>{
            item.endTime = editTime(item.EndTime,'time')
          })
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20rpx;
  left: 450rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20rpx;
  left: 450rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690rpx;
  height: 180rpx;
  border-radius: 15rpx;
  margin: 30rpx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .left{
    width: 460rpx;
    padding: 60rpx 0 0 35rpx;
    position: relative;
    span{
      font-size: 20rpx;
      color: #999;
    }
    .cc9f{
      width: 128rpx;
	    height: 40rpx;
	    background-color: #d4d5d6;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24rpx;
      color: #fff
    }
    .use{
      background-color: #cc9f68;
    }
  }
  .right{
    width: 230rpx;
    background-color: #cc9f68;
    text-align: center;
    p{
      color: #fff;
      font-size: 56rpx;
      font-weight: 900;
      span{
        font-size: 20rpx
      }
    }
    span{
      font-size: 20rpx;
      color: #fff;
    }
  }
}
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  position: relative;
  .active{
    color: #cc9f68
  }
  span{
    position: absolute;
    bottom: 0;
    transition: all .2s;
    height: 5rpx;
    width: 50rpx;
    background-color: #cc9f68
  }
}
.certlistBox {
  height: calc(100vh - 100rpx);
  overflow: hidden;
  overflow-y: auto;
}

</style>
