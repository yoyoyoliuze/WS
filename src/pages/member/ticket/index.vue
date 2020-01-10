<template>
  <div>
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':Status==item.Id}" v-for="(item, index) in tabList" :key="index" @click="cliTab(item,index)">{{item.Name}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="pp3 bg_fff mt2 flex justifyContentBetween flexAlignCenter" @click="switchPath('/pages/member/cika/main')">
          <div class="flex flexAlignCenter">
              <img src="/static/images/my_icon_9.png" alt="" class="cc_car">
              <span class="mr2">次卡中心</span>
          </div>
          <img src="/static/images/icons/more.png" alt="" class="icon_right">
      </div>
      <scroll-view scroll-y @scrolltolower="loadMore" class="certlistBox">
        <div class="list pw3" v-if="list.length>0">
            <div class="cc_item" v-for="(item,index) in list" :key="index">
                <img src="/static/images/icons/c1.png" alt="" class="cc_img" v-if="Status==1">
                <img src="/static/images/icons/c2.png" alt="" class="cc_img" v-if="Status==3">
                <div class="cc_main flex justifyContentBetween flexAlignCenter">
                    <p class="font30">会员次卡</p>
                    <div class="cc_right">
                        <p>服务项目-{{item.Title}}</p>
                        <p class="font22 mt1">剩余次数{{item.CardNum}}/{{item.UseNum}}</p>
                        <p class="flex justifyContentBetween font22 mt1">
                          <span>次卡权益</span>
                          <span class="cc_use" :class="item.Enable==2?'active':''">立即使用</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div style="padding:200rpx 0;text-align:center" v-else>暂无数据</div>
      </scroll-view>
  </div>
</template>

<script>
import {post} from '@/utils/index';
export default {

  data () {
    return {
      tabList:[{Id:1,Name:"可使用"},{Id:3,Name:"已失效"}],
      tabIndex:0,
      userId:"",
      token:"", 
      Status:1,//0-全部  1-可用 2-已使用 3-已核销
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
    this.getData()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    switchPath(path){
        wx.navigateTo({
          url:path
        })
    },
    cliTab(item,index){
      this.Status = item.Id
      this.tabIndex = index
      this.getData()
    },
    getData(){
      post('User/SubCardList',{
        UserId:this.userId,
        Token:this.token,
        Status:this.Status,
        Page:1
      }).then(res=>{
          if(res.code==0){
            this.list = res.data
          }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
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
.cc_item{
  margin-top:20rpx;
  height:200rpx;
  position: relative;
  .cc_img{
    width:690rpx;height:200rpx;
  }
  .cc_main{
    position: absolute;color:#ffffff;
    top:30rpx;left:30rpx;right:30rpx
  }
  .cc_right{
    width:65%;
  }
  .cc_use{
    background: #cc9f68;color:#ffffff;
    padding:5rpx 20rpx;border-radius:5rpx;
    &.active{
      background: #cccccc;
    }
  }
}
.cc_car{
  width:48rpx;height:40rpx;
}
.icon_right{
  width:13rpx;height:24rpx;
}
.certlistBox {
  height: calc(100vh - 200rpx);
  overflow: hidden;
  overflow-y: auto;
}


</style>
