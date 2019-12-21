<template>
<div class="attention">
<topheard topt="我的关注">
    <span slot="left" @click="$router.back()"><van-icon name="arrow-left" /></span>
</topheard>
  <div class="list">
          <div class="box" v-for="(item,index) in attentionlist" :key="item.id">
              <img :src="item.head_img" alt="">
              <div class="center">
                  <p>{{item.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="del(item.id,index)">取消关注</span>
          </div>
      </div>
</div>
</template>

<script>
import topheard from '../components/topheard'
import { getAttention, unFollowUser } from '../api/user.js'
export default {
  data () {
    return {
      attentionlist: []
    }
  },
  components: {
    topheard
  },
  async mounted () {
    let res = await getAttention()
    // console.log(res)
    this.attentionlist = res.data.data
    this.attentionlist.map(value => {
      value.head_img = localStorage.getItem('baseurl') + value.head_img
    })
  },
  methods: {
    async del (id, index) {
      let res = await unFollowUser(id)
      // console.log(res)
      if (res.status === 200) {
        this.attentionlist.splice(index, 1)
        this.$toast.success(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
