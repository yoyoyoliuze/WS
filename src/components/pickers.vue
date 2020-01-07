<template>
  <div class="picker_bb" v-if="show">
    <div class="mask_bot" @click="cancel"></div>
    <div class="pickerBox">
      <div class="head">
        <div class="cancel" @click="cancel">取消</div>
        <div class="ca">{{maskTile}}</div>
        <div class="confirm" @click="success">确认</div>
      </div>
      <picker-view
        indicator-style="height: 50px;"
        style="height:360rpx;"
        @change="onChange"
      >
        <picker-view-column>
          <div
            v-for="(item,index) in arr"
            :key="index"
            style="line-height: 100rpx;width:100%;text-align:center;"
          >{{item.Name}}</div>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "pickers组件封装,单层级选择",
  props: {
    // 展示状态
    show: {
      type: Boolean,
      default: false
    },
    // 可选的数组
    arr: {
      type: Object,
      default: []
    },
    maskTile:{
      type:String,
    },
  },
  data() {
    return {
      //临时改变的值
      value: ""
    };
  },
  onLoad() {
    console.log(this.arr,"affffffff3666565")
   
  },
  methods: {
    //点击确认，返回当前选中的值
    success(e) {
      console.log(this.value,"this.value///////")
      this.$emit("success", this.value);
      this.$emit("update:show", false);
      this.arr = []
    },
    cancel() {
      this.$emit("update:show", false);
      this.arr = []
    },
    // 改变选择的值时
    onChange(e) {
      this.value = this.arr[e.mp.detail.value[0]].Name;
    
    }
  }
};
</script>
<style lang="scss" scoped>
.picker_bb{
  .mask_bot {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index:200;
  }
  .pickerBox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3000;
    background: #ffffff;
  }
  .head {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    color: #999;
    line-height: 80rpx;
    font-size: 30rpx;
    /* border-bottom:1rpx #eee solid; */
  }
  .head div {
    padding: 0 15rpx;
  }
  .confirm {
    color: #3172f5;
  }
}
</style>