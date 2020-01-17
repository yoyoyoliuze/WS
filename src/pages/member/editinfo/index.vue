<template>
  <div @touchstart="showtextarea=false">
      <div class="list-box bg_fff">
        <div class="ava_list">
          <span>头像</span>
          <div class="avatar" @click="uplLoadAva">
              <img :src="Avatar" alt="" class="img">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>昵称</span>
          <div class="flex flexAlignCenter" @tap="changeNickName">
            <input type="text" placeholder="请输入" class="flex1 text_right" disabled v-model="UserNick">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>真实姓名</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" class="flex1 text_right" v-model="UserRName">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>手机号</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" class="flex1 text_right" v-model="mobile">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>性别</span>
          <div class="flex flexAlignCenter" @tap="changeSex">
            <input type="text" placeholder="请选择" disabled class="flex1 text_right" v-model="Sex">
            <img src="/static/images/icons/more.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>生日</span>
          <div class="flex flexAlignCenter" @tap="showDate = true">
            <input type="text" placeholder="请选择" disabled class="flex1 text_right" v-model="Birthday">
            <img src="/static/images/icons/more.png" alt="">
          </div>
        </div>
        <div class="pp3" >
          <span>服务简介</span>
          <div class="mt2">
              <!-- <p v-if="!showtextarea" class="text_fl" @tap="showtextarea=true" :class="Remark.length>0?'colorBlack':'colorPlace'">{{Remark||'请输入您的服务简介'}}</p> -->
              <textarea class="text_fl" name="" auto-focus adjust-position="true" id="" maxlength="100" cols="30" rows="10" placeholder="请输入您的服务简介" 
                v-model="Remark">
              </textarea>
              <div class="text_right">{{Remark.length}}/100</div>
          </div>
        </div>
      </div>
      <div class="btn" @tap="saveInfo">保存</div>
      <div class="mask" v-if="showNick"></div>
      <div class="nickName_mask" v-if="showNick">
          <div class="p3 text_center fb font30">填写昵称</div>
          <input type="text" v-model="UserNickCopy" class="text_iin">
          <div class="flex mask_mbtn">
              <p @tap="showNick=false">取消</p>
              <p class="btn_ccc" @tap="confirmNick">确定</p>
          </div>
      </div>
      <!--性别-->
      <Pickers :arr="arrlist" :maskTile="maskTile" :show.sync="showMask" @success="onCommission" v-if="arrlist&&arrlist.length>0"></Pickers>

      <!--时 间弹层-->
      <van-action-sheet :show="showDate" @close="showDate=false" @select="showDate=false">
          <van-datetime-picker
          type="date"
          :value="currentDate"
          @confirm="confirmDate($event)"
          @cancel="showDate=false"
          :min-date="minDate"
          title="选择生日"
          />
      </van-action-sheet> 
  </div>
</template>

