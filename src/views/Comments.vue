<template>
  <div class="comment">
    <topheard topt="精彩评论">
      <span slot="left" @click="$router.back()">
        <van-icon name="arrow-left" />
      </span>
    </topheard>
    <div class="commentList">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="hftanchuang(comment)">回复</span>
        </div>
        <mycomment v-if="comment.parent" :comment="comment.parent" @tanchuang="hftanchuang"></mycomment>
        <div class="text">{{comment.content}}</div>
      </div>
      <newsfoot :newsmain="newsmain" :or=or :tanchuang="tanchuang" @resetValue="tanchuang=null" @refresh='init' ></newsfoot>
    </div>
  </div>
</template>

<script>
import topheard from '../components/topheard'
import newsfoot from '../components/newsfoot'
import mycomment from '../components/mycomment'
import { getComment, getNewsMain } from '../api/newls.js'
export default {
  data () {
    return {
      commentList: [],
      newsmain: {},
      tanchuang: {},
      or: true
    }
  },
  components: {
    topheard,
    mycomment,
    newsfoot
  },
  mounted () {
    this.init()
    this.or = false
  },
  methods: {
    async init () {
      let id = this.$route.params.id
      let post = await getNewsMain(id)
      // console.log(post)
      if (post.status === 200) {
        this.newsmain = post.data.data
        // console.log(this.newsmain)
      }
      let res = await getComment(id)
      // console.log(res)
      if (res.status === 200) {
        this.commentList = res.data.data.map(value => {
          value.user.head_img = localStorage.getItem('baseurl') + value.user.head_img
          return value
        })
      }
      // 滚动到顶部
      window.scrollTo(0, 0)
    },
    hftanchuang (comment) {
    //   console.log(comment)
      this.tanchuang = comment
    }
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
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
        // flex-direction: column;
        margin-left: 10px;
        > span {
          margin-left: 5px;
          font-size: 12px;
          color: #999;
          //   line-height: 25px;
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
      padding-top: 10px;
    }
  }
}
</style>
