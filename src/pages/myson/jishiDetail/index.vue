<template>
  <div style="padding-bottom:120rpx">
      <div class="top-box">
        <div class="top relative">
          <div class="workTime">{{artInfo.WorkExperience}}</div>
          <div class="ava flexc">
            <div>
              <img :src="artInfo.ArtificerPic" alt="">
              <div class="flexc">
                <p>{{artInfo.Name}}</p>
                <span class="flexc" v-if="artInfo.LvlName">{{artInfo.LvlName}}</span>
              </div>
            </div>
          </div>
          <div class="pinglun flex">
          <div class="flex1 flexc">
            <div>
              <p>{{comment.GoodRate||0}}</p>
              <span>好评率</span>
            </div>
          </div>
          <div class="flex1 flexc">
            <div>
              <p>{{artInfo.MakeNum}}</p>
              <span>被预约</span>
            </div>
          </div>
          <div class="flex1 flexc">
            <div class="thr">
              <p>{{artInfo.FollowNum}}</p>
              <span>关注</span>
            </div>
          </div>
        </div>
        </div>
        <div class="call ali-c jus-b">
          <p v-if="artInfo.ShopData">{{artInfo.ShopData.ShopNick}}</p>
          <div>
            <img src="/static/images/detail/phone.png" alt="" @click="call">
            <img src="/static/images/detail/address.png" alt="" @click="goLocation">
            <img src="/static/images/detail/love.png" v-if="!love" alt="" @click="attention">
            <img src="/static/images/detail/love-a.png" v-else alt="" @click="attention">
          </div>
        </div>
      </div>

      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>

      <!-- <div class="jishi-box">
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
      </div> -->

      <div class="server-box">
        <!-- <p class="tit">服务评价</p> -->
        <div class="server flex">
          <div class="flex1 flexc" >
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
        <p class="tit">技师特长</p>
        <div class="list line ali-c" v-for="(val,key,index) in speciality" :key="index">
          <span class="dian"></span>
          <p>{{key}}</p>
          <span class="text">{{val}}</span>
        </div>
      </div>

      <div class="jishi">
        <div class="tit ali-c"><p>技师图片</p></div>
        <scroll-view scroll-x enable-flex class="jishi-img">
          <div class="item"  v-for="(item, index) in artInfo.PicData" :key="index">
            <img :src="item.PicUrl" alt="" >
          </div>
            <!-- <img mode='aspectFill' :src="item.PicUrl" alt=""  
              v-for="(item, index) in artInfo.PicData" :key="index"> -->
        </scroll-view>
      </div>
      
      <div class="bottom ali-c jus-b">
        <p>{{artInfo.WorkNote}}</p>
        <p></p>
        <div class="flexc" v-if="!artInfo.IsRest" @click="submit">预约</div>
        <div class="flexc rest" v-else>休息中</div>
      </div>
  </div>
</template>

