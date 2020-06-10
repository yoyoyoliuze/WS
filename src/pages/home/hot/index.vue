<template>
  <div>
      <div class="searchBox" v-if="searchStatus">
        <div class="left">
          <img src="/static/images/search.png" alt="">
          <input type="text" placeholder="输入要搜索的服务" v-model="keyword">
          <div class="removeInput" v-show="keyword" @click="keyword=''">×</div>
        </div>
        <div class="searchBtn" @click="onSearch">搜索</div>
      </div>
      <div class="classify">
        <scroll-view scroll-x class="nav-scroll" :scroll-into-view="'id'+nowClassifyId" scroll-with-animation>
          <div class="nav-list">
            <div class="item" :id="'id'+item.Id" :class="{'active':item.Id===nowClassifyId}" 
              v-for="(item,index) in classify" :key="index" 
              @click="onClassify(item)">{{item.Name}}</div>
          </div>
        </scroll-view>
        <div class="downArrow" @click="showClassifyWin = true">
          <img src="/static/images/icons/left.png" alt="">
        </div>
        <!-- 导航弹窗 -->
        <div class="nav-scroll-win" v-if="showClassifyWin" @click="showClassifyWin = false">
          <div class="content" @click.stop="on">
            <div class="titles">
              <p>全部分类</p>
              <img src="/static/images/icons/left.png" alt="" @click="showClassifyWin = false">
            </div>
            <div class="list">
              <div class="item" :class="{'active':item.Id===nowClassifyId}"
                v-for="(item,index) in classify" :key="index" @click="onClassify(item)">
                {{item.Name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex bg_fff sort">
          <div class="hot_itl font30" :class="{'active':tabActive==0}" @click="cliTab(0)">默认</div>
          <div class="hot_itl flex flexAlignCenter justifyContentCenter" :class="{'active':tabActive==1}" @click="cliTab(1)">
              <p class="mr_b font30">人气</p>
              <p class="flex flexColumn justifyContentAround">
                  <img :src="tabActive===1&&paixu===2?'/static/images/icons/d2.png':'/static/images/icons/up1.png'" alt="" class="img" :class="{'up2':tabActive===1&&paixu===2}">
                  <img :src="tabActive===1&&paixu===1?'/static/images/icons/d2.png':'/static/images/icons/up1.png'" alt="" class="img mt_b" :class="{'up2':(tabActive===1&&paixu===2)||tabActive!==1}">
              </p>
          </div>
          <div class="hot_itl flex flexAlignCenter justifyContentCenter" :class="{'active':tabActive==2}" @click="cliTab(2)">
              <p class="mr_b font30">价格</p>
              <p class="flex flexColumn justifyContentAround">
                  <img :src="tabActive===2&&paixu===2?'/static/images/icons/d2.png':'/static/images/icons/up1.png'" alt="" class="img" :class="{'up2':tabActive===2&&paixu===2}">
                  <img :src="tabActive===2&&paixu===1?'/static/images/icons/d2.png':'/static/images/icons/up1.png'" alt="" class="img mt_b" :class="{'up2':(tabActive===2&&paixu===2)||tabActive!==2}">
              </p>
          </div>
      </div>
      <div class="mt2 bg_fff hot_list pw3">
          <div class="hot_item p3 flex justifyContentBetween" v-for="(item,index) in list" :key="index"
            @click="goDetail(item)">
              <img :src="item.PicNo" alt="" class="item_m">
              <div class="item_r flex1 flex flexColumn justifyContentBetween">
                  <div>
                      <p class="font30 fb">{{item.Name}}</p>
                      <p class="cg mt1 texts">{{item.Synopsis}}</p>
                      <!-- <span class="item_pill">30分钟</span> -->
                  </div>
                  <div class="flex justifyContentBetween flexAlignCenter">
                      <span class="cr font38">¥{{item.Price}}</span>
                      <span class="font24 cg">{{item.SalesVolume}}人预约</span>
                  </div>
              </div>
          </div>
      </div>
      <p class="list-data" v-if="list.length<1">暂无数据</p>
      <p class="list-data" v-if="isOver&&page!==1">没有更多了</p>

  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  onLoad(options){
    this.keyword = options.keyword||'';
    if(options.keyword){
      this.searchStatus = true;
    }else{
      this.searchStatus = false;
    }
    this.tabActive = 0;
    this.paixu = 0;
    this.getClassify();
  },
  watch: {
    paixu(e){
      console.log('此时排序的值为：'+e)
    }
  },
  data () {
    return {
      tabActive:0,
      paixu:0,//排序，0为不排序，1为升序，2为降序
      page:1,
      pagesize:10,
      classify:[],
      nowClassifyId:'',
      showClassifyWin:false,
      list:[],
      isOver:false,
      keyword:'',
      searchStatus:false,
    }
  },
  methods: {
    getClassify(){
      post('Goods/TypeList',{
        Type:0
      }).then(res=>{
        this.classify = res.data;
        this.nowClassifyId = res.data[0].Id;
        this.getList();
      })
    },
    getList(){
      if(this.paixu==1){
        var xu = 0
      }else if(this.paixu==2){
        var xu = 1
      }else{
        var xu = ''
      }
      post('Goods/GoodsList',{
        Page:this.page,
        PageSize:this.pagesize,
        Sort:this.tabActive,
        Order:xu,
        IsHot:0,
        TypeId:this.nowClassifyId,
        Keywords:this.keyword
      }).then(res=>{
          if(this.page===1){
            this.list =[];
          }
          if(res.data.length <this.pagesize){
            this.isOver = true;
          }
          this.list.push(...res.data)
      })
    },
    // 点击分类
    onClassify(item){
      this.nowClassifyId = item.Id;
      this.showClassifyWin = false;
      this.getList();
    },
    cliTab(index){
      if(index===0){//点击第一个
        this.tabActive = 0,
        this.paixu = 0
      }else if(index===1){//点击第二个
        if(index===this.tabActive){//重复点击
          this.paixu = this.paixu===1?2:1
        }else{//首次点击
          this.tabActive = 1
          this.paixu = 1
        }
      }else if(index===2){//点击第三个
        if(index===this.tabActive){//重复点击
          this.paixu = this.paixu===1?2:1
        }else{//首次点击
          this.tabActive = 2
          this.paixu = 1
        }
      }
      this.isOver=false;
      this.page=1;
      this.list = []
      this.getList()
    },
    switchPath(url){
      wx.navigateTo({
        url
      })
    },
    // 搜索
    onSearch(){
        this.isOver = false;
        this.page = 1;
        this.getList();
    },
    goDetail(item){
      wx.navigateTo({
        url:"/pages/other/serdetail/main?id="+item.Id
      })
    },
    on(){}
    
  },
  //下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.isOver = false;
    this.page = 1;
    this.tabActive=0;
    this.paixu=0;
    this.keyword ='';
    this.getList();
  },
  // 上拉加载
  onReachBottom() {
    if(!this.isOver){
        this.page += 1;
        this.getList();
    }
  },
}
</script>

