<template>
  <div>
      <div class="bg_fff list-box">
        <div class="list ali-c jus-b" v-for="(item, index) in list" :key="index" @click="switchPath(item.url)">
          <span>{{item.title}}</span>
          <div>
            <span class="phone" v-if="index==0">0396-65826</span>
            <img src="/static/images/icons/more.png" alt="">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  
  onShow(){
  },

  data () {
    return {
      info:{},
      list:[
        {title:'客户电话',url:''},
        {title:'用户须知',url:''},
        {title:'用户授权 ',url:''},
        {title:'支付密码 ',url:'/pages/member/setPwd/main'}
      ]
    }
  },
  methods: {
    switchPath(url){
      wx.navigateTo({
        url
      })
    }
    
  },
}
</script>

<style lang='scss' scoped>
.list-box{
  margin-top:20rpx;
  .list{
    height: 88rpx;
    line-height: 88rpx;
    padding:0 30rpx;
    display: flex;justify-content: space-between;align-items: center;
    border-bottom: 1rpx solid #ededed;
    span{
      font-size: 28rpx;
      color: #333
    }
    img{
      width: 11rpx;
      height: 20rpx;
    }
  }
  .phone{
    color:#999999!important;
    font-size:26rpx;margin-right:10rpx;
  }
}
</style>
