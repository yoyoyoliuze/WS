<template>
  <div>
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="list jus-b">
        <div class="left">
          <p>满100元减20元券</p>
          <span>有效期至2020-01-12</span>
          <div class="flexc use">减满券</div>
        </div>
        <div class="right flexc">
          <div>
            <p>20<span>元</span></p>
            <span>满100可使用</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      tabList:['未使用','已使用','已失效'],
      tabIndex:0,
      
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    cliServer(index){
      this.serverIndex = index
    },
    cliTab(index){
      this.tabIndex = index
    },
  },
}
</script>

<style scoped lang='scss'>
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20rpx;
  left: 450rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20rpx;
  left: 450rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690rpx;
  height: 180rpx;
  border-radius: 15rpx;
  margin: 30rpx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .use{
    background-color: #d4d5d6!important
  }
  .left{
    width: 460rpx;
    padding: 60rpx 0 0 35rpx;
    position: relative;
    span{
      font-size: 20rpx;
      color: #999;
    }
    div{
      width: 128rpx;
	    height: 40rpx;
	    background-color: #cc9f68;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24rpx;
      color: #fff
    }
  }
  .right{
    width: 230rpx;
    background-color: #cc9f68;
    text-align: center;
    p{
      color: #fff;
      font-size: 56rpx;
      font-weight: 900;
      span{
        font-size: 20rpx
      }
    }
    span{
      font-size: 20rpx;
      color: #fff;
    }
  }
}
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  position: relative;
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

</style>
