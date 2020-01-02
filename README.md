# project-init

> 项目初始化

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my
```
## 颜色
主颜色 #cc9f68
## 依赖
"mpvue": "^2.0.0",
"node-sass": "^4.13.0",
"sass-loader": "^6.0.7",
"vuex": "^3.0.1"

## 要点说明
接口封装了如果未登录则跳转登录页面。如果已登录，登录过期执行重新登录
### 接口请求，如登录过期重新登录并刷新页面
- #### 使用方法：

    @/utils/index.js目录，封装post()和get()方法。
    
    post('接口地址',data={},'登录执行的方法')
    
    ```
    async getData(){
        const res = await post('User/GetMemberInfo',{
            UserId:wx.getStorageSync('userId'),
            Token:wx.getStorageSync('token')
        },this.getData)
        this.data = res.data
    }
    ```
- #### 如需要自动重新登录并刷新数据（建议在tabBar使用自动登录刷新页面，而其他页面跳转登录页）：

    - 接口请求应该在请求时去缓存拿token和userId，而不应该在onShow进行赋值页面常量。

    //wx.getStorageSync('token') or //wx.getStorageSync('userId')

    - 一个页面加载时，需要多次使用到带用户登录信息的请求，应该先用一个，其他的等返回后再执行请求。
    （如果存在同时进行多个用户信息错误的请求，会自动登录多次。刷新页面数据可能会发生不可预料的bug

- #### 不需要自动重新登录刷新的页面。

     可以在onLoad进行token和UserId的赋值，和初始化请求。如果登录失败自动重新登录，手动进行页面刷新就可以了