<script>
import '@/style/bb.scss'
import {post} from '@/utils'
import Pickers from '@/components/pickers.vue'
export default {
  data () {
    return {
      Avatar:"",
      AvatarwBase:"",//头像
      ShowBase:false,//上传头像不从默认获取
      showNick:false,//修改昵称弹层
      showMask:false,//性别选择
      showDate:false,//生日
      UserNickCopy:"",//昵称弹窗
      showtextarea:false,//是否展示textarea
      UserNick:"",
      UserRName:"",
      Birthday:"",
      Remark:"",
      Sex:0,//0保密 1-女 2-男
      mobile:"",
      userId:"",
      token:"",
      arrlist:[],
      currentDate: new Date().getTime(),
      minDate: new Date().setFullYear(1600,0,1),
    }
  },
  components: {
    Pickers
  },
  onLoad(){
    this.initData()
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.getMemberInfo()
  },
  methods: {
    switchPath(url){
      wx.navigateTo({
        url
      })
    },
    initData(){
      this.ShowBase = false
      this.UserRName = ''
      this.arrlist=[{Id:0,Name:"保密"},{Id:1,Name:"女"},{Id:2,Name:"男"}]
    },
    getMemberInfo(){
      post('User/GetMemInfo',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        if(res.code==0){
          if(!this.ShowBase){
             this.Avatar = res.data.Avatar
            // console.log(this.ShowBase,"2222")
          }
          this.Birthday = res.data.Birthday
          this.mobile = res.data.Mobile
          this.UserNick = res.data.NickName
          this.UserRName = res.data.UserRName
          if(res.data.Sex===0){
              this.Sex = '保密'
          }else if(res.data.Sex===1){
              this.Sex = '女'
          }else{
              this.Sex = '男'
          }

        }
      })
    },
    //上传头像
    uplLoadAva(){
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) =>{
          // tempFilePath可以作为img标签的src属性显示图片
          this.Avatar = res.tempFilePaths[0]
          this.ShowBase = true
          console.log(this.ShowBase,"选择头像")
          wx.getFileSystemManager().readFile({
              filePath: this.Avatar, //选择图片返回的相对路径
              encoding: "base64", //编码格式
              success: res => {
                //成功的回调
                this.AvatarwBase = "data:image/png;base64," + res.data.toString();
                this.changeAvatar()
                console.log(this.AvatarwBase.length, "选择图像的路径");
              }
            });
        }
      })
    },
    changeAvatar(){
      post('User/UploadPhoto',{
        Avatar:this.AvatarwBase,
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        if(res.code==0){
          wx.showToast({title:"头像修改成功！"})
        }
      })
    },
    changeNickName(){
      this.showNick = true
      this.UserNickCopy = this.UserNick
    },
    confirmNick(){
      post('User/EditUserNick',{
        UserNick:this.UserNickCopy,
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        if(res.code==0){
          wx.showToast({title:"昵称修改成功！"})
          setTimeout(()=>{
            this.UserNick = this.UserNickCopy
            this.showNick = false
          },1500)
        }
      })
    },
    onCommission(value){
      this.Sex = value
    },
    changeSex(){
      this.showMask = true
      this.maskTile="请选择性别"
    },
    //选择生日
    confirmDate(e){  //选择成立日期的点击确定
      let dd = new Date(e.mp.detail);
      let year = dd.getFullYear();
      let month = dd.getMonth()+1;
      let day = dd.getDate();
      month = month < 10 ? '0'+month : month;
      day = day < 10 ? '0'+day : day;
      this.Birthday = year+"-"+month+"-"+day
      this.currentDate = dd.getTime();
      this.showDate = false;
      this.showtextarea=true;
    },
    //保存编辑信息
    saveInfo(){
      post('User/EditUserInfo',{
        UserId:this.userId,
        Token:this.token,
        UserRName:this.UserRName,
        Birthday:this.Birthday,
        Sex:this.Sex=='保密'?'0':(this.Sex=='女'?1:2)
      }).then(res=>{
        if(res.code==0){
          wx.showToast({title:'保存成功！'})
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
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
  }
  .ava_list{
    display: flex;justify-content: space-between;align-items: center;
    border-bottom: 1rpx solid #ededed;padding:0 30rpx;
    height:180rpx;
  }
  .phone{
    color:#999999!important;
    font-size:26rpx;margin-right:10rpx;
  }
  .list_img{
    span{
      font-size: 28rpx;
      color: #333
    }
    img{
      width: 11rpx;
      height: 20rpx;
      margin-left:10rpx;
    }
    input{width:100%;}
    .flexAlignCenter{
      width:50%;
    }
  }
}
.avatar{
  height:120rpx;width:120rpx;
  border-radius:50%;
  .img{
    width:120rpx;height:120rpx;border-radius:50%;
  }
}
.text_fl{
  height:200rpx;
  width:100%;
}
.btn{
  background: #cdaa79;
  height:80rpx;height:80rpx;line-height: 80rpx;width:690rpx;margin: 0 auto;color:#ffffff;border-radius: 15rpx;
  margin-top:50rpx;
}
.nickName_mask{
  height:320rpx;width:690rpx;
  position: fixed;top:250rpx;left:30rpx;right:30rpx;
  background: #ffffff;z-index:100;border-radius:10rpx;
  box-sizing: border-box;
  padding:0 30rpx;
  .text_iin{
    border:1rpx solid #f5f5f5;
    height:70rpx;padding:0 10rpx;
  }
  .mask_mbtn{
    position: fixed;top:430rpx;width:690rpx;left:30rpx;
    z-index:200;
    margin-top:50rpx;
    border-top:1rpx solid #f5f5f5;
    line-height: 85rpx;
    justify-content: space-between;text-align:center;
    p{
      height:80rpx;width:50%;
    }
    .btn_ccc{
      color:#cdaa79;border-left:1rpx solid #f5f5f5;
    }
  }
}
.colorBlack{
    color:#1a1a1a;
  }
  .colorPlace{
    color:#a5a4a4;
  }
</style>
