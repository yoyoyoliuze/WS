<template>
  <div class="box">
    <div class="bg_fff pp3">
        <div class="sc_card flex flexColumn justifyContentCenter">
          <div class="flex justifyContentAround flexAlignCenter">
              <div class="flex flexColumn flexAlignCenter">
                <p>
                  <img :src="shop.Logo" alt="" class="ava">
                </p>
                <p class="cf font24">{{shop.ShopNick}}
                  <!-- <span class="name_pill">店长</span> -->
                </p>
              </div>
              <div class="cf flex flexColumn flexAlignCenter">
                <p class="font30">{{submitPro.date}}</p>
                <p class="font24 mt2">星期{{submitPro.getDay}}</p>
              </div>
          </div>
          <!-- <div class="text_right cf font24 card_num">预约号：JS001</div> -->
      </div>
    </div>
    <div class="bg_fff mt2 cellBox">
        <div class="flex flexAlignCenter">
            <img src="/static/images/icons/fill-icon.png" alt="" class="icon1">
            <span class="ml1">预约信息</span>
        </div>
        <div class=" flex flexWrap justifyContentBetween">
            <div class="cell bb1">
              <h4 class="w40">预约人姓名</h4>
              <input type="text" placeholder="请输入您的姓名" v-model="name">
            </div>
            <div class="cell">
              <h4 class="w40">联系方式</h4>
              <input type="text" placeholder="请输入您的手机号码" v-model="phone">
            </div>
        </div>
    </div>
    <div class="pp3 bg_fff mt2">
        <div class="flex flexAlignCenter">
            <img src="/static/images/icons/col.png" alt="" class="icon1">
            <span class="ml1">预约项目</span>
        </div>
        <div class="pw3 item_desc flex flexWrap justifyContentBetween">
            <div class="flex flexColumn flexAlignCenter desc_main ch_active" v-for="(item,index) in data.ProData" :key="index">
                <p>{{item.Name}}</p>
                <p class="font24">（服务时长：{{item.HourNum*60}}分钟）</p>
                <p class="cr">{{item.Price}}元</p>
            </div>
        </div>
    </div>
    <!--服务独有--优惠券-->
    <div class="flex justifyContentBetween pp3 mt2 bg_fff" @click="showCoupon = true">
        <div class="flex flexAlignCenter">
            <div class="flex flexAlignCenter">
              <img src="/static/images/icons/yh.png" alt="" class="icon2">
              <span class="ml1">优惠劵</span>
          </div>
          <div class="cg ml1" v-if="selectCouponItem.Id!=-1">{{selectCouponItem.MeetConditions?"满"+selectCouponItem.MeetConditions:""}}{{selectCouponItem.DiscountType==1?'减'+selectCouponItem.Denomination:'打'+selectCouponItem.Denomination*10+'折'}}</div>
          <div class="cg ml1" v-else>不使用优惠券</div>
        </div>
        <div class="flex flexAlignCenter">
            <span class="cr" v-if="selectCouponItem.Id!=-1">-{{selectCouponItem.DiscountType==1?selectCouponItem.Denomination:selectCouponItem.Denomination*10+'折'}}</span>
            <img src="/static/images/icons/more.png" alt="" class="right ml1">
        </div>
    </div>
    <!---end  !!!-->
    <!--服务独有--次卡-->
    <div class="flex justifyContentBetween pp3 mt2 bg_fff" @click="oneCardStatus = true">
        <div class="flex flexAlignCenter">
            <div class="flex flexAlignCenter">
              <img src="/static/images/icons/yh.png" alt="" class="icon2">
              <span class="ml1">次卡</span>
          </div>
          <div class="cg ml1" v-if="selectOneCard.Id!=-1">{{selectOneCard.Title}}</div>
          <div class="cg ml1" v-else>不使用次卡</div>
        </div>
        <div class="flex flexAlignCenter">
            <span class="cr" v-if="selectCouponItem.Id!=-1">剩余{{selectOneCard.CardNum}}次</span>
            <img src="/static/images/icons/more.png" alt="" class="right ml1">
        </div>
    </div>
    <!---end  !!!-->
    <div class="pp3 bg_fff mt2">
        <div class="flex flexAlignCenter">
            <img src="/static/images/icons/sign.png" alt="" class="icon3">
            <span class="ml1">备注</span>
        </div>
        <textarea class="sign mt2 boxSize"  name="" id="" cols="30" rows="10" 
          placeholder="请输入备注" v-model="remark" v-show="textareaFocus" :focus="textareaFocus" @blur="textareaFocus=false">
        </textarea>
        <div class="textarea-text sign mt2 boxSize" v-show="!textareaFocus" @click="textareaFocus=true"
          :class="{'c999':!remark}">{{remark||'请输入备注'}}
        </div>
    </div>
    <!-- 价格信息 -->
    <div class="pp3 bg_fff mt2 total">
        <div class="lefts">
          <div v-if="data.yhPrice">
            <p>优惠金额：</p>￥{{data.yhPrice}}
          </div>
          <div v-if="data.zkPrice">
            <p>折扣金额：</p>￥{{data.zkPrice}}
          </div>
          <div v-if="data.ServiceFee">
           <p>服务费：</p>￥{{data.ServiceFee}}
          </div>
        </div>
        <div class="rights">
          <div>共计{{data.AllNumber}}个项目总时长{{data.totalTime}}分钟</div>
          <div>项目总额：<span>¥{{data.TotalPrice}}</span></div>
        </div>
    </div>

    <!--服务按钮-->
    <div class="pp3 flex justifyContentBetween fixed bg_fff mt2 submit">
        <div> 
          <span><span class="cr">{{data.AllNumber}}个</span>项目</span>  
          <span class="cen_text">应付款：<span class="cr"> ¥{{data.AllPrice}}</span></span>
        </div>
        <div class="btn_yu" @click="yysubmit">立即预约</div>
    </div>
    <!--技师独有-->
    <div class="btn" style="display:none">立即预约</div>
    <!-- 选择优惠券Win -->
    <div class="mask" v-if="showCoupon" @click="couponClose"></div>
    <div class="modal_mask" v-if="showCoupon">
        <div class="flex ms_title fb">
          <img src="/static/images/icons/left.png" alt="" class="left" @click="couponClose">
          选择优惠券
        </div>
        <div class="pp3 couponList">
            <radio-group  class="gou">
              <label class="flex-between payitem" v-for="(item,index) in couponList" :key="index" @click="couponChange(item)">
                <div class="flex-center" v-if="item.Id!=-1">
                  <span>{{item.DiscountType==1?'满减劵':item.DiscountType==2?'折扣券':''}}</span>
                  <span class="ml2"> {{item.MeetConditions?"满"+item.MeetConditions:""}}{{item.DiscountType==1?'减'+item.Denomination:'打'+item.Denomination*10+'折'}}</span>
                </div>
                <div class="flex-center" v-else>
                  <span>不使用优惠券</span>
                </div>
                <input type="radio" name="payType" :checked="item.Id===selectCouponItem.Id" value="0" />
              </label>
            </radio-group>
        </div>
        <div class="msk_btn" @click="couponConfirm">完成</div>
    </div> 
    <!-- 选择次卡Win -->
    <div class="mask" v-if="oneCardStatus" @click="closeOneCard"></div>
    <div class="modal_mask" v-if="oneCardStatus">
        <div class="flex ms_title fb">
          <img src="/static/images/icons/left.png" alt="" class="left" @click="closeOneCard">
          选择次卡
        </div>
        <div class="pp3 couponList">
            <radio-group  class="gou">
              <label class="flex-between payitem" v-for="(item,index) in oneCardList" :key="index" @click="closeOneCard(item)">
                <div class="flex-center" v-if="item.Id!=-1">
                  <span>{{item.Title}}</span>
                  <span class="ml2"> 剩余{{item.CardNum}}次</span>
                </div>
                <div class="flex-center" v-else>
                  <span>不使用次卡</span>
                </div>
                <input type="radio" name="payType" :checked="item.Id===selectOneCard.Id" value="0" />
              </label>
            </radio-group>
        </div>
        <div class="msk_btn" @click="oneCardConfirm">完成</div>
    </div> 

    <pay :total="data.AllPrice" :orderNumber="orderNumber" v-if="payStatus" 
      @onClose="closePay" 
      @success="payconfirm"
      >
    </pay>
  </div>
