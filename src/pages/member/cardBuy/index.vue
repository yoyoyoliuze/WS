<template>
  <div class="bg_fff b_card">
      <div class="swiper_bb">
        <img src="/static/images/icons/bg1.png" alt="" class="img_bg">
        <swiper class="swiper-box" display-multiple-items='1' interval='3000' previous-margin="60" next-margin="60" @change="swiperChange">
          <swiper-item class="swiper-item" v-for="(item,index) in data" :key="index">
            <div class="card" :class="swiperIndex==index?'active_swiper':'quite'">
                <img src="/static/images/icons/yin.png" alt="" v-if="item.Id==1">
                <img src="/static/images/icons/jin.png" alt="" v-if="item.Id==5">
                <img src="/static/images/icons/si.png" alt="" v-if="item.Id==8">
                <!-- <div class="card_detail flex flexWrap">
                    <p class="font30 fb">金卡</p>
                    <p class="font30 fb">￥18800元</p>
                    <p class="font24 mt2">项目折扣</p>
                    <p class="font24 mt2">6.8折</p>
                </div> -->
                <!-- <div class="card_detailb">
                    <div class="font30 flex new_f1 justifyContentBetween">
                        <p>{{item.GradeName}}</p>
                        <p>￥{{item.BuyPrice}}元</p>
                    </div>
                    <div class="flex new_f2 justifyContentBetween">
                        <p>项目折扣</p>
                        <p>{{item.Discount}}折</p>
                    </div>
                </div> -->
                <div class="card_detailb">
                  <div class="top jus-b">
                    <div class="ali-c left">
                      <img src="/static/images/ava.png" alt="">
                      <div>
                        <p>巴啦啦小魔仙</p>
                        <span class="ca">我要升级</span>
                      </div>
                    </div>
                    <div class="jus-e right" @click="switchPath('/pages/myson/consume/main')">
                      <p>消费流水</p>
                    </div>
                  </div>
                  <div class="bottom ali-c jus-b">
                    <div class="ali-c">
                      <div>
                        <p><span>￥</span>18800</p>
                        <span>余额</span>
                      </div>
                      <div>
                        <p>6.8<span>折</span></p>
                        <span>余额</span>
                      </div>
                    </div>
                    <p class="flexc ca" @click="switchPath('/pages/myson/recharge/main')">充值</p>
                  </div>
                </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div class="pp3 mt5">
          <div class="card_br">
              <img src="/static/images/detail_bg.png" alt="" class="img">
              <div class="card_main boxSize">
                  <p class="font30">根据身份不同享有不同的特权</p>
                  <p class="font30 mt1">{{detail.GradeName}}会员专项权益：</p>
                  <div class="flex flexWrap font24 mt2">
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                      <p class="card_item">
                          <i class="card_pill"></i>
                          <span>优先预约服务</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div class="btn_fix" @click="submit">立即升级会员</div>
  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  data () {
    return {
      swiperIndex:0,
      data:[],
      Id:0,
      detail:{}
    }
  },
  onShow(){
    
    this.getData()
  },
  methods: {
    //轮播滑动时，获取当前的轮播id
    swiperChange(e) {
      console.log(e)
      const that = this;
      this.swiperIndex=e.mp.detail.current
      this.Id = this.data[e.mp.detail.current].Id
      this.getDetail()
    },
    switchPath(url){
      wx.navigateTo({
        url
      })
    },
    getData(){
      post('User/VipGoodsList',{}).then(res=>{
        if(res.code==0){
          this.data = res.data
          this.Id = res.data[0].Id
          this.getDetail()
        }
      })
    },
    getDetail(){
      post('User/VipGoodsxq',{
        GradeId:this.Id
      }).then(res=>{
        console.log(res.data.Content.indexOf('↵'))
          if(res.data.Content.indexOf('↵')!=-1){
            // item.Content =  item.Content.split('↵')
            this.$set(res.data,'Content',res.data.Content.split('↵'))
          }
           console.log(res.data)
           this.detail = res.data
      })
    },
    submit(){
      console.log(this.swiperIndex)
      let info = {}
      this.data.map((item,index)=>{
        if(index==this.swiperIndex){
          info = item
        }
      })
      wx.navigateTo({url:'/pages/myson/jiesuan/main?id='+info.Id+'&price='+info.BuyPrice+"&type=1"})
    }
    
  },
}
</script>

<style lang='scss' scoped>
  .btn_fix{
    width:100%;background: #cc9f68;height:88rpx;line-height: 88rpx;
    color:#ffffff;text-align: center;position: fixed;bottom:0;z-index:20
  }
  .b_card{
    min-height: 100vh;
  }
  .card_br{
    position: relative;width:690rpx;height:450rpx;
    .img{
      width:100%;height:100%;
    }
    .card_main{
      background: #ffffff;border-radius:15rpx;
      position: absolute;top:90rpx;left:30rpx;width:630rpx;height:320rpx;
      padding:50rpx 30rpx;
    }
    .card_pill{
      display: inline-block;width:15rpx;height:15rpx;border-radius: 50%;background: #cc9f68;
      margin-right:10rpx;
    }
    .card_item{
      width:50%;margin-top:10rpx;color:#444444;
    }
  }
  .swiper_bb{
    position: relative;
    width:750rpx;height:353rpx;
    overflow-y: hidden;
    .img_bg{
      width:100%;height:353rpx;vertical-align: middle;
    }
  }
  .swiper-box{
    width:100%;
    position: absolute;z-index:40;top:10rpx;left:0;
    height:300rpx;
    .card{
      z-index:60;
      width:480rpx;height:260rpx;position: relative;
      img{
        width:100%;height:100%;
      }
    }
    .card_detailb{
      width:100%;height:100%;
      // top:60rpx;left:60rpx;
      top: 0;left: 0;
      position: absolute;z-index:80;
      color:#a1782c;
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
            color:#a1782c!important;
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
    .swiper-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      overflow:unset;
    }
    .active_swiper{
      transform: scale(1.05);
      transition:all .2s ease-in 0s;
    }
    .quite{
      transform: scale(0.9);
      transition: all 0.2s ease-in 0s;
    }
  }
  .new_f1,.new_f2{
    padding:0 40rpx;
    color:#a1782c;
    margin-top:30rpx;
  }
  .new_f1{
    margin-top:60rpx;
  }
  
  // ._swiper-item{
  //   transform:translateY(15%)!important;
  // }
</style>
