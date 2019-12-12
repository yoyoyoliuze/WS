<template>
  <div>
      <div class="top-box flexc">
        <div class="top flex" :class="serverIndex==0?'leftShadow':'rightShadow'">
          <div class="flex1 flexc" :class="{'active':serverIndex==index}" v-for="(item, index) in serverList" :key="index" @click="cliServer(index)">{{item}}</div>
          <span :style="serverIndex==1?'left:220rpx':''"></span>
        </div>
      </div>
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="list" :class="isJump?'nav':''" @click="goUrl('/pages/orderson/orderDetail/main','')">
        <div class="tit ali-c">待服务</div>
        <div class="main">
          <div class="time-box ali-c">
            <div class="flex1 flexc">
              <div>
                <p>js001</p>
                <span>预约序号</span>
              </div>
            </div>
            <div style="width:50%" class="flexc">
              <div>
                <p>2019-12-20</p>
                <span>预约日期</span>
              </div>
            </div>
            <div class="flex1 flexc">
              <div>
                <p>16:30</p>
                <span>开始时间</span>
              </div>
            </div>
          </div>
          <div class="address ali-c jus-b">
            <div class="ali-c left">
              <p>万色印象万众城店</p>
              <img src="/static/images/more.png" alt="">
            </div>
            <img class="right" src="/static/images/address_r.png" alt="">
          </div>
          <div class="heji">
            <div class="ali-c jus-b"><p>技师</p><span>Alisa</span></div>
            <div class="ali-c jus-b"><p>电话</p><span>13257927518</span></div>
            <div class="ali-c jus-b"><p>服务项目</p><span>每家</span></div>
            <div class="ali-c jus-b"><p>合计</p><span>￥48</span></div>
          </div>
          <div class="btn-box jus-e ali-c">
            <p class="flexc">取消预约</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {switchPath,isJump} from '@/utils'
export default {

  data () {
    return {
      serverList:['预约技师','预约服务'],
      serverIndex:0,
      tabList:['待服务','已服务','已取消'],
      tabIndex:0,
      isJump:false
      
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    
  },
  methods: {
    goUrl(url,param){
      this.isJump = true
      setTimeout(() => {
        this.isJump = false
        wx.navigateTo({
          url:url+'?id='+param
        })
      }, 100);
    },
    cliServer(index){
      this.serverIndex = index
    },
    cliTab(index){
      this.tabIndex = index
    },
  },
}
</script>

<style scoped lang='scss'>
.list{
  background-color: #fff;
  width: 690rpx;
  margin: 20rpx auto 0;
  border-radius: 15rpx;
  overflow: hidden;
  box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0,0,0,0.1);
  .tit{
    background-color: #cc9f68;
    height: 68rpx;
    padding-left: 30rpx;
    color: #fff
  }
  .main{
    padding: 0 30rpx;
    .time-box{
      height: 160rpx;
      text-align: center;
      border-bottom: 1rpx solid #ededed;
      p{
        font-size: 40rpx;
        margin-bottom: 10rpx;
      }
      span{
        font-size: 24rpx;
        color: #666
      }
    }
    .address{
      height: 84rpx;
      font-size: 26rpx;
      border-bottom: 1rpx solid #ededed;
      font-weight: 900;
      .left{
        img{
          width: 10rpx;
	        height: 18rpx;
          margin-left: 20rpx
        }
      }
      .right{
        width: 20rpx;
	      height: 24rpx;
      }
    }
    .heji{
      border-bottom: 1rpx solid #ededed;
      padding: 10rpx 0;
      .ali-c{
        height: 60rpx;
        p{
          font-size: 24rpx;
          color: #666666;
        }
        span{
          font-size: 24rpx;
          font-weight: 900;
        }
      }
      .ali-c:nth-child(1) span{
        color: #ff3333
      }
    }
    .btn-box{
      height: 120rpx;
      p{
        width: 200rpx;
        height: 60rpx;
        border-radius: 6rpx;
        border: solid 1rpx #cc9f68;
        color: #cc9f68;
      }
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
.top-box{
  background-color: #fff;
  .leftShadow{
    box-shadow: 5rpx 3rpx 5rpx 5rpx rgba(0,0,0,0.1)
  }
  .rightShadow{
    box-shadow: -5rpx 3rpx 5rpx 5rpx rgba(0,0,0,0.1)
  }
  .top{
    width: 440rpx;
    height: 64rpx;
    border-radius: 32rpx;
    border: solid 1rpx #cc9f68;
    margin: auto;
    font-size: 32rpx;
    position: relative;
    overflow: hidden;
    .active{
      color: #fff
    }
    div{
      z-index: 5
    }
    span{
      background-color: #cc9f68;
      width: 50%;
      height: 100%;
      position: absolute;
      left: 0;
      z-index: 1;
      transition: all .2s;
      border-radius: 32rpx;
    }
  }
}

</style>