</template>

<script>

import '@/style/bb.scss'
import pay from '@/components/pay.vue'
import {post,valPhone,wx_pay} from '@/utils/index'
export default {
  components:{pay},
  data () {
    return {
      UserId:'',
      Token:'',
      submitPro:{},//预约的产品
      payType:0,
      data:{},
      shop:{},
      showCoupon:false,
      couponList:[],//优惠券列表
      selectCouponItem:{
          Denomination: 0,
          DiscountType: 0,
          Id: -1,
          MeetConditions: 0
      },
      name:'',
      phone:'',
      remark:'',
      orderNumber:'',//订单号
      payStatus:false,
      textareaFocus:false,//对焦textarea
      oneCardList:[],
      oneCardStatus:false,
      selectOneCard:{
        Id:'',
      },//选中的次卡
    }
  },
  onLoad(options){
    this.setBarTitle();
    this.init();
    this.submitPro = wx.getStorageSync('submitPro');//要预约的产品，
    wx.setStorageSync('submitPro',{});
    this.getData();
  },
  onShow(){
        this.UserId=wx.getStorageSync('userId');
        this.Token=wx.getStorageSync('token');
  },
  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "预约确定"
        });
    },
    init(){
        this.showCoupon = false;
        this.payStatus = false;
        this.selectCouponItem={
          Denomination: 0,
          DiscountType: 0,
          Id: -1,
          MeetConditions: 0
        }
        this.name='';
        this.phone='';
        this.remark='';
    },
    // type=oneCard;选中次卡。Coupon--优惠券
    getData(Id,type){
      post('Order/ConfirmMakeOrder',{
        UserId:wx.getStorageSync('userId'),
        Token:wx.getStorageSync('token'),
        ProIdList:this.submitPro.proId,
        MakeTime:this.submitPro.date,
        ArtId:this.submitPro.artId||'',
        CouponId:!type?0:type=='Coupon'?Id:'-1',//-1:请选择优惠券;0:默认自动匹配优惠券;>0:使用的优惠券
        SubCardId:!type?0:type=='oneCard'?Id:'-1'
      },this.getData).then(res=>{
        const data = res.data;
        this.data = data;
        this.shop =data.ShopData;
        let time =0;
        data.ProData.map(item=>{
            time+=(item.HourNum*60)
        })
        data.totalTime = time;
        // 优惠券
        if(data.CouponId>0){
          data.UseCouponList.map(item=>{
            if(item.Id ===data.CouponId){
              this.selectCouponItem = item;
            }
          })
        }
        data.UseCouponList.unshift({
          Denomination: 0,
          DiscountType: 0,
          Id: -1,
          MeetConditions: 0
        })
        this.couponList = data.UseCouponList;
        console.log(this.SubCardList)
        // 次卡
        if(data.SubCardId>0){
          data.SubCardList.map(item=>{
            if(item.Id ===data.SubCardId){
              this.selectOneCard = item;
            }
          })
        }
        data.SubCardList.unshift({
          CardNum: 0,
          Id: -1,
          Title: "",
          UseNum: 0
        })
        this.oneCardList = data.SubCardList;
        console.log(this.oneCardList)
      }).catch(err=>{
        setTimeout(()=>{
          wx.navigateBack();
        },1500)
      });
    },
    // 取消选择优惠券
    couponClose(){
      this.showCoupon = false;
      this.couponList.map(item=>{
        if(item.Id===this.data.CouponId){
          this.selectCouponItem= item;
        }
      })
    },
    // 选择优惠券
    couponChange(e){
      this.selectCouponItem = e;
    },
    // 确认选择优惠券
    couponConfirm(){
        this.showCoupon = false;
        this.getData(this.selectCouponItem.Id,'Coupon');
    },
    // 选中次卡
    closeOneCard(e){
      this.selectOneCard = e;
    },
    // 取消选择次卡
    closeOneCard(){
      this.oneCardStatus = false;
      this.oneCardList.map(item=>{
        if(item.Id===this.data.SubCardId){
          this.selectOneCard= item;
        }
      })
    },
    // 确认选择次卡
    oneCardConfirm(){
        this.oneCardStatus = false;
        this.getData(this.selectOneCard.Id,'oneCard');
    },
    // 预提交
    yysubmit(){
      if(!this.name){
        wx.showToast({
          title:'请输入联系人',
          icon:'none'
        })
        return;
      }
      if(!valPhone(this.phone)) return;
      post('Order/SubmitMakeOrder',{
        UserId:this.UserId,
        Token:this.Token,
        ProIdList:this.submitPro.proId,
        MakeTime:this.submitPro.date,
        ArtId:this.submitPro.artId||'',
        CouponId:this.selectCouponItem.Id||'',
        ContactName:this.name,
        Tel:this.phone,
        Remark:this.remark
      }).then(res=>{
        this.orderNumber = res.data;
        this.payStatus = true;
      })
    },
    // 确认支付-type--支付类型0--微信支付.1--余额支付;paw--支付密码
    payconfirm(type,paw){
      if(type*1===2){
        post('Order/OrderOfflinePay',{
          UserId:this.UserId,
          Token:this.Token,
          OrderNo:this.orderNumber,
          Password:paw
        }).then(res=>{
           this.payStatus = false;
            wx.redirectTo({
              url:`/pages/other/myyue/main?orderNo=${this.orderNumber}`
            })
        })  
      }else 
      if(type*1===1){
        post('Order/PaymentOrder',{
          UserId:this.UserId,
          Token:this.Token,
          OrderNo:this.orderNumber,
          Password:paw
        }).then(res=>{
          this.paySuccess();
        })  
      }else if(type*1===0){
        post('Order/ConfirmWeiXinSmallPay',{
          UserId:this.UserId,
          Token:this.Token,
          OrderNo:this.orderNumber,
          WxOpenid: wx.getStorageSync("openId"),
          WxCode:wx.getStorageSync("wxCode")
        }).then(res=>{
          console.log(JSON.parse(res.data.JsParam))
          wx_pay(res.data.JsParam).then(pay=>{
            console.log(pay,'pay')
            this.paySuccess();
          })
        }) 
      }
    },
    // 支付成功
    paySuccess(){
      // wx.showToast({
      //   title:'支付成功'
      // })
      this.payStatus = false;
      // setTimeout(()=>{
        wx.redirectTo({
          url:`/pages/other/success/main?orderNo=${this.orderNumber}&status=${true}&price=${this.data.AllPrice}`
        })
      // },1500)
    },
    // 取消付款
    closePay(){
      this.payStatus = false;
      // wx.showToast({
      //   title:'支付失败，订单已创建',
      //   icon:'none'
      // })
      // setTimeout(()=>{
        wx.redirectTo({
          url:`/pages/other/success/main?orderNo=${this.orderNumber}&price=${this.data.AllPrice}`
        })
      // },1500)
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
  .box{
    padding-bottom:90rpx;
  }
  .sc_card{
    background: #333333;border-radius:25rpx;
    width:690rpx;height:380rpx;
    margin:0 auto;position: relative; 
  }
  .ava{
    width:150rpx;height:150rpx;border-radius:50%;
  }
  .card_num{
    position: absolute;right:30rpx;bottom:30rpx;
  }
  .font30{
    font-size:40rpx;
  }
  .name_pill{
    font-size:20rpx;background: #cc9f68;color:#ffffff;
    padding:0 10rpx;margin-left:8rpx;
  }
  .item_desc{
    padding-bottom:20rpx;
  }
  .desc_main{
    width:275rpx;
    height:150rpx;border-radius: 15rpx;border:1rpx solid #999999;
    margin-top:20rpx;
    justify-content: center;
  }
  .icon1{
    width:34rpx;height:30rpx;
  }
  .icon2{
    width:35rpx;height:27rpx;
  }
  .icon3{
    width:30rpx;height:30rpx;
  }
  .right{
    width:13rpx;height:24rpx;
  }
  .c999{color:#888;}
  .sign{
    width:100%;
    height:200rpx;border:1rpx solid #ececec;
    padding:20rpx;
  }
  .cen_text{
    margin-left:50rpx;
  }
  .btn_yu{
    color:#ffffff;background: #cc9f68;
    padding:0 25rpx;
    font-size:24rpx;
    height:50rpx;line-height: 50rpx;
  }
  .btn{
    margin:50rpx auto 20rpx;
    background: #cc9f68;color:#ffffff;
  }
  .ms_title{
    position: relative;
    display: flex;justify-content: center;
    width:100%;font-size:30rpx;
    padding-top:30rpx;
  }
  .left{
    width:15rpx;height:26rpx;
    position: absolute;left:30rpx;top:50%;transform: translateY(-50%)
  }
  .flex-between{
    display: flex;justify-content: space-between;align-items: center;
  }
  .flex-center{
    display: flex;align-items: center;
  }
  .payimg1{
    width:56rpx;height:52rpx;
  }
  .payimg2{
    width:56rpx;height:56rpx;
  }
  .payimg3{
    width:56rpx;height:53rpx;
  }
  .payitem{
    padding:15rpx 0;
  }
  .ml2{
    margin-left:20rpx;
  }
  .msk_btn{
    width:690rpx;
    margin:10rpx auto 10rpx;
    color:#ffffff;background: #cc9f68;text-align: center;
    height:80rpx;line-height: 80rpx;border-radius:15rpx;
  }
  .cellBox{
    padding:30rpx 30rpx 0;
  }
  .cell{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:88rpx;
    h4{
      width:40%;
    }
    input{
      text-align:right;
      width:50%;
    }
    &.bb1{
      border-bottom:1rpx #e8e8e8 solid;
    }
  }
  .total{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    box-sizing:border-box;
    font-size:14rpx;
    .lefts{
      div{
        display:flex;
        align-items:center;
       line-height:1.8;
      }
      p{
        color:#999;
      }
    }
    .rights{
      text-align:right;
      line-height:1.8;
      span{
        color:#ff3333;
      }
    }
  }
  .couponList{
    max-height:400rpx;
    overflow:auto;
  }
  .modal_mask {
    height:auto;
  }
  .msk_btn{
    margin: 10rpx auto 30rpx;
  }
  .fixed{
    border-top:1rpx #e8e8e8 solid;
    position:fixed;
    box-sizing:border-box;
    bottom:0;
    left:0;
    width:100%;
  }
  .submit{
    z-index:999;
  }
</style>
