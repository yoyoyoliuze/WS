<template>
  <div>
      <div v-html="content">
      </div>
  </div>
</template>

<script>
import {post} from '@/utils/index';
import '@/style/bb.scss'

export default {
  // 'UserNotice' =用户须知;UserAuth=用户授权
  onLoad(options){
    this.type =options.type
    this.getData();
  },

  data () {
    return {
      type:'',
      content:''
    }
  },
  methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "全部评价"
        });
    },
    getData(){
      post('User/WebSysConfig').then(res=>{
        this.content = res.data[this.type].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
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
