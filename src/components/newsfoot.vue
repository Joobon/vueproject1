<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span v-if="or" class="comment" @click="$router.push({path:`/comments/${newsmain.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{newsmain.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" :class="{success:newsmain.has_star}" @click="shoucang"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" :placeholder="placeholder"></textarea>
      <div>
        <span @click="send">发送</span>
        <br />
        <span @click="cancle">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { saveNew, sendComment } from '../api/newls.js'
export default {
  props: ['newsmain', 'tanchuang', 'or'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  watch: {
    tanchuang () {
      if (this.tanchuang) {
        this.isFocus = true
        // console.log(this.tanchuang.user.nickname)
        this.placeholder = '@' + this.tanchuang.user.nickname
        setTimeout(() => {
          this.$refs.commtext.focus()
        }, 1)
      }
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = true
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    async shoucang () {
      let res = await saveNew(this.newsmain.id)
      // console.log(res)
      this.$toast.success(res.data.message)
      this.newsmain.has_star = !this.newsmain.has_star
    },
    cancle () {
      this.isFocus = false
      // 下面这句操作有问题，无法在子组件中直接修改props中定义的变量的值
      // this.replayObj = null
      // 告诉父组件，需要将数据进行重置
      this.$emit('resetValue')
    },
    async send () {
      let data = {
        content: this.$refs.commtext.value
      }
      if (this.tanchuang) {
        data.parent_id = this.tanchuang.id
      }
      // console.log(data)
      let res = await sendComment(this.newsmain.id, data)
      // console.log(res)
      if (res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        this.$refs.commtext.value = ''
        this.isFocus = false
        this.placeholder = ''
        this.$emit('refresh')
        this.$emit('resetValue')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.success {
  color: red;
}
</style>
