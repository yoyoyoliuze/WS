import {
  host
} from '../utils'
// params = { success:成功执行的方法}
export default function logins(params) {
  return new Promise((resolve,reject)=>{
    let ivata = "";
    let encriptData = "";
    wx.showLoading({
      title: "登陆中..."
    });
    //用户授权登陆，code发送给服务器
    wx.login({
      success: function (res) {
        const code = res.code; //腾讯服务器返回res,拿到code进行下一步操作
        wx.setStorageSync("wxCode",res.code);
        wx.getUserInfo({
          lang:'zh_CN',
          success: function (res) {
            const userInfo = res.userInfo;
            ivata = res.iv;
            encriptData = res.encryptedData;
            //保存用户信息，userInfo对象里面含有用户昵称，用户头像,性别等信息：
            wx.setStorageSync("userInfo", userInfo);
            var BuserId=wx.getStorageSync("BuserId");
            //userInfo.nickName 用户昵称;
            //userInfo.avatarUrl 用户头像图片的URL;
            //userInfo.gender 用户性别
            if (code) {
              wx.request({
                method: "POST",
                //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
                url: host + "Login/wx_Oauto",
                data: {
                  iv: ivata,
                  code: code,
                  encryptedData: encriptData,
                  userId:BuserId,
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  if (!res.data || !res.data.data.MemberOpenId) {
                    wx.showToast({
                      title: "登录失败！请重新尝试",
                      icon: "none",
                      duration: 2000
                    });
                    reject();
                  }
                  const _res =res.data;
                  wx.setStorageSync("unionid", _res.data.Unionid);
                  wx.setStorageSync("openId", _res.data.OpenId);
                  wx.setStorageSync("wxToken", _res.data.WxToken); //保存的令牌 accessToken

                  if (_res.code === 0) {
                    wx.setStorageSync("userId", _res.data.UserId); //保存用户Id到本地缓存
                    wx.setStorageSync("token", _res.data.Token); //保存的令牌 accessToken
                    console.log(getApp().userInfoReadyCallback,'getApp().userInfoReadyCallback')
                    // 如果自动登录，刷新页面时
                    if (getApp().userInfoReadyCallback) {
                      getApp().userInfoReadyCallback()
                      // 执行完成清空匿名函数
                      getApp().userInfoReadyCallback = null
                      wx.showToast({
                        title: "登陆成功！"
                      });
                    }else{
                    // 自动登录不刷新页面时
                      wx.showToast({
                        title: "登陆成功！请刷新页面",
                        icon:"none",
                        duration:1500
                      });
                    }
                    // 登录成功执行的方法封装
                    params.success&&params.success(res.data)
                    resolve(res.data);
                    //登陆成功之后,延时2秒跳转到会员中心,或者返回上一层
                    // setTimeout(function () {
                      // console.log(goUrl, 'goUrl')
                      // if(typeof(goUrl)==='string'){
                      //   wx.switchTab({
                      //       url: goUrl,
                      //   })
                      // }else{
                      // wx.navigateBack()
                      // }
                    // }, 1500);
                  } else if (_res.code === 100) {
                    //没有绑定手机，则跳转到绑定手机的页面
                    wx.showToast({
                      title: "请绑定手机号码进行登录！",
                      icon: "none",
                      duration: 2000
                    });
                    setTimeout(()=>{
                      wx.navigateTo({
                        url: "/pages/login/register/main"
                      });
                      reject();
                    },1500)
                  } else {
                    wx.showToast({
                      title: "登录失败！请重新尝试",
                      icon: "none",
                      duration: 2000
                    });
                    reject();
                  }
                },
                fail: function (error) {
                  wx.showToast({
                    title: "登录失败！请重新尝试",
                    icon: "none",
                    duration: 2000
                  });
                  reject();
                },
                complete: function () {
                  wx.hideLoading();
                }
              });
            } else {
              wx.hideLoading();
              wx.showToast({
                title: "获取授权信息失败",
                icon: "none",
                duration: 2000
              });
              reject();
            }
          },
          fail() {
            console.log("未授权", this);
            // backUrl: 0--不跳转,1--后退一页，2--后退2页
            //   未授权，跳转授权   
            wx.navigateTo({
              url: '/pages/login/main'
            })
            reject();
          }
        })

      }
    })
  })
}
