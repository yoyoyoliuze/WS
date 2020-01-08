<template>
  <div class="bfff">
      <div class="list">
        <div class="item " :class="{'active':item.active}" 
          v-for="(item,index) in data" :key="index"
          @click="onClick(index)"
         >
            <div class="tit">星期{{item.title}}</div>
            <p>{{item.value}}</p>
            <img v-if="item.active" src="/static/images/icons/gou.png" alt="">
        </div>
      </div>
      <div  class="bg_fff pp3 flex justifyContentBetween">
          <div><span class="cr">1</span> 个项目，服务时长<span class="cr">{{time}}分钟</span> </div>
          <div class="btn_next" @click="submit">下一步</div>
      </div>
  </div>
</template>

<script>
import '@/style/bb.scss';
import {post} from '@/utils/index';
export default {

  data () {
    return {
      shopID:'',
      time:0,//服务时间
      proNum:1,
      data:[]
    }
  },
  onLoad(options){
    this.shopID = options.shopID;
    this.time = options.time||0;//服务时间
    this.proNum = options.proNum||1;//服务时间
    this.getData();
  },
  methods:{
    getData(){
      post('Order/TakeOutMake',{ShopId:this.shopID}).then(res=>{
        const list = res.data.datelist;
        list.map(item=>{
          const title = item.value.replace(/-/g,'/');
          switch(new Date(title).getDay()){
            case 0:
              item.title ='日';
              break;
            case 1:
              item.title ='一';
              break;
            case 2:
              item.title ='二';
              break;
            case 3:
              item.title ='三';
              break;
            case 4:
              item.title ='四';
              break;
            case 5:
              item.title ='五';
              break;
            case 6:
              item.title ='六';
              break;
          }
          item.active = false;
        })
        list[0].active = true;
        this.data = list;
      })
    },
    onClick(index){
      this.data.map((item,i)=>{
        if(i!==index){
           item.active = false;
        }else{
           item.active = true;
        }
      })
    },
    submit(){
      this.data.map((item,i)=>{
        if(item.active === true){
           wx.navigateTo({
             url:`/pages/other/yusuccess/main?shopID=${this.shopID}&date=${item.value}&getDay=${item.title}`
           })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  .ti_item{
    width:33%;color:#cc9f68;
    border-right:1rpx solid #f5f5f5;
    text-align:center;
    &:last-child{border:0}
  }
  .time_item{
    border-radius: 15rpx;margin-bottom:20rpx;
  }
  .time_bor{
    span{
      width:22%;text-align: center;margin-top:20rpx;margin-right:20rpx;
      border:1rpx solid #f5f5f5;border-radius: 30rpx;
      height:60rpx;line-height:60rpx;
      &:nth-child(4n){margin-right:0}
    }
    .active1{
      background: #cc9f68;border:0;color:#ffffff
    }
    .active2{
      background: #f5f5f5;border:0
    }
  }
  .btn_next{
    color:#ffffff;background: #cc9f68;
    padding:8rpx 20rpx;border-radius: 10rpx;
  }
  .bfff{
    background:#fff;
    height:100vh;
  }
  .justifyContentBetween{
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    box-sizing:border-box;
    border-top:#f2f2f2 1rpx solid;
  }
  .list{
    border-top:20rpx #f2f2f2 solid;
    padding:50rpx 100rpx 100rpx;
    .item{
      line-height:2;
      padding:30rpx 0;
      text-align:center;
      margin-bottom:40rpx;
      border:3rpx #ccc solid;
      color:#999;
      position:relative;
      .tit{
      color:#999;
      }
      img{
        position:absolute;
        right:-1rpx;
        top:-2rpx;
        width:69rpx;
        height:67rpx;
      }
      &.active{
        border:3rpx #cc9f68 solid;
        color:#cc9f68;
        div{
          color:#cc9f68;
        }
      }
    }
  }
</style>
