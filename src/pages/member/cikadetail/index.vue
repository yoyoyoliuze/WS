<template>
  <div>
      <div class="mt2 pp3 bg_fff">
          <div class="font24 fb">详情介绍</div>
          <div>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">所属门店：{{data.ShopName}}</span>
              </p>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">项目类型：{{data.ProTypeName}}</span>
              </p>
          </div>
      </div>
      <div class="mt2 pp3 bg_fff">
          <div class="font24 fb">次卡说明</div>
          <div>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">次卡名称：{{data.Name}}</span>
              </p>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">次卡面额：{{data.Denomination}}元</span>
              </p>
              <p class="flex mt2 flexAlignCenter">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">可做次数：{{data.CardNum}}次</span>
              </p>
          </div>
      </div>
      <div class="mt2 pp3 bg_fff">
          <div class="font24 fb">使用说明</div>
          <div>
              <p class="flex mt2 flexAlignCenter" v-for="(item,index) in data.contentArr" :key="index">
                  <i class="bo_cc"></i>
                  <span class="mr1 font24">{{item}}</span>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      Id:0,
      data:{}
      
    }
  },
  onShow(){
    this.Id = this.$mp.query.id
    this.getData()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    getData(){
      post('Coupon/VipCardxq',{
        Id:this.Id
      }).then(res=>{
        const contentArr = res.data.UseExplain.split(/\n|\r|\t/);
        let arr =[];
        contentArr.map(item=>{
          if(item){
            arr.push(item);
          }
        })
        res.data.contentArr = arr;
        this.data = res.data;
      })
    }
  },
}
</script>

<style scoped lang='scss'>

.cc_item{
  margin-top:20rpx;
  height:200rpx;
  position: relative;
  .cc_img{
    width:690rpx;height:200rpx;
  }
  .cc_main{
    position: absolute;color:#ffffff;
    top:30rpx;left:30rpx;right:30rpx
  }
  .cc_right{
    width:65%;
  }
  .cc_use{
    background: #cc9f68;color:#ffffff;
    padding:5rpx 20rpx;border-radius:5rpx;
    &.active{
      background: #cccccc;
    }
  }
}
.bo_cc{
  width:10rpx;height: 10rpx;
  border-radius:50%;background: #1a1a1a;flex: 0 0 auto;
}

</style>
