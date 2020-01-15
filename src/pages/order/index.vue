<template>
  <div>
      <div class="top-box flexc">
        <div class="top flex" :class="serverIndex==0?'leftShadow':'rightShadow'">
          <div class="flex1 flexc" :class="{'active':serverIndex==index}" v-for="(item, index) in serverList" :key="index" @click="cliServer(item,index)">{{item.Name}}</div>
          <span :style="serverIndex==1?'left:220rpx':''"></span>
        </div>
      </div>
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index1}" v-for="(item2, index1) in tabList" :key="index1" @click="cliTab(item2,index1)">{{item2.Name}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="order_list" v-if="list.length>0">
        <div class="list" v-for="(item1,key) in list" :key="key">
          <div class="tit ali-c" @click="toDetail(item1)">{{item1.Payment=='到店付款'?item1.Payment:item1.StatusName}}</div>
          <div class="main">
            <div class="time-box ali-c" @click="toDetail(item1)">
              <div class="flex1 flexc">
                <div>
                  <p>{{item1.MakeNum}}</p>
                  <span>预约序号</span>
                </div>
              </div>
              <div style="width:50%" class="flexc">
                <div>
                  <p>{{item1.MakeDate}}</p>
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
            <div class="address ali-c jus-b" @click="toDetail(item1)">
              <div class="ali-c left">
                <p>{{item1.ShopData.ShopName}}</p>
                <img src="/static/images/more.png" alt="">
              </div>
              <img class="right" src="/static/images/address_r.png" alt="">
            </div>
            <div class="heji" @click="toDetail(item1)">
              <div class="ali-c jus-b"><p>技师</p><span>{{item1.ArtData.ArtName}}</span></div>
              <div class="ali-c jus-b"><p>电话</p><span>{{item1.ArtData.ArtTel}}</span></div>
              <div class="ali-c jus-b"><p>服务项目</p><span>{{item1.serInfo.serve}}</span></div>
              <div class="ali-c jus-b"><p>合计</p><span>￥{{item1.serInfo.total}}</span></div>
            </div>
            <div class="btn-box jus-e ali-c">
              <p class="flexc tt_item" @tap="onPay(item1,key)" v-if="item1.Ispay==1">支付</p>
              <p class="flexc tt_item" @tap="menuItem(item1)" v-if="item1.IsComment==1">评价</p>
              <p class="flexc tt_item" @tap="menuItem(item1)" v-if="item1.IsCancel==1">取消预约</p>
              <p class="flexc tt_item" @tap="onReservation(item1)" v-else>重新预约</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="padding:200rpx 0;text-align:center">暂无数据</div>
      <pay :total="allPrice" :orderNumber="orderNo" v-if="payStatus" 
        @onClose="payStatus = false" 
        @success="onPayconfirm"
        >
      </pay>
  </div>
</template>

<script>
import {switchPath,post,Reservation,Payconfirm} from '@/utils';
import pay from '@/components/pay.vue';
export default {
  components:{pay},
  data () {
    return {
      serverList:[{Id:1,Name:'预约服务'},{Id:2,Name:'预约技师'}],
      serverIndex:0,
      tabList:[{Id:1,Name:'待服务'},{Id:2,Name:'已服务'},{Id:3,Name:'已取消'}],
      tabIndex:0,
      Type:1,//0-全部 1-预约服务 2-预约技师
      Status:1,//0-全部状态 1-待服务 2-已服务 3-已取消
      userId:"",
      token:"",
      list:[],
      payStatus:false,
      allPrice:0,
      orderNo:'',
      payIndex:0,
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    this.list =[];
    this.payStatus = false;
    console.log(wx.getStorageSync("statu"),"333statu")
    if(wx.getStorageSync("statu")){
      this.Status = wx.getStorageSync("statu")
      this.tabList.map((item,i)=>{
        if(wx.getStorageSync("statu")==item.Id){
          this.tabIndex = i
        }
      })
    }
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getList()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    cliServer(item,index){
      console.log(index,"111")
      this.serverIndex = index
      this.Type = item.Id
      this.getList()
    },
    cliTab(item,index){
      this.tabIndex = index
      this.Status = item.Id
      this.getList()
    },
    getList(){
      // console.log({
      //   UserId:this.userId,
      //   Token:this.token,
      //   Page:1,
      //   Type:this.Type,
      //   Status:this.Status
      // },"请求参数")
      post('Order/OrderList',{
        UserId:this.userId,
        Token:this.token,
        Page:1,
        Type:this.Type,
        Status:this.Status
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
          this.list = res.data
          // console.log(this.list,"list+++++++++")
        }
      })
    },
    //订单重新预约等操作
    menuItem(item){
      if(item.IsComment==1){//去往评价页面
        wx.navigateTo({
          url:'/pages/myson/pingjia/main?OrderNo='+item.OrderNumber
        })
      }else if(item.IsCancel==1){//取消预约
        this.cancleOrder(item)
      }
    },
    // 重新预约
    onReservation(item){
      Reservation(item);
    },
    // 支付
    onPay(item,index){
      this.allPrice = item.Total;
      this.orderNo = item.OrderNumber;
      this.payIndex = index+1;
      this.payStatus = true;
    },
    // 确认付款
    onPayconfirm(type,pwd){
      Payconfirm(this.orderNo,type,pwd).then(res=>{
        wx.showToast({
          title:'支付成功'
        })
        this.payStatus = false;
        setTimeout(()=>{
            this.list[this.payIndex-1].Ispay=0;
        },1500)
      })
    },
    cancleOrder(item){
      const that =this;
      wx.showModal({
        title:'是否取消预约',
        confirmColor:'#cc9f68',
        cancelColor:'#999',
        success(ret){
          if(ret.confirm){
            post('Order/CancelOrders',{
              UserId:that.userId,
              Token:that.token,
              OrderNo:item.OrderNumber,
            }).then(res=>{
              if(res.code==0){
                wx.showToast({title:"订单取消成功~"})
                setTimeout(()=>{
                  that.getList()
                },1500)
              }
            })
          }
        }
      })
    },
    toDetail(item){
      wx.navigateTo({
        url:'/pages/orderson/orderDetail/main?OrderNo='+item.OrderNumber
      })
    }
  },
  onHide(){
    wx.setStorageSync('statu',1)//清楚个人中心页面缓存
  }
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
.tt_item{
  margin-left:20rpx;
}

</style>
