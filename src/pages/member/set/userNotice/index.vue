<template>
  <div class="bfff">
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
.bfff{
  background:#fff;
  min-height:100vh;
}
</style>
