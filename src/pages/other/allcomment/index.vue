<template>
  <div>
     <div class="bg_fff pw3 flex flexWrap all_title">
        <p class="item_col active"><span>全部</span><span>(523)</span></p>
        <p class="item_col"><span>有图</span><span>(523)</span></p>
        <p class="item_col"><span>满意</span><span>(523)</span></p>
        <p class="item_col"><span>一般</span><span>(523)</span></p>
        <p class="item_col"><span>不满意</span><span>(523)</span></p>
     </div>
     <div class="mt2 pw3 bg_fff">
        <div class="p3 flex coll_item">
            <div class="ava_box justifyContentBetween">
                <img src="/static/images/ava.png" alt="" class="ava">
            </div>
            <div class="flex1">
                <div class="flex justifyContentBetween">
                    <p><span class="fb">Franke</span><span class="font24 cg">(13553265236)</span></p>
                    <p class="tag_lo">
                        <img src="/static/images/icons/s1.png" alt="" class="ss">
                        <img src="/static/images/icons/s3.png" alt="" class="ss" style="display:none">
                        <span class="col_tag">满意</span>
                    </p>
                </div>
                <div>美甲做的很好看，而且很实话，物美价廉的感 觉，很喜欢。</div>
                <div class="cg font24 flex justifyContentBetween mt1">
                  <p>技师：Alisa</p>
                  <p>2019-11-21</p>
                </div>
            </div>
        </div>
        <div class="p3 flex coll_item">
            <div class="ava_box justifyContentBetween">
                <img src="/static/images/ava.png" alt="" class="ava">
            </div>
            <div class="flex1">
                <div class="flex justifyContentBetween">
                    <p><span class="fb">Franke</span><span class="font24 cg">(13553265236)</span></p>
                    <p class="tag_lo">
                        <img src="/static/images/icons/s2.png" alt="" class="ss">
                        <span class="col_tag">一般</span>
                    </p>
                </div>
                <div>美甲做的很好看，而且很实话，物美价廉的感 觉，很喜欢。</div>
                <div class="cg font24 flex justifyContentBetween mt1">
                  <p>技师：Alisa</p>
                  <p>2019-11-21</p>
                </div>
            </div>
        </div>
     </div>
      
  </div>
</template>

<script>

import '@/style/bb.scss'

export default {
  data () {
    return {
      
    }
  },
  onShow(){
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
  },

  created () {
    // let app = getApp()
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
</style>
