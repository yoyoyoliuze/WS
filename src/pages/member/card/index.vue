<template>
  <div class="bg_fff b_card">
      <div class="swiper_bb">
            <div class="card">
                <img src="/static/images/icons/yin.jpg" alt="">
                <!-- <img src="/static/images/icons/jin.jpg" alt="" v-if="index==1">
                <img src="/static/images/icons/si.jpg" alt="" v-if="index==2"> -->
                <!-- <div class="card_detail flex flexWrap">
                    <p class="font30 fb">金卡</p>
                    <p class="font30 fb">￥18800元</p>
                    <p class="font24 mt2">项目折扣</p>
                    <p class="font24 mt2">6.8折</p>
                </div> -->
                <div class="card_detailb">
                  <div class="top jus-b">
                    <div class="ali-c left">
                      <img :src="data.Avatar" alt="">
                      <div>
                        <p>{{data.NickName}}</p>
                        <span class="ca">{{data.GradeName}}</span>
                      </div>
                    </div>
                    <div class="jus-e right" @click="switchPath('/pages/myson/consume/main')">
                      <p>消费流水</p>
                    </div>
                  </div>
                  <div class="bottom ali-c jus-b">
                    <div class="ali-c">
                      <div>
                        <p><span>￥</span>{{data.Wallet}}</p>
                        <span>余额</span>
                      </div>
                      <div v-if="data.IsVip">
                        <p>{{data.Discount}}<span>折</span></p>
                        <span>项目折扣</span>
                      </div>
                    </div>
                    <p class="flexc ca" @click="switchPath('/pages/myson/recharge/main')">充值</p>
                  </div>
                </div>
            </div>
      </div>
      <div class="btn" @click="switchPath('/pages/home/card/main')">立即开通</div>
  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  data () {
    return {
      data:{},
      userId:"",
      token:"",
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.getData()
  },

  methods: {
    //轮播滑动时，获取当前的轮播id
    swiperChange(e) {
      console.log(e)
      const that = this;
      this.swiperIndex=e.mp.detail.current
    },
    switchPath(url){
      wx.navigateTo({
        url
      })
    },
    getData(){//查询会员状态
      post('User/QueryVipInfo',{
        UserId: this.userId,
        Token: this.token
      }).then(res=>{
        if(res.code==0){
          this.data = res.data
        }
      })
    }
    
    
  },
}
</script>

<style lang='scss' scoped>
  .swiper_bb{
    width:100%;
    position: absolute;z-index:40;top:30rpx;left:0;
    height:300rpx;
    .card{
      z-index:60;
      width:690rpx;height:345rpx;position: relative;
      left:30rpx;
      img{
        width:100%;height:100%;
      }
    }
    .card_detailb{
      width:100%;height:100%;
      // top:60rpx;left:60rpx;
      top: 30rpx;left: 0;
      position: absolute;z-index:80;
      .bottom{
        height: 100rpx;
        div,p{
          text-align: center;
          color:#a1782c;
        }
        .ali-c{
          div{
            margin: 0 20rpx;
            p{
              font-size: 36rpx;
              font-weight: bold;
              span{
                font-size: 20rpx;
              }
            }
            span{
              font-size: 24rpx;
            }
          }
        }
        .flexc{
          width: 98rpx;
          height: 40rpx;
          background-color: rgba(255,255,255,0.4);
          border-radius: 20rpx 0rpx 0rpx 20rpx;
          font-size: 20rpx
        }
      }
      .top{
        height: 150rpx;
        .left{
          padding-left: 30rpx;
          div{
            color:#a1782c!important;
          }
          img{
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-right: 20rpx
          }
          span{
            background:#a1782c;
            font-size: 20rpx;
            padding: 5rpx 10rpx;
            border-radius: 15rpx 0rpx 16rpx 0rpx;
	          border: solid 1rpx #a1782c;
          }
        }
        .right{
          color:#a1782c!important;
          text-decoration: underline;
          font-size: 20rpx;
          padding: 20rpx
        }
      }
    }
    .card_detail{
      width:400rpx;height:132rpx;
      top:60rpx;left:60rpx;
      position: absolute;z-index:80;
      color:#a1782c;
      p{
        width:50%;
      }
    }

  }
  .ca{
    color:#1a1a1a!important;
  }
  .b_card{
    min-height: 100vh
  }
  .btn{
    background: #a1782c;color:#ffffff;
    text-align: center;
    position: fixed;
    bottom:0;height:88rpx;line-height: 88rpx;
    bottom:0;width:750rpx;
  }
</style>
