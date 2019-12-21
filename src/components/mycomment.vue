<template>
  <div class="mycom">
      <div class="myitem">
        <div class="head">
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="send(comment)">回复</span>
        </div>
        <!-- 判断comment的parent是否有值，没有就不解析，传入commet.parent -->
        <comment2 v-if="comment.parent" :comment='comment.parent' @tanchuang='send'></comment2>
        <div class="text">{{comment.content}}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'comment2',
  props: ['comment'],
  methods: {
    send (comment) {
      this.$emit('tanchuang', comment)
    }
  }
}
</script>

<style lang="less" scoped>
.myitem {
    border: 1px solid #ccc;
    padding:5px;
    box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:7px;
    > div {
      flex: 1;
      display: flex;
      > span {
          margin-left: 5px;
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 13px;
    color: #333;
    padding: 5px 0;
  }
}
</style>
