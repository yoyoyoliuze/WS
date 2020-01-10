<template>
  <div style="padding-bottom:100rpx;">
      <div class="md_card">
          <img src="/static/images/icons/bg6.png" alt="" class="bg6">
          <div class="ff_card">
              <img src="/static/images/icons/bg11.png" alt="" class="bg11">
              <div class="ff_size">
                  <p class="font30">会员次卡</p>
                  <p class="font24 mt2">选择任一服务项目，即可专享服务 项目10次，线上线下预约做服务均 可用次卡抵消</p>
              </div>
          </div>
      </div>
      <div class="mt2 bg_fff">
          <div class="fb font30 p3 text_center">次卡服务项</div>
          <div class="se_list">
              <div class="se_item" v-for="(item,index) in data" :key="index">
                  <div class="pp3 flex justifyContentBetween" @tap="showItem(item)">
                      <p class="fb">{{item.Name}}</p>
                      <img src="/static/images/icons/down.png" alt="" class="down" v-if="item.isShow">
                      <img src="/static/images/icons/more.png" alt="" class="icon_right" v-else>
                  </div>
                  <div class="pw3 item_desc" v-if="item.isShow">
                      <div class="flex justifyContentBetween flexAlignCenter desc_main" v-for="(item2,key) in item.Info" :key="key" :class="item2.sonShow?'ch_active':''" @tap="sonShowItem(index,item.Info,key)">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>{{item2.Name}}</p>
                            <p class="font24">（服务次数：10次）</p>
                            <p class="cr">{{item2.Denomination}}元</p>
                        </div>
                        <div class="dd_see" :class="item2.sonShow?'active_btn':''" @tap="seeDetail(item2)">查看详情</div>
                      </div>  
                      <!-- <div class="flex justifyContentBetween flexAlignCenter desc_main">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see active_btn">查看详情</div>
                      </div> 
                      <div class="flex justifyContentBetween flexAlignCenter desc_main ch_active">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see">查看详情</div>
                      </div> 
                      <div class="flex justifyContentBetween flexAlignCenter desc_main ch_active">
                        <div class="flex flexColumn flexAlignCenter">
                            <p>彩绘指甲</p>
                            <p class="font24">（服务时长：半小时）</p>
                            <p class="cr">298元</p>
                        </div>
                        <div class="dd_see">查看详情</div> 
                      </div>  -->
                  </div>
              </div>
          </div>
      </div>
      <div class="yu_btn" @tap="buy">立即购买</div>
      
  </div>
</template>

<script>
import {post} from '@/utils'
import '@/style/bb.scss'

export default {
  data () {
    return {
      data:[],
      typeList:[],
      acitveKey:0,
    }
  },
  onShow(){
    this.data = []
    this.setBarTitle()
    this.getTypeList()
  },
  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "会员次卡"
        });
    },
    getTypeList(){
      post('Goods/TypeList',{}).then(res=>{
        if(res.code==0){
          this.typeList = res.data
          this.getData()
        }
      })
    },
    getData(){
      let obj = []
      let comfData = []
      post('Coupon/VipCardList',{
        Page:1
      }).then(res=>{
        if(res.code == 0){
          res.data.map((item,i)=>{
            comfData.push(item.ProTypeId)
          })
          comfData = Array.from(new Set(comfData)); //数组去重
          comfData.forEach(item=>{
            this.data.push({Id:item,Name:'',Info:[],isShow:false})
          })
          res.data.forEach(item2=>{
            this.data.forEach(item=>{
              if(item2.ProTypeId==item.Id){
                item.Info.push({
                  Id:item2.Id,
                  Name:item2.Name,
                  ProductId:item2.ProductId,
                  ScopeOfUse:item2.ScopeOfUse,
                  ShopId:item2.ShopId,
                  MeetConditions:item2.MeetConditions,
                  Denomination:item2.Denomination,
                  Circulation:item2.Circulation,
                  CardNum:item2.CardNum,
                  sonShow:false,
                })
              }
            })
          })
          this.$set(this.data[0],"isShow",true)
          this.typeList.map(ell=>{
            this.data.map(oll=>{
                if(ell.Id==oll.Id){
                  oll.Name = ell.Name
                }
            })
          })
          // console.log(this.data,"/////")
        }
      })
    },
    showItem(item){
      if(item.isShow){
        item.isShow = false
      }else{
        item.isShow = true
      }
    },
    sonShowItem(index,info,key){
      this.data.map((item2,j)=>{
        if(j==index){
          info.map((oll,ell)=>{
            if(ell==key){
              oll.sonShow = true
            }else{
              oll.sonShow = false
            }
          })
        }else{
          this.data[j].Info.map(item3=>{
            item3.sonShow = false
          })
        }
      })
    },
    seeDetail(item2){
      wx.navigateTo({
        url:'/pages/member/cikadetail/main?id='+item2.Id
      })
    },
    buy(){
      let num = 0
      let id = 0
      let price = 0
      this.data.map(item=>{
        item.Info.map(item2=>{
          if(item2.sonShow){
              num++;
              id = item2.Id
              price = item2.Denomination
          }
        })
      })
      if(num>0){
        wx.navigateTo({url:'/pages/myson/jiesuan/main?id='+id+'&price='+price+"&type=2"})
      }else{
        wx.showToast({
          title:"请选择购买的项目~",icon:"none"
        })
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
.md_card{
    background: #ffffff;
    height:550rpx;
    .bg6{
      background:#ffffff;
      width:750rpx;height:362rpx; 
    }
    .ff_card{
      position: relative;
      top:-200rpx;left:60rpx;
      .bg11{
        width:630rrpx;height:321rpx;
      }
      .ff_size{
        position: absolute;
        top:50rpx;left:30rpx;
        color:#ffffff;
        width:50%;
      }

    }
  }
  .yu_btn{
    width:100%;position: fixed;bottom: 0;left:0;
    box-sizing: border-box;text-align: center;
    height:88rpx;line-height: 88rpx;
    background: #cc9f68;color:#ffffff;
  }
  .btn_next{
    color:#ffffff;background: #cc9f68;
    padding:8rpx 20rpx;border-radius: 10rpx;
  }
  .se_item{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .item_desc{
    background: #ffffff;padding-bottom:20rpx;
  }
  .desc_main{
    width:100%;
    height:150rpx;border-radius: 15rpx;border:1rpx solid #999999;
    margin-top:20rpx;
    justify-content: center;
  }
  .dd_see{
    color:#ffffff;background:#cc9f68;
    font-size:24rpx;padding:5rpx 20rpx;border-radius:8rpx;
    margin-left:150rpx;
    &.active_btn{
      background: #f00;
    }
  }
  .ch_active{
      color:#f00;border:1rpx solid #f00;
    }
  .down{
    width:27rpx;height:15rpx;
  }
  .more,.icon_right{
    width:13rpx;height:24rpx;
  }
  .md_pill{
    color:#ffffff;background: #cc9f68;font-size:22rpx;
    padding:2rpx 15rpx;margin-left:15rpx;border-radius: 5rpx;
  }
</style>
