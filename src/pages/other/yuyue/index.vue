<template>
  <div>
      <div class="md_card flex flexAlignCenter mt2 bd_border">
          <img :src="artInfo.ArtificerPic" alt="" class="avatar">
          <div>
              <p class="name">{{artInfo.Name}}<span class="md_pill">{{artInfo.LvlName}}</span></p>
              <!-- <p class="font24 cg">前面有3人，约等待60分钟</p> -->
          </div>
      </div>
      <div class="mt2 bg_fff">
          <div class="fb font30 p3 text_center">服务项</div>
          <div class="se_list">
              <div class="se_item"  v-for="(pro, index) in proList" :key="index" v-show="pro.list.length>0">
                  <div class="pp3 flex justifyContentBetween"  @click="pro.status = !pro.status">
                      <p class="fb">{{pro.Name}}({{pro.list.length}})</p>
                      <img src="/static/images/icons/more.png" alt="" class="more" 
                        :style="pro.status?'transform: rotate(90deg);':''">
                  </div>
                  <div class="plr60 item_desc flex flexWrap justifyContentBetween" 
                    v-show="pro.status">
                      <div class="flex flexColumn flexAlignCenter desc_main" 
                        v-for="(item, itemIndex) in pro.list" :key="itemIndex"
                         :style="item.status?'border: solid 4rpx #cc9f68;color:#ff3333;':''"
                          @click="item.status = !item.status"
                        >
                          <img src="/static/images/icons/gou.png" class="gou" alt="" v-show="item.status">
                          <p>{{item.Name}}</p>
                          <p class="font24">（服务时长：{{item.HourNum*60}}分钟）</p>
                          <p class="cr">{{item.Price}}元</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="bg_fff pp3 flex justifyContentBetween yu_btn bt1">
          <div><span class="cr">{{allNum}}</span> 个项目，服务时长<span class="cr">{{totalTime}}分钟</span> </div>
          <div class="btn_next" @click="submit">下一步</div>
      </div>
      
  </div>
</template>

<script>

import '@/style/bb.scss'
import {post} from '@/utils/index'
export default {
  data () {
    return {
        proList:[],
        submitInfo:'',
        artInfo:{},
    }
  },
  onLoad(options){
    this.submitInfo = wx.getStorageSync('submitPro');
    this.setBarTitle();
    this.getClassify();
    this.getArtInfo();
  },
  computed:{
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
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "预约"
        });
    },
    // 获取技师信息
    getArtInfo(){
      post('Shop/GetShopArtificerxq',{
          ArtId:this.submitInfo.artId
      }).then(res=>{
        this.artInfo = res.data;
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
        ShopId:this.submitInfo.shopId
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
    submit(){

      let proId=[];
      this.proList.map(item=>{
          item.list.map(list=>{
            if(list.status){
              proId.push(list.Id)
            }
          })
      })
      if(proId.length<1){
        wx.showToast({
          title:'请选择要预约的项目',
          icon:'none'
        })
        return;
      }
      this.submitInfo.proId = proId.join(',');
      this.submitInfo.time = this.totalTime;
      this.submitInfo.proNum = proId.length;
       wx.setStorageSync('submitPro',this.submitInfo);
        wx.navigateTo({
            url:`/pages/other/apointtime/main`
        })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
.md_card{
    background:#ffffff;
    width:750rpx;height:212rpx;
    padding:0 30rpx;
    box-sizing: border-box;
  }
  .avatar{
    width:120rpx;height:120rpx;border-radius:50%;
    margin-right: 20rpx;
  }
  .name{
    font-size:38rpx;
  }
  .bd_border{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .ch_head{
    padding-bottom:20rpx;
  }
  .ch_title{
    background: #cc9f68;
    border-radius: 15rpx 15rpx 0 0;color:#ffffff;
  }
  .ch_item{
    width:33%;
    text-align: center;
    padding:15rpx 0;
    display: flex;
    color:#999;
    flex-direction: column;align-items: center;justify-content: center;
    border:1rpx solid #f5f5f5;
    &:nth-child(2){
      border:0;
      border-bottom: 1rpx solid #f5f5f5;
    }
  }
  .yu_btn{
    width:100%;position: fixed;bottom: 0;left:0;
    box-sizing: border-box;
  }
  .btn_next{
    color:#ffffff;background: #cc9f68;
    padding:8rpx 20rpx;border-radius: 10rpx;
  }
  .se_item{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .item_desc{
    background: #f5f5f5;padding-bottom:20rpx;
  }
  .desc_main{
    width:275rpx;
    height:150rpx;border-radius: 15rpx;border:4rpx solid #ccc;
    margin-top:20rpx;
    justify-content: center;
    position:relative;
    .gou{
      width:50rpx;
      height:50rpx;
      position:absolute;
      right:-2rpx;
      top:-2rpx;
    }
  }
  .ch_active{
      color:#f00;border:1rpx solid #f00;
    }
  .down{
    width:27rpx;height:15rpx;
  }
  .more{
    width:13rpx;height:24rpx;
  }
  .md_pill{
    color:#ffffff;background: #cc9f68;font-size:22rpx;
    padding:2rpx 15rpx;margin-left:15rpx;border-radius: 5rpx;
  }
  .plr60{
    padding:10rpx 60rpx 20rpx;
  }
  .bt1{
    border-top:1rpx #e8e8e8 solid;
  }
  .se_list{
    margin-bottom:120rpx;
  }
</style>
