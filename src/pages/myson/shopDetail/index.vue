<template>
  <div style="padding-bottom:100rpx" :class="{'p-top':isP}">
      <div class="top">
        <img class="bg" src="/static/images/ava.png" alt="">
        <div class="main">
          <p class="name">{{shopDetail.ShopNick}}</p>
          <div class="flex-warp ali-c tag">
            <span>纹绣</span>
          </div>
          <div class="ali-c jus-b map">
            <div class="left"> 
              <div class="ali-c one">
                <img class="a" src="/static/images/detail/time.png" alt="">
                <span>11:00~23:00</span>
                <img class="b" src="/static/images/detail/phone1.png" alt="">
                <span>0755-5462303</span>
              </div>
              <div class="ali-c two">
                <img src="/static/images/detail/address1.png" alt="">
                <span>深圳市龙华区民治大道辉华大厦正门口</span>
              </div>
            </div>
            <div class="right">
              <img src="/static/images/detail/map.png" alt="">
              <p>地图找店</p>
            </div>
          </div>
          <p class="ali-c jian"><span class="flexc">减</span>新用户首单满30减3</p>
          <p class="ali-c jian"><span class="flexc">奖</span>邀请好友奖励10元</p>
        </div>
      </div>

      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>

      <!-- <div class="server-list-box">
        <div class="tit jus-b ali-c">
          <span>美甲</span>
          <img src="/static/images/more.png" alt="">
        </div>
        <div class="list-box flex-wrap jus-b">
          <div class="list" v-for="(item, index) in 3" :key="index">
            <div class="box">
              <p>彩绘指甲</p>
              <p>(服务时长：半小时)</p>
              <p>298元</p>
            </div>
            <p class="flexc">查看详情</p>
          </div>
        </div>
      </div> -->

      <div class="jishi-box">
        <div class="jishi ali-c jus-b">
          <div class="ali-c left">
            <img class="ava" src="/static/images/ava.png" alt="">
            <div>
              <div class="ali-c one">
                <p>巴啦啦小魔仙</p>
                <span class="flexc">店长</span>
              </div>
              <p class="two">13553206236</p>
              <div class="ali-c thr">
                <img src="/static/images/my_icon_7.png" alt="">
                <span>好评率</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div class="right flexc">预约</div>
        </div>
      </div>

      <div class="server-box">
        <p class="tit">服务评价</p>
        <div class="server flex">
          <div class="flex1 flexc">
            <div>
              <p>98%</p>
              <span>好评率</span>
            </div>
          </div>
          <div class="flex1 flexc">
            <div>
              <p>1532</p>
              <span>评论</span>
            </div>
          </div>
        </div>
        <div class="comment jus-b">
          <img class="left" src="/static/images/ava.png" alt="">
          <div class="right">
            <div class="one jus-b">
              <div class="name ali-c">
                <p>巴啦啦小魔仙</p>
                <span>(13257927518)</span>
              </div>
              <div class="ava ali-c jus-b">
                <img src="/static/images/icons/s1.png" alt="">
                <span>满意</span>
              </div>
            </div>
            <div class="text">
              美甲做的很好看，而且很实话，物美价廉的感觉，很喜欢。
            </div>
            <div class="ali-c jus-b time">
              <p>技师：Alisa</p>
              <p>2019-11-21</p>
            </div>
          </div>
        </div>
        <div class="btn-box flexc">
          <p class="flexc">查看全部评价</p>
        </div>
      </div>

      <div class="info">
        <p class="tit">门店信息</p>
        <p class="tit2">历史客流分布</p>
        <div class="ali-c time">
          <span></span>
          <p>周末</p>
          <span></span>
          <p>工作日</p>
        </div>
        <img class="biao" src="/static/images/detail/biao.png" alt="">
        <p class="tip">小优提醒您：参考图示，了解万色印象门店排队高峰时段，可提前规划您的服务时间哦。</p>
        <p class="tit3 ali-c">服务标准</p>
        <div class="biaozhun flex-wrap">
          <div class="ali-c">
            <img src="/static/images/detail/server.png" alt="">
            <p>专注服务进口器材</p>
          </div>
          <div class="ali-c">
            <img src="/static/images/detail/untuixiao.png" alt="">
            <p>无推销办会员</p>
          </div>
          <div class="ali-c">
            <img src="/static/images/detail/xiaodu.png" alt="">
            <p>工具严格消毒</p>
          </div>
          <div class="ali-c">
            <img src="/static/images/detail/two.png" alt="">
            <p>三年以上经验技师</p>
          </div>
        </div>
      </div>

      <div class="kefu flexc">联系客服（10:00~18:00）</div>

  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      tabList:['技师','服务评价','门店信息'],
      tabIndex:0,
      isP:false,
      shopDetail:{}
    }
  },
  onPageScroll(e) {
    
  },
  onShow(){
    console.log(this.$mp.query)
    this.getDetail()

  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  methods: {
    scroll(el){
      wx.pageScrollTo({
        selector:el,
        duration: 300
      })
    },
    getDetail(){
      post('Shop/ReadShop',{
        Lat:wx.getStorageSync('location').lat,
        Lng:wx.getStorageSync('location').lng,
        ShopId:this.$mp.query.id
      }).then(res=>{
        if(res.code===0){
          this.shopDetail = res.data
        }
      })
    },
    cliTab(index){
      this.tabIndex = index
      if(index===0){
        this.scroll('.jishi-box')
      }else if(index===1){
        this.scroll('.server-box')
      }else if(index===2){
        this.scroll('.info')
      }
    },
  },
}
</script>

