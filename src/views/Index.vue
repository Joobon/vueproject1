<template>
  <div class="index" >
    <div class="top">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;&nbsp;搜索
      </div>
      <van-icon name="user-circle-o" class="icon"  @click="junp"/>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <!-- 遍历栏目 -->
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- 上拉加载 -->
            <van-list
              :offset='10'
              v-model="cate.loading"
              :finished="cate.finished"
              finished-text="没有更多了"
              :immediate-check='false'
              @load="onLoad">
              <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
              <!-- 新闻内容 -->
              <newsf v-for="post in cate.postList" :key="post.id" :post="post"></newsf>
               </van-pull-refresh>
            </van-list>
      </van-tab>
    </van-tabs>
    <div class="newsList"></div>
  </div>
</template>

<script>
import { getCategory } from '@/api/lanmu.js'
import { getArticleList } from '@/api/newls.js'
import newsf from '@/components/newsf.vue'
export default {
  components: {
    newsf
  },
  data () {
    return {
      active: localStorage.getItem('heima_40_token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      // 获取当前栏目的新闻数据
      // 如果当前栏目的新闻列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  async mounted () {
    // 获取所有栏目数据
    let res = await getCategory()
    // console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // 对数据进行改造，添加能够满足业务需求的成员
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [], // 当前栏目的新闻列表数据
          pageIndex: 1, // 当前栏目的页码
          pageSize: 6, // 当前栏目每页所显示的新闻数量
          loading: false,
          finished: false,
          // List 组件通过loading和finished两个变量控制加载状态，
          // 当组件滚动到底部时，会触发load事件并将loading设置成true。
          // 此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。
          // 若数据已全部加载完毕，则直接将finished设置成true即可
          isLoading: false
        }
      })
      this.getPostList()
    }
  },
  methods: {
    // 跳转个人中心
    junp () {
      this.$router.push({ path: `/personal/${localStorage.getItem('heima_40_id')}` })
    },
    // 获取栏目的新闻数据
    async getPostList () {
      // 获取默认栏目的新闻数据
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      // console.log(res)
      // console.log(this.cateList)
      // 因为onLoad()会触发自动的让loading设置为true,此时并不会再响应加载更多数据的操作
      // (这次加载没有完成，不会触发下一次的加载操作)，因此要将loading设会false
      this.cateList[this.active].loading = false
      // 在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。
      this.cateList[this.active].isLoading = false
      // 新闻数据存储在当前栏目的postList中，每个栏目都有一个单独的文章列表数组
      this.cateList[this.active].postList.push(...res.data.data)
      // 如果当前页所拿到的数据数量小于每页最大加载数量的话表示加载完成，finished设置为false
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    onLoad () {
      this.cateList[this.active].pageIndex++
      this.getPostList()
      // setTimeout(() => {
      //   this.getPostList()
      // }, 2000)
    },
    onRefresh () {
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].finished = false
      setTimeout(() => {
        this.cateList[this.active].postList.length = 0
        this.getPostList()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .top {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 35 * 100vw/360;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
      font-size: 20 * 100vw/360;
    }
  }
}
</style>
