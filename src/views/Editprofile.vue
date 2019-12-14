<template>
  <div class="edit">
    <topheard topt='编辑个人资料'>
      <span slot="left" class="iconfont iconjiantou2 fanhui" @click="fback">返回</span>
      <span slot="right">退出</span>
    </topheard>
    <div class="head">
        <img src="http://localhost:3000/uploads/image/IMG1569382889487.png" alt="">
        <van-uploader :after-read="afterRead" />
      </div>
      <mycell title="昵称" dis="关注的用户"></mycell>
      <mycell title="密码" dis="关注的用户"></mycell>
      <mycell title="性别" dis="关注的用户"></mycell>
  </div>
</template>

<script>
import topheard from '../components/topheard.vue'
import mycell from '@/components/mycell.vue'
export default {
  components: {
    topheard, mycell
  },
  methods: {
    fback () {
      window.history.back()
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // if(){}
    }
  }
}
</script>

<style lang="less" scoped>
.edit{
  .fanhui{
    font-size: 15*100vw/360
  };
  .head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  .uploader {
    position: absolute;
    opacity: 0;
  }

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  /deep/.van-picker-column__item{
      border-top:1px red sloid;
      border-bottom:1px red sloid;
  }
  /deep/.van-uploader{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;
  }
}
}
</style>
