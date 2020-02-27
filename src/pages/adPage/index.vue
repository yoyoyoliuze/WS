<template>
  <div>
    <swiper class="swiper-box" autoplay interval='2000' circular>
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <img  :src="item.Logo" alt="">
      </swiper-item>
    </swiper>
    <div class="close" @click="onClose">{{time}}秒后关闭</div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
        bannerList:[],
        time:5,
        timeout:null,
        status:false,
    }
  },
  onLoad(){
    if(this.status){
      wx.switchTab({
        url:'/pages/index/main'
      })
    }else{
      this.getData();
    }
  },
  methods:{
    getData(){
      post('Banner/HomePicList',{}).then(res=>{
        this.bannerList = res.data;
        this.timeout = setInterval(()=>{
          if(this.time){
            this.time-=1;
          }else{
            this.onClose();
          }
        },1000)
      })
    },
    onClose(){
      this.status=true;
      clearInterval(this.timeout)
      wx.switchTab({
        url:'/pages/index/main'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.swiper-box{
  height:100vh;
  width:100%;
  img{
    height:100%;
    width:100%;
  }
}
.close{
  position:fixed;
  top:40rpx;
  right:30rpx;
  padding:0 20rpx;
  line-height:2;
  background:rgba(0,0,0,.4);
  color:#fff;
  border-radius:40rpx;
}
</style>
