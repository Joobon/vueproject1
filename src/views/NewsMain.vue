<template>
  <div class="NewsMain">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followThisUser" :class='{active:newsmain.has_follow}'>{{newsmain.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{newsmain.title}}</div>
      <div class="desc">
        <span>{{newsmain.user&&newsmain.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <!-- 主体内容 -->
      <div class="content" v-html="newsmain.content"  v-if="newsmain.type===1"></div>
      <video v-if='newsmain.type===2' :src='newsmain.content' controls></video>
      <div class="opt">
        <span class="like" :class="{success:newsmain.has_like}">
          <van-icon name="good-job-o" @click="zan"  />{{newsmain.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <newsfoot :newsmain="newsmain" :or='or'></newsfoot>
  </div>

</template>

<script>

import { getNewsMain, zanNews } from '@/api/newls.js'
import { followUser, unFollowUser } from '@/api/user.js'
import newsfoot from '../components/newsfoot.vue'
export default {
  components: {
    newsfoot
  },
  data () {
    return {
      newsmain: {},
      or: true
    }
  },
  async mounted () {
    let res = await getNewsMain(this.$route.params.id)
    // console.log(res)
    if (res.status === 200) {
      this.newsmain = res.data.data
      // console.log(this.newsmain)
    }
  },
  methods: {
    async followThisUser () {
      let res
      // 判断当前的关注状态,如果是未关注,则调用关注方法,如果是已关注则调用取消关注方法
      if (this.newsmain.has_follow === true) { // 已关注
        res = await unFollowUser(this.newsmain.user.id)
      } else { // 未关注
        res = await followUser(this.newsmain.user.id)
      }
      // 提示
      this.$toast.success(res.data.message)
      // 修改元素所绑定的数据,实现页面元素效果的刷新
      this.newsmain.has_follow = !this.newsmain.has_follow
    },
    async zan () {
      let res = await zanNews(this.newsmain.id)
      console.log(res)
      if (res.data.message === '点赞成功') {
        this.newsmain.like_length++
      } else if (res.data.message === '取消成功') {
        this.newsmain.like_length--
      }
      this.$toast.success(res.data.message)
      this.newsmain.has_like = !this.newsmain.has_like
    }
  }
}
</script>

<style lang='less' scoped>
.NewsMain{
  padding-bottom: 50px
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .success{
      color: red;
    };
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;

  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo{
    img {
        width: 100%!important;
        display: block;
    }
}
video{
    width: 100%;
    margin-bottom: 10px;
}
</style>
