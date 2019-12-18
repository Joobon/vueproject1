<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myinput type='text'
        placeholder="请输入同户名/手机号码"
        v-model="user.username"
        :rules='/^1\d{10}$/'
        msg_err='手机号输入不合法，请输入11位手机号'></myinput>
        <!-- <myinput type='text' placeholder="请输入同户名/手机号码" :value="user.username" @input="shou"></myinput> -->
        <myinput type='text' placeholder="昵称" v-model="user.nickname"></myinput>
        <myinput type='password' placeholder="请输入密码" v-model="user.password"></myinput>
      </div>
      <p class="tips">
        已经有账号！！
        <a href="#/login" class>去登录</a>
      </p>
      <mybtn text="注册" @click="register"></mybtn>
    </div>
  </div>
</template>

<script>
import mybtn from '@/components/mybtn'
import myinput from '@/components/myinput'
// 引入登录api方法
import { registerUser } from '@/api/user.js'

export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    mybtn,
    myinput
  },
  methods: {
    async register () {
      if (/^1\d{10}$/.test(this.user.username) && this.user.nickname !== '') {
        let res = await registerUser(this.user)
        // console.log(res)
        // console.log(!/^1\d{10}$/.test(this.user.username))
        if (res.data.message === '注册成功') {
          this.$toast.success('注册成功，请登录')
          this.$router.push({ name: 'login' })
        } else {
          this.$toast.fail('res.data.message')
        }
      } else {
        this.$toast.fail('请检查输入是否正确')
      }
    }
    // shou (data) {
    //   this.user.username = data
    // }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
