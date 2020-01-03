<template>
  <div>
      <div class="flex bg_fff p3">
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
          <div class="hot_item p3 flex justifyContentBetween" v-for="(item,index) in list" :key="index">
              <img :src="item.PicNo" alt="" class="item_m">
              <div class="item_r flex1 flex flexColumn justifyContentBetween">
                  <div>
                      <p class="font30 fb">{{item.Name}}</p>
                      <p class="cg mt1">{{item.Synopsis}}</p>
                      <!-- <span class="item_pill">30分钟</span> -->
                  </div>
                  <div class="flex justifyContentBetween flexAlignCenter">
                      <span class="cr font38">¥{{item.Price}}</span>
                      <span class="font24 cg">{{item.SalesVolume}}人预约</span>
                  </div>
              </div>
          </div>
      </div>
      <p class="list-data" v-if="isHaveData">暂无数据</p>
      <p class="list-data" v-if="isOver">没有更多了</p>

  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  onShow(){
    this.tabActive = 0
    this.paixu = 0
    this.getList()
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
      pagesize:12,
      list:[],
      isHaveData:false,
      isOver:false
    }
  },
  methods: {
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
        IsHot:1
      }).then(res=>{
        if(res.code==0){
          this.list.push(...res.data)
          if(this.list.length == 0){
            this.isHaveData = true
          }
          if(!this.isHaveData&&res.data.length!=this.pagesize){
            this.isOver = true
          }
        }
      })
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
      this.list = []
      this.getList()
    },
    switchPath(url){
      wx.navigateTo({
        url
      })
    }
    
  },
}
</script>

<style lang='scss' scoped>
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
</style>
