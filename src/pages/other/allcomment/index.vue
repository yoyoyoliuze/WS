<template>
  <div>
     <div class="bg_fff pw3 flex flexWrap all_title">
        <p class="item_col" :class="{'active':type===0}" @click="onTabs(0)"><span>全部</span><span>({{comment.CommentCount}})</span></p>
        <p class="item_col" :class="{'active':type===1}" @click="onTabs(1)"><span>有图</span><span>({{comment.PicNum}})</span></p>
        <p class="item_col" :class="{'active':type===2}" @click="onTabs(2)"><span>满意</span><span>({{comment.TallNum}})</span></p>
        <p class="item_col" :class="{'active':type===3}" @click="onTabs(3)"><span>一般</span><span>({{comment.HitNum}})</span></p>
        <p class="item_col" :class="{'active':type===4}" @click="onTabs(4)"><span>不满意</span><span>({{comment.LowNum}})</span></p>
     </div>
     <div class="mt2 pw3 bg_fff">
        <div class="p3 flex coll_item" v-for="(item,index) in commentList" :key="index">
            <div class="ava_box justifyContentBetween">
                <img :src="item.Avatar" alt="" class="ava">
            </div>
            <div class="flex1">
                <div class="flex justifyContentBetween">
                    <p><span class="fb">{{item.NickName}}</span><span class="font24 cg">({{item.Mobile}})</span></p>
                    <p class="tag_lo">
                        <img v-if="item.Rank==3" src="/static/images/icons/s1.png" alt="" class="ss">
                        <img v-if="item.Rank==2" src="/static/images/icons/s2.png" alt="" class="ss">
                        <img v-if="item.Rank==1" src="/static/images/icons/s3.png" alt="" class="ss">
                        <span class="col_tag">{{item.Rank==1?'不满意':item.Rank==2?'一般':'满意'}}</span>
                    </p>
                </div>
                <div class="text">{{item.ContentText}}</div>
                <div class="imgList">
                  <img :src="imgItem.PicUrl" alt="" 
                    v-for="(imgItem,imgIndex) in item.PicData" :key="imgIndex" 
                    v-show="imgItem&&imgItem.PicUrl"
                    @click="previewImage(item.PicData,imgIndex)"
                    >
                </div>
                <div class="cg font24 flex justifyContentBetween mt1">
                  <p>技师：{{item.ArtName}}</p>
                  <p>{{item.AddTime}}</p>
                </div>
            </div>
        </div>
     </div>
      <div class="notData" v-if="commentList.length<1">暂无数据</div>
      <div class="notData" v-if="notData&&page!=1">已经到底了</div>
      
  </div>
</template>

<script>

import '@/style/bb.scss';
import {post,previewImg} from "@/utils/index";
export default {
  data () {
    return {
      shopId:'',
      artId:'',
      comment:{},
      commentList:[],
      type:0,
      page:1,
      pageSize:12,
      notData:false,
    }
  },
  onLoad(options){
    this.shopId = options.shopId||'';
    this.artId = options.artId||'';
    this.page=1;
    this.notData = false;
    this.getComment();
    this.getCommentList();
    this.setBarTitle()
  },
  components: {
   
  },

  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "全部评价"
        });
    },
    getComment(){
      post('Order/OrderCommentHz',{
        ArtId:this.artId,
        ShopId:this.shopId
      }).then(res=>{
        this.comment = res.data;
      })
    },
    getCommentList(){
      post('Order/OrderCommentList',{
        ArtId:this.artId,
        ShopId:this.shopId,
        Type:this.type,
        Page:this.page,
        PageSize:this.pageSize,
      }).then(res=>{
        if(this.page===1){
          this.commentList = [];
          this.notData = false;
        }
        const data = res.data;
        this.commentList.push(...res.data);
        if(data.length<this.pageSize){
          this.notData = true;
        }
      })
    },
    // 切换分类
    onTabs(type){
      this.type = type;
      this.page=1;
      this.getCommentList()
    },
    // 预览图片
    previewImage(imgArr,index){
      let arr = [];
      imgArr.map(item=>{
        arr.push(item.PicUrl)
      })
      previewImg(arr,index)
    }
  },
  onPullDownRefresh(){
    this.page=1;
    this.notData = false;
    this.getComment();
    this.getCommentList();
    wx.stopPullDownRefresh();
  },
  onReachBottom(){
    if(!this.notData){
      this.page+=1;
      this.getCommentList();
    }
  }
}
</script>

<style lang="scss">
  .item_col{
    width:22%;justify-content: center;
    padding:5rpx 0rpx;border:1rpx solid #f5f5f5;
    display: flex;
    margin-right:20rpx;margin-top:20rpx;
    font-size:24rpx;
    &:nth-child(4n){
      margin-right:0;
    }
  }
  .active{
    color:#ffffff;background: #cc9f68;border:0
  }
  .all_title{
    padding-bottom:20rpx;
  }
  .ava_box{
    width:15%;
  }
  .ava{
    width:80rpx;height:80rpx;border-radius: 50%
  }
  .ss{
    width:40rpx;height:40rpx;
    z-index:50;
  }
  .coll_item{
    border-bottom: 1rpx solid #f5f5f5;
    &:last-child{border:0}
  }
  .tag_lo{
    display: flex;align-items:center;
    .col_tag{
      background: #ececec;font-size:22rpx;color:#c3c3c3;
      text-align: right;
      padding:2rpx 20rpx;
      margin-left:-10rpx;
      border-radius:0 15rpx 15rpx 0;
    }
  }
  .notData{
    color:#999;
    text-align:center;
    line-height:3;
  }
  .imgList{
    margin-top:15rpx;
    img{
      width:125rpx;
      height:125rpx;
      margin-right:20rpx;
      border-radius:7rpx;
    }
  }
  .text{
      overflow-wrap: break-word;
  }
</style>
