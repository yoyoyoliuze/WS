<template>
  <div :style="type==0?'padding-bottom:100rpx':''" :class="{'p-top':isP}">
      <div class="top">
        <img class="bg" :src="shopDetail.Logo" alt="" mode="aspectFill">
        <div class="main">
          <p class="name">{{shopDetail.ShopNick}}</p>
          <div class="flex-warp ali-c tag">
            <span v-for="(tab,tabIndex) in shopDetail.tabs" :key="tabIndex">{{tab}}</span>
          </div>
          <div class="ali-c jus-b map">
            <div class="left"> 
              <div class="ali-c one">
                <img class="a" src="/static/images/detail/time.png" alt="">
                <span>{{shopDetail.BusinessHours}}</span>
                <img class="b" src="/static/images/detail/phone1.png" alt="">
                <span>{{shopDetail.Phone}}</span>
              </div>
              <div class="ali-c two">
                <img src="/static/images/detail/address1.png" alt="">
                <span>{{shopDetail.Address}}</span>
              </div>
            </div>
            <div class="right" @click="goLocation">
              <img src="/static/images/detail/map.png" alt="">
              <p>地图找店</p>
            </div>
          </div>
          <!-- <p class="ali-c jian"><span class="flexc">减</span>新用户首单满30减3</p>
          <p class="ali-c jian"><span class="flexc">奖</span>邀请好友奖励10元</p> -->
        </div>
      </div>

      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" 
          @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <!-- 服务项目 -->
      <div class="serverBox" v-if="type==0">
          <div class="server-list-box"  v-for="(pro, index) in proList" :key="index" v-show="pro.list.length>0">
            <div class="tit jus-b ali-c" @click="pro.status = !pro.status">
              <span>{{pro.Name}}({{pro.list.length}})</span>
              <img src="/static/images/more.png" alt="" :style="pro.status?'transform: rotate(90deg);':''">
            </div>
            <div class="list-box flex-wrap jus-b" v-show="pro.status">
              <div class="list" v-for="(item, itemIndex) in pro.list" :key="itemIndex">
                <div class="box" :style="item.status?'border: solid 4rpx #cc9f68;color:#ff3333;':''" @click="item.status = !item.status">
                  <img src="/static/images/icons/gou.png" class="gou" alt="" v-show="item.status">
                  <p>{{item.Name}}</p>
                  <p >(服务时长：{{item.HourNum*60}}分钟)</p>
                  <p>{{item.Price}}元</p>
                </div>
                <p class="flexc" @click="goProDetail(item.Id)">查看详情</p>
              </div>
            </div>
          </div>
      </div>
      <!-- 技师 -->
      <div class="jishi-box" v-if="type==1">
        <div class="jishi ali-c jus-b" v-for="(item,index) in artiftcerList" :key="index" 
          @click.stop="goArtDetail(item.ArtId)">
          <div class="ali-c left">
            <img class="ava" :src="item.ArtificerPic" alt="">
            <div>
              <div class="ali-c one">
                <p>{{item.Name}}</p>
                <span class="flexc" v-if="item.LvlName">{{item.LvlName}}</span>
              </div>
              <p class="two">{{item.Mobile}}</p>
              <div class="ali-c thr">
                <img src="/static/images/my_icon_7.png" alt="">
                <span>好评率</span>
                <span>{{item.FeedbackRate}}</span>
              </div>
            </div>
          </div>
          <div class="right flexc" @click.self="yyArtiftcer(item.ArtId)">预约</div>
          <!-- <div class="right flexc" v-if="item.IsRest">预约</div>
          <div class="right flexc rest" v-else>休息中</div> -->
        </div>
        <div class="notData" v-if="artiftcerList.length<1">该店铺没有绑定技师哦~</div>
      </div>

      <div class="server-box">
        <p class="tit">服务评价</p>
        <div class="server flex" v-if="comment.CommentCount">
          <div class="flex1 flexc">
            <div>
              <p>{{comment.GoodRate}}</p>
              <span>好评率</span>
            </div>
          </div>
          <div class="flex1 flexc">
            <div>
              <p>{{comment.CommentCount}}</p>
              <span>评论</span>
            </div>
          </div>
        </div>
        <div class="comment jus-b" v-if="comment.CommentCount&&comment.CommentList&&comment.CommentList[0]">
          <img class="left" :src="comment.CommentList[0].Avatar" alt="">
          <div class="right">
            <div class="one jus-b">
              <div class="name ali-c">
                <p>{{comment.CommentList[0].NickName}}</p>
                <span>({{comment.CommentList[0].Mobile}})</span>
              </div>
              <div class="ava ali-c jus-b">
                <img v-if="comment.CommentList[0].Rank==3" src="/static/images/icons/s1.png" alt="">
                <img v-if="comment.CommentList[0].Rank==2" src="/static/images/icons/s2.png" alt="">
                <img v-if="comment.CommentList[0].Rank==1" src="/static/images/icons/s3.png" alt="">
                <span>{{comment.CommentList[0].Rank==1?'不满意':comment.CommentList[0].Rank==2?'一般':'满意'}}</span>
              </div>
            </div>
            <div class="text">
              {{comment.CommentList[0].ContentText}}
            </div>
            <div class="ali-c jus-b time">
              <p>技师：{{comment.CommentList[0].ArtName}}</p>
              <p>{{comment.CommentList[0].AddTime}}</p>
            </div>
          </div>
        </div>
        <div class="btn-box flexc" v-if="comment.CommentCount">
          <p class="flexc" @click="goComment">查看全部评价</p>
        </div>
        <div class="notData" v-if="!comment.CommentCount">暂无评价</div>
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

      <div class="kefu flexc" @click="call">联系客服（{{shopDetail.BusinessHours}}）</div>
      
      <div class="pp3 flex justifyContentBetween fixed bg_fff mt2" v-if="type==0">
          <div> 
            <span><span class="cr">{{allNum}}个</span>项目</span>  
            <span class="cen_text"> 服务时长<span class="cr">{{totalTime}}分钟</span></span>
          </div>
          <div class="btn_yu" @click="yysubmit">立即预约</div>
      </div>
  </div>
