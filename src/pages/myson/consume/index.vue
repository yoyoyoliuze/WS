<template>
  <div>
      <div class="top ali-c jus-b">
        <div class="left flexc" @tap="showDate = true">
          <span>{{setUpDate}}</span>
          <img src="/static/images/jiantou.png" alt="">
        </div>
        <p >￥{{amount}}</p>
      </div>
      <scroll-view scroll-y @scrolltolower="loadMore" class="certlistBox bg_fff">
        <div class="se_list" v-if="list.length>0">
          <div class="list ali-c jus-b" v-for="(item,index) in list" :key="index">
            <div class="left">
              <p>{{item.Title}}</p>
              <span>{{item.AddTime}}</span>
            </div>
            <p>{{item.Change}}</p>
          </div>
        </div>
        <div style="padding:200rpx 0;text-align:center;background:#ffffff" v-else>暂无数据</div>
      </scroll-view>
      <!--时间组件-->
      <div class="shade bottom__shade" v-show="showDate" catchtouchmove="true" >
      <div class="mask" @tap="showDate = false" catchtouchmove="true"></div>
      <div class="shadeContent" catchtouchmove="true">
          <div class="shade__bd">
          <van-datetime-picker
          type="year-month"
          :value="currentDate"
          @confirm="onInput($event)"
          @cancel="showDate=false"
          :min-date="minDate"
          title="请选择时间"
          style="z-index:888!important"
          />
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
      userId:"",
      token:"",
      Type:1,//1-消费记录 2-充值记录 3-提现记录
      amount:0,//记录汇总
      setUpDate:"",
      showDate:false,
      minDate:new Date().setFullYear(2019,0,1),
      currentDate:new Date().getTime(),
      list:[]
    }
  },
  onShow(){
    this.list = []
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getDate()
    this.getRechargeList()
  },
  methods:{
    getDate(){
      let dd = new Date()
      console.log(dd,"dd")
      let year = dd.getFullYear()
      let month = dd.getMonth()+1
      this.setUpDate = `${year}` + "-" + `${month}`;
    },
    getRechargeList(){
      post('Recharge/GetRechargeList',{
        UserId:this.userId,
        Token:this.token,
        Page:1,
        Date:this.setUpDate,
        Type:this.Type
      }).then(res=>{
        if(res.code ==0 ){
          this.amount = res.data.AmountMon_hz
          this.list = res.data.list
        }

      })
    },
    onInput(e){
      let dd = new Date(e.mp.detail);
      let year = dd.getFullYear();
      let month = dd.getMonth()+1;
      // let day = dd.getDate();
      month = month < 10 ? '0'+month : month;
      this.setUpDate = year+"-"+month
      this.currentDate = dd.getTime();
      this.showDate = false
      this.list = []
      this.getRechargeList()
    },
  },
  onPullDownRefresh () {
    this.getDate()
    this.getRechargeList()
    wx.stopPullDownRefresh();
  }
}
</script>

<style scoped lang='scss'>
.list{
  height: 145rpx;
  background-color: #fff;
  border: 1rpx solid #ededed;
  padding: 0 30rpx;
  p{
    color: #ff3333;
  }
  .left{
    p{
      color: #333;
      margin-bottom: 10rpx;
    }
    span{
      color: #999;
      font-size: 22rpx;
    }
  }
}
.top{
  height: 104rpx;
  padding: 0 30rpx;
  .left{
    width: 160rpx;
    height: 56rpx;
    background-color: #ffffff;
    border-radius: 28rpx;
    span{
      font-size: 24rpx;
    }
    img{
      width: 16rpx;
      height: 8rpx;
      margin-left: 15rpx
    }
  }
}
.certlistBox {
  height: calc(100vh - 100rpx);
  overflow: hidden;
  overflow-y: auto;
}
</style>
