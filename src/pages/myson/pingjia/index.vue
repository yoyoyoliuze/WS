<template>
  <div>
      <div class="top-r ali-c" v-if="hasData">
        <img src="/static/images/ava.png" alt="">
        <div>
          <p>服务门店：{{data.ShopData.ShopName}}</p>
          <p>服务项目：{{data.serInfo.serve}}</p>
        </div>
      </div>
      <div class="score ali-c">
        <p>评分</p>
        <div class="flex flexAlignCenter" v-for="(item,index) in emotionList" :key="index" @tap=chose(item)>
          <img src="/static/images/icons/s1.png" alt="" v-if="index==0&&item.Statu==true">
          <img src="/static/images/icons/s4.png" alt="" v-if="index==0&&item.Statu==false">
          <img src="/static/images/icons/s2.png" alt="" v-if="index==1&&item.Statu==true">
          <img src="/static/images/icons/s5.png" alt="" v-if="index==1&&item.Statu==false">
          <img src="/static/images/icons/s3.png" alt="" v-if="index==2&&item.Statu==true">
          <img src="/static/images/icons/s6.png" alt="" v-if="index==2&&item.Statu==false">
          <span>{{index==0?'满意':(index==1?'一般':'不满意')}}</span>
        </div>
        <!-- <div class="flex flexAlignCenter">
          <img src="/static/images/icons/s2.png" alt="">
          <span>一般</span>
        </div>
        <div class="flex flexAlignCenter">
          <img src="/static/images/icons/s3.png" alt="">
          <span>不满意</span>
        </div> -->
        
        <!-- <img src="/static/images/icons/s2.png" alt="">
        <span>一般</span>
        <img src="/static/images/icons/s3.png" alt="">
        <span>不满意</span> -->
      </div>
      <textarea placeholder="填写您对技师的评价~" v-model="ContentText"></textarea>
      <div class="uploadImage clear bg_fff">
        <!-- 上传展示的图片 -->
        <div
          class="upload-img img"
          v-for="(item,index) in imgPathArr"
          :key="index"
        >
          <img :src="item"  style="width:160rpx;height:160rpx;">
          <img src="/static/images/icons/cancle.png" class="close" @click="delImg(index)" alt>
        </div>
        <div
          class="button-upload"
          v-if="isShowBtnUpload"
          @click="upLoadImg"
        >
        <img src="/static/images/icons/add2.png" alt="">
        </div>
      </div>
      <p class="butn flexc" @tap="submit()">提交</p>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      userId:"",
      token:"",
      OrderNo:"",
      data:{},
      ContentText:"",//评价内容 
      Rank:0,//1-不满意 2-一般 3-满意
      PicList:[],
      hasData:false,
      imgPathArr:[],
      imgPathArr2: [],
      picLength:4,
      isShowBtnUpload: true,
      emotionList:[{Id:3,Name:'满意',Statu:true},{Id:2,Name:'一般',Statu:false},{Id:1,Name:'不满意',Statu:false}]
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.OrderNo = this.$mp.query.OrderNo
    // this.getData()
  },
  methods:{
    chose(item){
      this.Rank = item.Id
      this.emotionList.map(item2=>{
        if(item==item2){
            item2.Statu = true
        }else{
            item2.Statu = false
        }
      })
      // console.log(item.Id)
    },
    getData(){
      post('Order/OrderDetails',{
        UserId:this.userId,
        Token:this.token,
        OrderNo:this.OrderNo,
      }).then(res=>{
        let serInfo = {serve:[],total:0}
        this.$set(res.data,"serInfo",serInfo)
        res.data.OrderDetails.map(item2=>{
            serInfo.serve.push(item2.ProductName)
            serInfo.total+=item2.ActualPay
        })
        this.$set(res.data.serInfo,"serve",res.data.serInfo.serve.join(" | "))
        this.data = res.data
        this.hasData = true
        console.log(this.data,"data.ShopData")
      })
    },
    upLoadImg() {
      // console.log(this.imgPathArr.length,this.picLength,"99999")
      let _this = this;
      let num = 0;
      if (this.imgPathArr.length < this.picLength) {
        num = this.picLength - this.imgPathArr.length;
        wx.chooseImage({
          //进入这里面的时候this发生了改变
          count: num,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            console.log(res.tempFilePaths);
            _this.imgPathArr = _this.imgPathArr.concat(res.tempFilePaths);
            if (_this.imgPathArr.length === 4) {
              _this.isShowBtnUpload = false;
            }
            _this.imgPathArr2 = []; //先清空数组
            for (let i = 0; i < _this.imgPathArr.length; i++) {
              let picJson = {};
              wx.getFileSystemManager().readFile({
                filePath: _this.imgPathArr[i], //选择图片返回的相对路径.
                encoding: "base64", //编码格式
                success: res => {
                  //成功的回调
                  let imgBase64Str = "data:image/jpg;base64," + res.data;
                  picJson["PicUrl"] = imgBase64Str;
                  _this.imgPathArr2.push(picJson);
                }
              });
            }
          }
        });
      }
    },
    delImg(index) {
      this.imgPathArr.splice(index, 1);
      this.imgPathArr2.splice(index, 1);
      if (this.imgPathArr.length < 8) {
        this.isShowBtnUpload = true;
      }
    },
    submit(){
      post('Order/OrderArtComment',{
        UserId:this.userId,
        Token:this.token,
        OrderNo:this.OrderNo,
        ContentText:this.ContentText,
        Rank:this.Rank,
        PicList:this.imgPathArr2
      }).then(res=>{
        if(res.code==0){
          wx.showToast({title:"评价成功~"})
          setTimeout(()=>{
            wx.navigateTo({url:'/pages/other/allcomment/main'})
          },1500)
        }
      })
    }

  }
}
</script>