</template>

<script>
import {post,openLocation,callPhone} from '@/utils'
export default {

  data () {
    return {
      tabList:['技师','服务评价','门店信息'],
      tabIndex:0,
      isP:false,
      shopDetail:{},
      type:0,//0--服务；1--技师
      proList:[],
      artiftcerList:[],
      comment:{},
    }
  },
  onPageScroll(e) {
    
  },
  onLoad(options){
    this.shopId = options.id;
    this.type = options.server;//0--服务；1--技师
    if(options.server==0){
      this.tabList.splice(0,1,'服务')
    }
    this.getDetail();
    this.getComment();
    if(options.server==0){
      this.getClassify();
    }else{
      this.getArtificerList();
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    },
    // 选择的服务项目数量
    allNum(){
      let num =0;
      this.proList.map(item=>{
          item.list.map(list=>{
            if(list.status){
              num+=1;
            }
          })
      })
      return num;
    },
    // 选择服务项目的总时长
    totalTime(){
      let time =0;
      this.proList.map(item=>{
          item.list.map(list=>{
            if(list.status){
              time+=(list.HourNum*60);
            }
          })
      })
      return time;
    }
  },
  methods: {
    getDetail(){
      post('Shop/ReadShop',{
        Lat:wx.getStorageSync('location').lat,
        Lng:wx.getStorageSync('location').lng,
        ShopId:this.shopId
      }).then(res=>{
        if(res.code===0){
          const data= res.data;
          data.tabs = data.MapReservation.split(',');
          this.shopDetail = data;
        }
      })
    },
    // 获取分类
    getClassify(){
     post('Goods/TypeList',{Type:0}).then(res=>{
        res.data.map((item,index)=>{
          item.list=[];
          if(index===0){
            item.status = true;
          }else{
            item.status = false;
          }
        })
        this.proList = res.data;
        this.getProList();
      })
    },
    // 项目列表
    getProList(){
      post('Goods/GoodsList',{
        Page:1,
        PageSize:100,
        ShopId:this.shopId
      }).then(res=>{
        const data = res.data;
        this.proList.map(classify=>{
          // classify.list=[];
          data.map(pro=>{
            if(pro.TypeId===classify.Id){
              pro.status = false;
              classify.list.push(pro)
            }
          })
        })
        console.log(this.proList)
      })
    },
    // 技师列表
    getArtificerList(){
      post('Shop/GetShopArtificerList',{
        Page:1,
        PageSize:0,
        ShopId:this.shopId
      }).then(res=>{
        this.artiftcerList = res.data;
      })
    },
    // 获取评论
    getComment(){
      post('Order/OrderCommentHz',{
        ShopId:this.shopId
      }).then(res=>{
        this.comment = res.data;
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
    scroll(el){
      wx.pageScrollTo({
        selector:el,
        duration: 300
      })
    },
    // 预约订单提交
    yysubmit(){
      let proId=[];
      this.proList.map(item=>{
          item.list.map(list=>{
            if(list.status){
              proId.push(list.Id)
            }
          })
      })
       wx.setStorageSync('submitPro',
        {
          proId:proId.join(','),
          shopId:this.shopId,
          time:this.totalTime,
          proNum:proId.length
        })
        wx.navigateTo({
            url:`/pages/other/apointtime/main`
        })
    },
    // 预约技师
    yyArtiftcer(artId){
       wx.setStorageSync('submitPro',
        {
          proId:'',
          artId,
          shopId:this.shopId,
          time:0,
          proNum:0
        })
      wx.navigateTo({
        url:"/pages/other/yuyue/main"
      })
    },
    goProDetail(id){
      wx.navigateTo({
        url:"/pages/other/serdetail/main?id="+id
      })
    },
    goArtDetail(id){
      wx.navigateTo({
        url:"/pages/myson/jishiDetail/main?artId="+id
      })
    },
    goComment(){
      wx.navigateTo({
        url:"/pages/other/allcomment/main?shopId="+this.shopId
      })
    },
    goLocation(){
        openLocation({lat:this.shopDetail.Lat,lng:this.shopDetail.Lng})
    },
    call(){
      callPhone(this.shopDetail.Phone)
    }
  },
}
</script>

<style scoped lang='scss'>
  .p-top{
    padding-top:92rpx 
  }
.server-list-box{
  border-bottom: 1rpx solid #ededed;
  padding-bottom:20rpx;
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
        border: solid 4rpx #e8e8e8;
        margin-bottom: 10rpx;
        position:relative;
      }
      .gou{
        width:50rpx;
        height:50rpx;
        position:absolute;
        right:-2rpx;
        top:-2rpx;
      }
    }
  }
  .tit{
    height: 88rpx;
    background-color: #fff;
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
    // position: fixed;
    // bottom: 0;
    box-shadow: 0rpx 8rpx 8rpx 8rpx rgba(0, 0, 0, 0.1)
  }
  .fixed{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    box-sizing:border-box;
    border-top:1rpx solid #e8e8e8;
  .btn_yu{
    color:#ffffff;background: #cc9f68;
    padding:0 25rpx;
    font-size:24rpx;
    height:50rpx;line-height: 50rpx;
  }
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
.serverBox{
  background-color: #fff;
}
.server-box{
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
            margin:0 10rpx;
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
    .rest{
      background-color:#ccc;
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
          padding:0 10rpx;
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
  height: 350rpx;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  .main{
    .name{
      font-size:35rpx;
      line-height:3;
    }
  }
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
.notData{
  color:#999;
  text-align:center;
}
</style>