<style scoped lang='scss'>
.p-top{
  padding-top:92rpx 
}
.server-list-box{
  .list-box{
    background-color: #fff;
    padding: 0 70rpx;
    .list{
      width: 274rpx;
      text-align: center;
      margin: 10rpx 0;
      .flexc{
        width: 274rpx;
        height: 60rpx;
        background-color: #cc9f68;
        border-radius: 10rpx;
        color: #fff;
      }
      div p:nth-child(2){
        font-size: 24rpx;
        margin: 10rpx 0;
      }
      div p:nth-child(3){
        color: #ff3333;
      }
      .box{
        width: 274rpx;
        height: 151rpx;
        border-radius: 10rpx;
        border: solid 1rpx #cc9f68;
        margin-bottom: 10rpx;
      }
    }
  }
  .tit{
    height: 88rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #ededed;
    padding: 0 30rpx;
    img{
      width: 13rpx;
	    height: 26rpx;
    }
  }
}
.kefu{
    background-color: #fff;
    margin-top: 20rpx;
    height: 98rpx;
    width: 100vw;
    position: fixed;
    bottom: 0;
    box-shadow: 0rpx 8rpx 8rpx 8rpx rgba(0, 0, 0, 0.1)
  }
.info{
  background-color: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
  
  .biaozhun{
    div{
      width: 50%;
      height: 80rpx;
      img{
        width: 68rpx;
	      height: 68rpx;
        margin-right: 24rpx
      }
    }
  }
  .tit3{
    height: 100rpx;
  }
  .tip{
    margin: 20rpx 0;
    font-size: 24rpx;
    color: #999 
  }
  .biao{
    width: 690rpx;
	  height: 297rpx;
  }
  .tit{
    font-size: 32rpx;
    margin-bottom: 30rpx;
  }
  .tit2{
    font-size: 28rpx;
    margin-bottom: 30rpx;
  }
  .time span:nth-child(1){
    width: 8rpx;
    height: 8rpx;
    background-color: #d33750;
    border-radius: 50%
  }
  .time span:nth-child(3){
    width: 8rpx;
    height: 8rpx;
    background-color: #212127;
    border-radius: 50%
  }
  .time{
    p{
      font-size: 22rpx;
      color: #999999;
      margin: 0 45rpx 0 5rpx
    }
  }
}
.server-box{
  background-color: #fff;
  margin-top: 20rpx;
  padding: 0 30rpx;
  .btn-box{
    height: 150rpx;
    p{
      width: 240rpx;
      height: 68rpx;
      border-radius: 6rpx;
      border: solid 1rpx #333333;
      font-size: 30rpx;
    }
  }
  .comment{
    padding: 40rpx 0 0;
    .left{
      width: 100rpx;
	    height: 100rpx;
      border-radius: 50%;
      margin-right: 30rpx;
    }
    .right{
      width: 560rpx;
      .time{
        font-size: 26rpx;
        color: #999;
      }
      .text{
        margin: 15rpx 0;
      }
      .one{
        .name{
          p{
            font-size: 30rpx;
	          font-weight: bold;
            margin-right: 10rpx
          }
          span{
            font-size: 22rpx;
            color: #999;
          }
        }
        .ava{
          width: 92rpx;
          height: 36rpx;
          background-color: #ececec;
          border-radius: 18rpx;
          padding-right: 10rpx;
          img{
            width: 36rpx;
            height: 36rpx;
          }
          span{
            font-size: 22rpx;
            color: #999;
          }
        }
      }
    }
  }
  .tit{
    font-size: 32rpx;
	  font-weight: 900;
    padding-top: 30rpx;
  }
  .server .flexc:nth-child(1) div{
    text-align: center;
    width: 100%;
    border-right: 1rpx solid #ededed;
  }
  .server{
    height: 200rpx;
    border-bottom: 1rpx solid #ededed;
    text-align: center;
    p{
      font-size: 40rpx;
    }
    span{
      font-size: 22rpx;
      color: #999;
    }
  }
}
.jishi-box{
  background-color: #fff;
  padding: 20rpx 30rpx;
  .jishi{
    width: 690rpx;
    height: 200rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    .right{
      width: 120rpx;
      height: 54rpx;
      background-color: #cc9f68;
      border-radius: 6rpx;
      color: #fff;
    }
    .left{
      .ava{
        width: 120rpx;
	      height: 120rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      .one{
        p{
          font-size: 30rpx;
	        font-weight: bold;
        }
        span{
          width: 60rpx;
          height: 32rpx;
          background-color: #cc9f68;
          border-radius: 4rpx;
          font-size: 22rpx;
          color: #fff;
          margin-left: 20rpx
        }
      }
      .two{
        font-size: 22rpx;
        margin:5rpx 0;
      }
      .thr{
        img{
          width: 28rpx;
	        height: 24rpx;
        }
        span{
          font-size: 22rpx;
          margin-left: 15rpx;
        }
      }
    }
  }
}
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  // position: sticky;
  top: 0;
  border-bottom: 1rpx solid #ededed;
  div{
    color: #999;
  }
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
.top{
  height: 440rpx;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  .jian{
    color: #fff;
    font-size: 22rpx;
    margin-bottom: 20rpx;
    span{
      width: 30rpx;
      height: 30rpx;
      background-color: #cc9f68; 
      border-radius: 2rpx;
      margin-right: 15rpx
    }
  }
  .map{
    margin-bottom: 60rpx;
    .left{
      .one{
        margin-bottom: 20rpx;
        img{
          width: 24rpx;
	        height: 24rpx;
        }
        span{
          margin: 0 50rpx 0 10rpx;
          color: #fff;
          font-size: 22rpx;
        }
      }
      .two{
        img{
          width: 20rpx;
	        height: 24rpx;
          margin-right: 10rpx
        }
        span{
          color: #fff;
          font-size: 22rpx;
        }
      }
    }
    .right{
      text-align: center;
      img{
        width: 44rpx;
	      height: 39rpx;
        margin: 0 auto 5rpx;
      }
      p{
        color: #fff;
        font-size: 22rpx;
      }
    }
  }
  .tag{
    margin: 20rpx 0;
    span{
      padding: 2rpx 15rpx;
      margin-right: 10rpx;
      border: 1rpx solid #fff;
      border-radius: 5rpx;
      color: #fff;
      font-size: 22rpx;
    }
  }
  .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 9;
    background-color: rgba(0,0,0,0.4);
    color: #fff;
    padding: 40rpx 30rpx;
  }
}
</style>