<style scoped lang='scss'>
.butn{
	width: 690rpx;
	height: 88rpx;
	background-color: #cc9f68;
  border-radius: 8rpx;
  color: #fff;
  font-size: 32rpx;
  margin: 100rpx auto
}
.img-box{
  background: #fff;
  padding: 30rpx;
  box-sizing: border-box;
  img{
    width: 152rpx;
    height: 152rpx;
    margin: 0 20rpx 20rpx 0
  }
}
textarea{
  background-color: #fff;
  width: 100vw;
  padding: 30rpx;
  box-sizing: border-box;
}
.score{
  background-color: #fff;
  margin-top: 20rpx;
  border-bottom: 1rpx solid #ededed;
  height: 100rpx;
  padding: 0 30rpx;
  p{
    font-size: 32rpx;
    color: #000;
  }
  img{
    width: 40rpx;
    height: 40rpx;
    margin: 0 16rpx 0 70rpx
  }
}
.top-r{
  background-color: #fff;
  height: 220rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  img{
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
  }
}
//上传图片
.uploadImage {
    display: block;
    padding-left: 30rpx;
    padding-bottom: 20rpx;
    margin-bottom: 20rpx;
    position: relative;
}

.uploadTitle {
    font-size: 30rpx;
    padding: 0 30rpx;
}

.uploadImage .upload-img {
    margin-top: 20rpx;
    margin-right: 20rpx;
}

.uploadImage .upload-img .img {
    width: 100%;
    height: 100%;
}

.uploadImage .upload-img .cancel {
    display: block;
    cursor: pointer;
    position: absolute;
    top: -18rpx;
    right: -18rpx;
    text-align: center;
    color: #bbb;
    z-index: 5;
}

.uploadImage .button-upload,
.uploadImage .upload-img {
    width: 158rpx;
    height: 158rpx;
    float: left;
    position: relative;
    border-radius: 10rpx;
    margin-right: 20rpx;
    margin-top: 20rpx;
}

.uploadImage .button-upload {
    color: #e8e8e8;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* background-position: center center !important;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important; */
}

.uploadImage .button-upload img,
.uploadImage .upload-img img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.uploadImage .close {
    position: absolute;
    width: 40rpx !important;
    height: 40rpx !important;
    top: -10rpx !important;
    right: -10rpx !important;
    z-index: 4 !important;
    left: inherit !important;
}
.clear:after,
.clear:before {
    display: block;
    content: "";
    clear: both;
}
</style>