<script>
import {post,callPhone,openLocation} from '@/utils/index'
export default {
  name:'技师详情',
  data () {
    return {
      tabList:['服务评价','技师特长','技师图片'],
      tabIndex:0,
      artInfo:{},
      artId:0,
      speciality:{},//专长
      comment:{},
      love:false,
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onLoad(options){
    this.artId = options.artId*1;
    this.getArtInfo();
    this.getComment();
  },
  methods: {
    // 获取技师信息
    getArtInfo(){
      post('Shop/GetShopArtificerxq',{
          ArtId:this.artId
      }).then(res=>{
        this.artInfo = res.data;
        this.speciality = JSON.parse(res.data.Speciality);
      })
    },
    // 获取评论
    getComment(){
      post('Order/OrderCommentHz',{
        ArtId:this.artId,
        ShopId:''
      }).then(res=>{
        this.comment = res.data;
      })
    },
    // 提交
    submit(){
       wx.setStorageSync('submitPro',
        {
          proId:'',
          artId:this.artId,
          shopId:this.artInfo.ShopId,
          time:0,
          proNum:0
        })
      wx.navigateTo({
        url:"/pages/other/yuyue/main"
      })
    },
    call(){
      callPhone(this.artInfo.ShopData.Phone)
    },
    goLocation(){
      openLocation({lng:this.artInfo.ShopData.Lng,lat:this.artInfo.ShopData.Lat})
    },  
    // 收藏
    attention(){
      // wx.showModal({
      //   title:'',
      //   success(ret){
          // if(ret.confirm){
            post('User/AddCollections',{
              UserId:wx.getStorageSync('userId'),
              Token:wx.getStorageSync('token'),
              Type:2,
              Id:this.artId
            }).then(res=>{
              this.love = true;
              wx.showToast({
                title:res.msg
              })
            })
          // }
      //   }
      // })
    },
    goComment(){
      wx.navigateTo({
        url:"/pages/other/allcomment/main?artId="+this.artId
      })
    },
    cliTab(index){
      this.tabIndex = index
      if(index===0){
        this.scroll('.server-box')
      }else if(index===1){
        this.scroll('.info')
      }else if(index===2){
        this.scroll('.jishi')
      }
    },
    scroll(el){
      wx.pageScrollTo({
        selector:el,
        duration: 300
      })
    },
  },
}
</script>

<style scoped lang='scss'>
.bottom{
  background-color: #fff;
  padding: 0 30rpx;
  height: 98rpx;
  position: fixed;
  bottom: 0;
  width: 100vw;
  box-sizing: border-box;
  box-shadow: 0 0 5rpx 5rpx rgba(0, 0, 0, 0.1);
  p{
    font-size: 26rpx;
    color: #666
  }
  div{
    width: 120rpx;
    height: 54rpx;
    background-color: #cc9f68;
    border-radius: 6rpx;
    color: #fff
  }
}
.jishi{
  background-color: #fff;
  padding:  0 0 30rpx 0;
  margin-top: 20rpx;
  .tit{
    height: 88rpx;
    font-size: 32rpx;
    font-weight: 900;
    padding:0 30rpx;
    span{
      width: 5rpx;
      height: 28rpx;
      background-color: #ed8077;
      border-radius: 2rpx;
      margin-right: 20rpx
    }
  }
  .jishi-img{
    height: 180rpx;
    width:100%;
    display:flex;
    .item{
      width: 180rpx;
      height: 180rpx;
      margin-left:30rpx;
      &:last-child{
      padding-right:30rpx;
      }
    }
    img{
      width: 180rpx;
      height: 180rpx;
      border-radius: 8rpx;
    }
  }
}
.top-box{
  background-color: #fff;
  .call{
    height: 111rpx;
    padding: 0 30rpx;
    img{
      width: 50rpx;
	    height: 50rpx;
      margin-left: 20rpx
    }
  }
  .top{
  width: 690rpx;
	height: 394rpx;
	background-color: #333333;
	border-radius: 20rpx;
  margin: 30rpx 30rpx 0;
  .pinglun{
    height: 134rpx;
    .thr{
      border-right:none!important
    }
    .flexc{
      div{
        width: 100%;
        border-right: 1rpx solid #fff;
        color: #fff;
        text-align: center;
        font-size: 26rpx;
      }
    }
  }
  .ava{
    height:260rpx ;
    img{
      width: 140rpx;
	    height: 140rpx;
      border-radius: 50%;
      margin-bottom: 10rpx
    }
    p{
      font-size: 30rpx;
	    font-weight: bold;
      color: #ffffff;
      margin-right: 20rpx;
    }
    span{
      // width: 60rpx;
      padding:0 10rpx;
      height: 32rpx;
      background-color: #cc9f68;
      border-radius: 4rpx;
      font-size: 22rpx;
      color: #fff
    }
  }
}
}
.kefu{
    background-color: #fff;
    margin-top: 20rpx;
    height: 98rpx;
    
  }
.info{
  background-color: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
  .tit{
    font-size: 32rpx;
	  font-weight: bold;
  }
  .list{
    margin-left: 20rpx;
    height: 88rpx;
    // border-left: 2rpx solid #cccccc;
    .dian{
      width: 16rpx;
      height: 16rpx;
      border-radius: 50%;
      border: solid 2rpx #cccccc;
      margin-right: 20rpx;
      background-color: #fff;
      position: relative;
      left: -10rpx;
    }
    .text{
      margin-left: 10rpx;
      color: #999
    }
  }
  .line{
    position:relative;
    &:before{
      position:absolute;
      left:-1rpx;
      top:50%;
      width:2rpx;
      height:80rpx;
      content:'';
      display:block;
      background:#cccccc;
    }
    &:last-child{
      &:before{
        width:0;
        height:0;
      }
    }
  }
  
}
.server-box{
  background-color: #fff;
  // margin-top: 20rpx;
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
// .jishi-box{
//   background-color: #fff;
//   padding: 20rpx 30rpx;
//   .jishi{
//     width: 690rpx;
//     height: 200rpx;
//     background-color: #ffffff;
//     box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
//     border-radius: 10rpx;
//     box-sizing: border-box;
//     padding: 0 30rpx;
//     margin-bottom: 20rpx;
//     .right{
//       width: 120rpx;
//       height: 54rpx;
//       background-color: #cc9f68;
//       border-radius: 6rpx;
//       color: #fff;
//     }
//     .left{
//       .ava{
//         width: 120rpx;
// 	      height: 120rpx;
//         border-radius: 50%;
//         margin-right: 20rpx;
//       }
//       .one{
//         p{
//           font-size: 30rpx;
// 	        font-weight: bold;
//         }
//         span{
//           width: 60rpx;
//           height: 32rpx;
//           background-color: #cc9f68;
//           border-radius: 4rpx;
//           font-size: 22rpx;
//           color: #fff;
//           margin-left: 20rpx
//         }
//       }
//       .two{
//         font-size: 22rpx;
//         margin:5rpx 0;
//       }
//       .thr{
//         img{
//           width: 28rpx;
// 	        height: 24rpx;
//         }
//         span{
//           font-size: 22rpx;
//           margin-left: 15rpx;
//         }
//       }
//     }
//   }
// }
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  position: relative;
  border-bottom: 1rpx solid #ededed;
  margin-top: 20rpx;
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
.notData{
  color:#999;
  text-align:center;
}
.rest{
  background-color:#ccc!important;
}
.relative{
  position:relative;
  .workTime{
    position:absolute;
    top:30rpx;
    right:30rpx;
    line-height:1.2;
    background:#e1e1e1;
    padding:0 20rpx;
    border-radius:5rpx;
  }
}
</style>