<style lang='scss' scoped>
.classify{
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  .nav-scroll{
    width:90%;
    height:83rpx;
    .nav-list{
      display:flex;
      align-items:center;
      height:80rpx;
      line-height:80rpx;
      .item{
        flex:0 0 auto;margin-left:30rpx;
        padding:0 7rpx;
          border-bottom:4rpx solid #fff;
        &.active{
          border-bottom:4rpx solid #cc9f68;
        }
      }
    }
  }
  .nav-scroll-win{
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    width:100%;height:100%;
    background:rgba(0,0,0,.5);
    .content{
      background:#fff;
      .titles{
        font-size:30rpx;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 30rpx;
        height:90rpx;line-height:90rpx;
        img{
          width:18rpx;height:35rpx;
          transform:rotate(90deg);
        }
      }
      .list{
        display:flex;
        align-items:center;
        flex-flow:row wrap;
        padding:10rpx 0 30rpx 30rpx;
        .item{
          padding:0 30rpx;
          line-height:2;
          border-radius:5rpx;
          border:1rpx solid #ccc;
          margin-right:30rpx;
          margin-bottom:20rpx;
          &.active{
            border:1rpx solid #cc9f68;
          }
        }
      }
    }
  }
  .downArrow{
    width:9%;
    line-height:100%;
    text-align:center;
    img{
      width:18rpx;height:35rpx;
      transform:rotate(-90deg);
      margin-right:10rpx;
    }
  }
}
.sort{
  padding-top:15rpx;padding-bottom:20rpx;
}
.active{
  color: #cc9f68!important
}
  .hot_itl{
    width:33%;
    text-align:center;
  }
  .img{
    width:20rpx;height:10rpx;
  }
  .mt_b{
    margin-top:5rpx;
  }
  .mr_b{
    margin-right:10rpx;
  }
  .up2{
    transform: rotate(180deg)
  }
  .item_r{
    width:198rpx;
  }
  .item_pill{
    font-size: 22rpx; background: #cc9f68;border:1rpx solid #cc9f68;padding:0 15rpx;border-radius:5rpx;color:#ffffff;margin-right:10rpx;
  }
  .item_m{
    width:240rpx;height:173rpx;margin-right:20rpx;  
  }
  .font38{
    font-size:38rpx;
  }
  .searchBox{
    display:flex;
    align-items:center;
    padding:20rpx 30rpx 0;
    box-sizing:border-box;
    width:100%;
    background:#fff;
    .left{
      background:#f5f5f5;
      border-radius:10rpx;
      padding:0 20rpx;
      width:550rpx;
      height:70rpx;
      display:flex;
      align-items:center;
      img{
        width:40rpx;
        height:40rpx;
      }
      input{
        width:430rpx;
        margin:0 20rpx;
      }
      .removeInput{
        border-radius:50%;
        background:#ccc;
        width:40rpx;
        height:40rpx;
        text-align:center;
        line-height:40rpx;
        color:#fff;
      }
    }
    .searchBtn{
      color:#cc9f68;
      text-align:center;
      width:100rpx;
    }
  }
  .texts{
    width:100%;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
</style>
