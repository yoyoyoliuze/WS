import {host,LoginPath,RegisterPath} from '../utils';
const LoginRequestUrl = "Login/wx_Oauto";//登录接口地址，
const LoginSuccessCode = 0;//登录成功
const LoginNotRegisterCode = 100;//未注册
const LoginfailCode = 1;//登录失败

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
                const code = res.code; //拿到code进行下一步操作
                wx.setStorageSync("wxCode",res.code);//*支付*可能要用到的code
                wx.getUserInfo({
                    lang:'zh_CN',
                    success: function (res) {
                        const userInfo = res.userInfo;
                        ivata = res.iv;
                        encriptData = res.encryptedData;
                        //保存用户信息，userInfo对象里面含有用户昵称，用户头像,性别等信息：
                        wx.setStorageSync("userInfo", userInfo);
                        //userInfo.nickName 用户昵称;
                        //userInfo.avatarUrl 用户头像图片的URL;
                        //userInfo.gender 用户性别
                        if (code) {
                            wx.request({
                                method: "POST",
                                //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
                                url: host + LoginRequestUrl,//请求登录
                                data: {
                                    iv: ivata,
                                    code: code,
                                    encryptedData: encriptData
                                },
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function (res) {
                                    //后台返回的MemberOpenId,可更改标识
                                    if (!res.data || !res.data.data.MemberOpenId) {
                                      wx.showToast({
                                        title: "登录失败！请重新尝试",
                                        icon: "none",
                                        duration: 2000
                                      });
                                      reject();
                                    }
                                    const _res =res.data;
                                    // 设置一些缓存，注册或者支付要使用的，直接在缓存获取
                                    wx.setStorageSync("unionid", _res.data.Unionid);
                                    wx.setStorageSync("openId", _res.data.OpenId);
                                    wx.setStorageSync("wxToken", _res.data.WxToken); //保存的令牌 accessToken
                                    // 登录成功
                                    if (_res.code === LoginSuccessCode) {
                                        wx.setStorageSync("userId", _res.data.UserId); //保存用户Id到本地缓存
                                        wx.setStorageSync("token", _res.data.Token); //保存的令牌 accessToken
                                        // console.log(getApp().userInfoReadyCallback,'getApp().userInfoReadyCallback')
                                        // // 如果自动登录，刷新页面时
                                        // if (getApp().userInfoReadyCallback) {
                                        //   getApp().userInfoReadyCallback()
                                        //   // 执行完成清空匿名函数
                                        //   getApp().userInfoReadyCallback = null
                                        //   wx.showToast({
                                        //     title: "登陆成功！"
                                        //   });
                                        // }else{

                                        // 自动登录不刷新页面时
                                          wx.showToast({
                                            title: "登陆成功！",
                                            icon:"none",
                                            duration:1500
                                          });
                                        // }
                                        // 登录成功执行的方法封装，在index的请求封装，code为2时
                                        params.success&&params.success(res.data)
                                        resolve(res.data);
                                    } else 
                                    //100--没有绑定手机，则跳转到绑定手机的页面--看业务需求
                                    if (_res.code === LoginNotRegisterCode) {
                                        wx.showToast({
                                          title: "请绑定手机号码进行登录！",
                                          icon: "none",
                                          duration: 2000
                                        });
                                        setTimeout(()=>{
                                          // 跳转注册
                                          wx.navigateTo({
                                            url: RegisterPath
                                          });
                                          reject();
                                        },1500)
                                    } else 
                                    // 登录失败
                                    if (_res.code === LoginfailCode) {
                                        wx.showToast({
                                          title: "登录失败！请重新尝试",
                                          icon: "none",
                                          duration: 2000
                                        });
                                        reject();
                                    } 
                                    // 其他
                                    else {
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
                        // backUrl: 0--不跳转,1--后退一页，2--后退2页------未使用
                        //   未授权，跳转授权   
                        wx.navigateTo({
                          url: LoginPath  //可能是自动登录，跳转登录
                        })
                        reject();
                    }
                })

            }
        })
    })
}
