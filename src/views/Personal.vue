<template>
  <div class="personal">
    <topheard topt="个人中心">
      <span slot="left" class="iconfont iconjiantou2 fanhui" @click="$router.push({name: 'index'})">首页</span>
    </topheard>
    <router-link :to="'/editprofile/'+dataobj.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="dataobj.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{dataobj.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" dis="关注的用户" @click="$router.push({name: 'attention'})"></mycell>
    <mycell title="我的跟帖" dis="跟帖/回复"></mycell>
    <mycell title="我的收藏" dis="文章/视频" @click="$router.push({name: 'Collect'})"></mycell>
    <mycell title="设置" dis></mycell>
    <mybtn text="退出登录" type="success" @click='outl'></mybtn>
  </div>
</template>

<script>
import topheard from '../components/topheard.vue'
import { getUserInfo } from '@/api/user.js'
import mycell from '@/components/mycell.vue'
import mybtn from '@/components/mybtn'
export default {
  data () {
    return {
      dataobj: {}
    }
  },
  components: {
    mycell,
    mybtn,
    topheard
  },
  mounted () {
    let id = this.$route.params.id
    getUserInfo(id)
      .then(res => {
        // console.log(res)
        if (res.data.message === '获取成功') {
          this.dataobj = res.data.data
          // 返回的数据可能没有图片数据，那么我们应该进行判断，如果有图片数据，则设置为当前图片，如果没有图片数据则需要设置为默认图片
          if (this.dataobj.head_img) {
            this.dataobj.head_img =
              localStorage.getItem('baseurl') + this.dataobj.head_img
          } else {
            this.dataobj.head_img =
              localStorage.getItem('baseurl') + '/uploads/image/123.jpeg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    outl () {
      localStorage.removeItem('heima_40_token')
      this.$router.push({ name: 'index' })
    }
  }

}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  /deep/.btn {
    margin: 50px auto;
  }
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
