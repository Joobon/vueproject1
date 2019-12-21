<template>
  <div class="collect">
    <topheard topt="我的收藏">
      <span slot="left" @click="$router.back()">
        <van-icon name="arrow-left" />
      </span>
    </topheard>
    <van-swipe-cell v-for="(item,index) in CollectList" :key="item.id">
      <newsf :post="item"></newsf>
      <template slot="right">
        <van-button square type="danger" text="删除" @click="del(item.id,index)"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import topheard from '../components/topheard'
import newsf from '../components/newsf.vue'
import { getCollect } from '../api/user.js'
import { saveNew } from '../api/newls.js'
export default {
  data () {
    return {
      CollectList: []
    }
  },
  components: {
    topheard,
    newsf
  },
  async mounted () {
    let res = await getCollect()
    // console.log(res)
    this.CollectList = res.data.data
  },
  methods: {
    async del (id, index) {
      let res = await saveNew(id)
      //   console.log(res)
      this.$toast.success(res.data.message)
      this.CollectList.splice(index, 1)
    }
  }
}
</script>

<style lang='less' scoped>
/deep/.van-button{
   height: 75vw*100/360;
  margin-top: 15px
}
</style>
