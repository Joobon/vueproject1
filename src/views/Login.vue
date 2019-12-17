<template>
  <div id="app">
    <div class="container">
      <div class="close" @click="come">
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
        <myinput type='password' placeholder="请输入密码" v-model="user.password"></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <mybtn text="登录" @click="login"></mybtn>
    </div>
  </div>
</template>

<script>
import mybtn from '@/components/mybtn'
import myinput from '@/components/myinput'
// 引入登录api方法
import { userLogin } from '@/api/user.js'

export default {
  data () {
    return {
      user: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    mybtn,
    myinput
  },
  methods: {
    login (event) {
      userLogin(this.user)
        .then(res => {
          console.log(res)
          if (res.data.message === '登录成功') {
            // 将当前的token存储，本地存储
            localStorage.setItem('heima_40_token', res.data.data.token)
            // 页面跳转
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登陆失败，请重试')
        })
    },
    shou (data) {
      this.user.username = data
    },
    come () {
      this.$router.push({ name: 'index' })
    }
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
